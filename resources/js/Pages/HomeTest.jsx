import React, {Suspense, useRef, useState} from 'react';
import Reviews from "@/Pages/Components/Reviews.jsx";
import Contact from "@/Pages/Components/Contact.jsx";
import Gallery from "@/Pages/Components/Gallery.jsx";
import BeforeAfter from "@/Pages/Components/BeforeAfter.jsx";
import Hero from "@/Pages/Components/Hero.jsx";
import Pricing from "@/Pages/Components/Pricing.jsx";
import ServiceCardsDetailed from "@/Pages/Components/ServiceCardsDetailed.jsx";
import Header from "@/Pages/Components/Header.jsx";
import {Head} from "@inertiajs/react";



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
        <div className="bg-gradient-to-b from-[#05080c] to-[#0b1220] text-[#eaf2fb] font-sans min-h-screen">

            {/* HEADER */}
            <Header scrollToId={scrollToId}/>

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


            <section ref={contactRef} id="contact" className="container mx-auto py-14 max-w-6xl">
                <Contact/>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#0c1826] py-6 text-center text-[#9bb3c9]">
                © 2025 Prime Detail. Все права защищены.
            </footer>
        </div>

        );
        }
