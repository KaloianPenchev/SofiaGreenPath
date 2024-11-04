import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/landing-page-components-styles/Clients.css';


const testimonials = [
    {
      text: "SofiaGreenPath променя промени ежедневието ми. Сега избягвам натоварени и замърсени участъци и се наслаждавам на чисти и спокойни маршрути.",
      author: "Мая",
      rating: 5
    },
    {
      text: "Тази платформа ми помогна да опозная София от една нова перспектива. Винаги намирам прекрасни маршрути, които ме отдалчат от градския шум.",
      author: "Александър",
      rating: 5
    },
    {
      text: "SofiaGreenPath е страхотен помощник за всеки, който иска да комбинира движението с грижа за здравето и околната среда. Препоръчвам на всички!",
      author: "Иван",
      rating: 5

    },
    {
      text: "Като редовен велосипедист, оценявам информацията за качеството на въздуха и възможността да избирам здравословни маршрути. Много съм доволен!",
      author: "Никол",
      rating: 5
    }
  ];
  
  const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    };
  
    return (
      <section className="testimonials">
        <header className="testimonials__header">
          <h2 className="testimonials__title">КАКВО КАЗВАТ НАШИТЕ ПОТРЕБИТЕЛИ?</h2>
        </header>
  
        <article className="testimonials__content">
          <blockquote className="testimonials__quote">
            <p>{testimonials[currentIndex].text}</p>
            <footer className="testimonials__author">
              {testimonials[currentIndex].author}
            </footer>
          </blockquote>
  
          <aside className="testimonials__rating">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <span key={i} className="testimonials__star">★</span>
            ))}
          </aside>
  
          <nav className="testimonials__navigation">
            <button 
              onClick={handlePrev}
              className="testimonials__button testimonials__button--prev"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              className="testimonials__button testimonials__button--next"
              aria-label="Next testimonial"
            >
              →
            </button>
          </nav>
        </article>
      </section>
    );
  };
  
  export default Testimonials;