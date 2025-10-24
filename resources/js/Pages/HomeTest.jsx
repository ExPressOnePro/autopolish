import React, {lazy, Suspense, useRef, useState} from 'react';
import BeforeAfter from "@/Pages/Components/BeforeAfter.jsx";
import Hero from "@/Pages/Components/Hero.jsx";
import ServiceCardsDetailed from "@/Pages/Components/ServiceCardsDetailed.jsx";
import Header from "@/Pages/Components/Header.jsx";
const Gallery = lazy(() => import('@/Pages/Components/Gallery'));
const Reviews = lazy(() => import('@/Pages/Components/Reviews'));
const Pricing = lazy(() => import('@/Pages/Components/Pricing'));
const Contact = lazy(() => import('@/Pages/Components/Contact'));



export default function HomeTest({image, before, after, averageRating, totalReviews}) {
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
            setFormData({name: '', phone: '', message: ''});
        }, 900);
    };
    const servicesRef = useRef(null);
    const pricingRef = useRef(null);
    const galleryRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    };
    const scrollToId = (id) => {
        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({behavior: 'smooth'});
            } else {
                // повтор через 50ms, пока элемент не появится
                setTimeout(tryScroll, 50);
            }
        };
        tryScroll();
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="relative text-[#eaf2fb] font-sans min-h-screen overflow-x-hidden scroll-smooth">

            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Основной градиент */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#05080c] to-[#0b1220]"/>

                {/* Слой с мягким шумом (имитация лака) */}
                <div className="absolute inset-0 opacity-15 mix-blend-overlay"/>

                {/* Анимированный блик полировки */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-polishMove"/>
            </div>
            {/* HEADER */}
            <Header scrollToId={scrollToId}/>

            <Hero image={image} averageRating={averageRating} totalReviews={totalReviews}/>

            <div id="Услуги" className="container mx-auto py-14">
                <ServiceCardsDetailed/>
            </div>

            <BeforeAfter before={before} after={after} clip={clip} handleRange={handleRange}/>

            <section id="Галерея" className="mx-auto py-14 max-w-6xl">
                <Gallery />
            </section>

            <section id="Отзывы" className="container mx-auto py-14 max-w-6xl">
                <Reviews/>
            </section>

            <section ref={pricingRef} id="Цены" className="container mx-auto py-14 max-w-6xl ">
                <Pricing
                    carClass={carClass}
                    setCarClass={setCarClass}
                    pack={pack}
                    setPack={setPack}
                    calcResult={calcResult}
                    scrollToId={scrollToId}
                />
            </section>


            <section ref={contactRef} id="Контакты" className="container mx-auto py-14 max-w-6xl">
                <Contact/>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#0c1826] py-6 text-center text-[#9bb3c9]">
                © 2025 Prime Detail. Все права защищены.
            </footer>
        </div>
        </Suspense>
    );
}
