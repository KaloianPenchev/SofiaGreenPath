import '../../src/styles/main-pages/Landing.css';
import NavBar from '../components/landing-page-components/NavBar';
import HeroSection from '../components/landing-page-components/HeroSection';
import Advantages from '../components/landing-page-components/Advantages';
import Testimonials from '../components/landing-page-components/Clients';
import StartForFree from '../components/landing-page-components/StartForFree';
import Footer from '../components/landing-page-components/Footer';



const Landing = () => {
  //const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <main className="landing-container">
      <NavBar />
      <HeroSection />
      <Advantages />
      <Testimonials />
      <StartForFree/>
      <Footer/>
    </main>
  );
};

export default Landing;