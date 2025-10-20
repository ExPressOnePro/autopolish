import React, {Suspense, useRef, useState} from 'react';
import Calculator from "@/Pages/Components/Calculator.jsx";
import Reviews from "@/Pages/Components/Reviews.jsx";
import Contact from "@/Pages/Components/Contact.jsx";
import Gallery from "@/Pages/Components/Gallery.jsx";
import BeforeAfter from "@/Pages/Components/BeforeAfter.jsx";
import Services from "@/Pages/Components/Services.jsx";
import Hero from "@/Pages/Components/Hero.jsx";
import Pricing from "@/Pages/Components/Pricing.jsx";
import ServicePPF from "@/Pages/Components/ServicePPF.jsx";
import ServiceCardsDetailed from "@/Pages/Components/ServiceCardsDetailed.jsx";
import ContactForm from "@/Pages/Components/ContactForm.jsx";



export default function Home({image, gallery, before, after, averageRating, totalReviews}) {
    const [clip, setClip] = useState(50);
    const [carClass, setCarClass] = useState(1);
    const [pack, setPack] = useState(14900);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const calcResult = Math.round(pack * carClass / 100) * 100;

    const handleRange = (e) => setClip(Number(e.target.value));

    const submitForm = (e) => {
        e.preventDefault();
        setFormStatus('Отправляем...');
        setTimeout(() => {
            setFormStatus('Спасибо! Мы свяжемся с вами.');
            setFormData({ name: '', phone: '', message: '' });
        }, 900);
    };
    const servicesRef = useRef(null);
    const pricingRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToId = (id) => {
        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                // повтор через 50ms, пока элемент не появится
                setTimeout(tryScroll, 50);
            }
        };
        tryScroll();
    };

    return (
        <div className="bg-gradient-to-b from-[#05080c] to-[#0b1220] text-[#eaf2fb] font-sans min-h-screen">

            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-[rgba(7,12,18,.85)] backdrop-blur-md border-b border-[#142234]">
                <div className="container mx-auto flex justify-between items-center h-16 px-5">
                    <a href="#" className="flex items-center gap-2 font-bold">
            <span
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#22d3ee] grid place-items-center shadow-md">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path
                  d="M3 12l4.5 5L21 4.5l-1.6-1.6L7.5 14 4.6 11.1 3 12z"/></svg>
            </span>
                        Prime Detail
                        <span
                            className="ml-2 px-2 py-1 text-xs border rounded-full text-[#9bb3c9] bg-[#0c1826] border-[#1e3146]">детейлинг студия</span>
                    </a>

                    {/* DESKTOP NAV */}
                    <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 z-50 flex gap-4">
                        <button onClick={() => scrollToSection(servicesRef)}>Услуги</button>
                        <button onClick={() => scrollToSection(pricingRef)}>Цены</button>
                        <button onClick={() => scrollToSection(galleryRef)}>Галерея</button>
                        <button onClick={() => scrollToSection(contactRef)}>Контакты</button>
                    </nav>

                    {/* MOBILE BUTTON */}
                    <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <nav className="md:hidden bg-[#0c1826] border-t border-[#1b3247] text-center py-4">
                        {['Услуги', 'Цены', 'Работа', 'Галерея', 'Отзывы', 'Контакты'].map((id) => (
                            <button
                                key={id}
                                className="block py-2 text-lg"
                                onClick={() => {
                                    setMenuOpen(false);
                                    scrollToId(id);
                                }}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                scrollToId('book');
                            }}
                            className="block py-2 mt-2 bg-[#122131] rounded text-white"
                        >
                            Записаться
                        </button>
                    </nav>
                )}
            </header>

            <Hero image={image} averageRating={averageRating} totalReviews={totalReviews}/>

            <section ref={servicesRef} className="container mx-auto py-14">
                <ServiceCardsDetailed ref={servicesRef}/>
            </section>

            <BeforeAfter before={before} after={after} clip={clip} handleRange={handleRange}/>

            <section ref={galleryRef} id="Галерея" className="container mx-auto py-14 max-w-6xl">
                <Gallery gallery={gallery}/>
            </section>

            <section id="Отзывы" className="container mx-auto py-14 max-w-6xl">
                <Reviews/>
            </section>
                <section ref={pricingRef}  id="pricing" className="container mx-auto py-14 max-w-6xl ">
                    <Pricing
                        carClass={carClass}
                        setCarClass={setCarClass}
                        pack={pack}
                        setPack={setPack}
                        calcResult={calcResult}
                        scrollToId={scrollToId}
                    />
                </section>

                <section ref={contactRef} id="contact" className="container mx-auto py-14 max-w-6xl">
                    <ContactForm/>
                    {/*<Contact*/}
                    {/*    formData={formData}*/}
                    {/*    setFormData={setFormData}*/}
                    {/*    submitForm={submitForm}*/}
                    {/*    formStatus={formStatus}*/}
                    {/*/>*/}
                </section>


                {/* FOOTER */}
                <footer className="bg-[#0c1826] py-6 text-center text-[#9bb3c9]">
                    © 2025 Prime Detail. Все права защищены.
                </footer>
        </div>
);
}
