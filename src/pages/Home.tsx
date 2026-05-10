import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Portfolio from '../components/Portfolio';
import Reviews from '../components/Reviews';
import Owners from '../components/Owners';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-pale-blue">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Portfolio />
      <Reviews />
      <Owners />
      <BookingForm />
      <Footer />
    </main>
  );
}
