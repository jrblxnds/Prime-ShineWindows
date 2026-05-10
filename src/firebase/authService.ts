import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { ADMIN_EMAILS } from '../constants';

export const authService = {
  async login() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      if (user.email && !ADMIN_EMAILS.includes(user.email)) {
        await signOut(auth);
        throw new Error('You are not authorized to access this dashboard.');
      }
      return user;
    } catch (error) {
      console.error('Auth Error:', error);
      throw error;
    }
  },

  async logout() {
    await signOut(auth);
  },

  onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (user) => {
      if (user && user.email && ADMIN_EMAILS.includes(user.email)) {
        callback(user);
      } else {
        if (user) signOut(auth);
        callback(null);
      }
    });
  }
};
