import React, { useState, useEffect, useMemo, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";

import Header from "@/Components/Landing/Header";
import Hero from "@/Components/Landing/Hero";
import Services from "@/Components/Landing/Services";
import Pricing from "@/Components/Landing/Pricing";
import Process from "@/Components/Landing/Process";
import BeforeAfter from "@/Components/Landing/BeforeAfter";
import Gallery from "@/Components/Landing/Gallery";
import Reviews from "@/Components/Landing/Reviews";
import Booking from "@/Components/Landing/Booking";
import Contact from "@/Components/Landing/Contact";
import Footer from "@/Components/Landing/Footer";

export default function Landing({ reviews = [] }) {
    // состояния для калькулятора
    const [cls, setCls] = useState(1.2);
    const [pack, setPack] = useState(14900);
    const price = useMemo(() => {
        const p = Math.round((Number(pack) * Number(cls)) / 100) * 100;
        return p.toLocaleString("ru-RU") + " ₽";
    }, [cls, pack]);

    // состояния для before/after
    const [clip, setClip] = useState(50);

    // формы
    const booking = useForm({
        name: "",
        phone: "",
        service: "Полировка Pro + керамика",
        message: "",
    });

    const review = useForm({ name: "", rating: 5, message: "" });

    // refs для меню
    const burgerRef = useRef(null);
    const menuRef = useRef(null);

    // логика мобильного меню
    useEffect(() => {
        const burger = burgerRef.current;
        const menu = menuRef.current;
        if (!burger || !menu) return;
        const toggle = () => menu.classList.toggle("show");
        burger.addEventListener("click", toggle);
        return () => burger.removeEventListener("click", toggle);
    }, []);

    // плавный скролл
    useEffect(() => {
        const menu = menuRef.current;
        const links = document.querySelectorAll('a[href^="#"]');
        const onClick = (e) => {
            const id = e.currentTarget.getAttribute("href").slice(1);
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
            if (menu && menu.classList.contains("show")) menu.classList.remove("show");
        };
        links.forEach((a) => a.addEventListener("click", onClick));
        return () => links.forEach((a) => a.removeEventListener("click", onClick));
    }, []);

    return (
        <>
            <Head>
                <title>
                    Prime Detail — Профессиональная автополировка и защитные покрытия
                </title>
                <meta
                    name="description"
                    content="Профессиональная полировка кузова, удаление царапин, керамическая защита и восстановление блеска. Онлайн-запись и честные цены."
                />
                <meta name="theme-color" content="#0ea5e9" />
            </Head>

            {/* глобальные стили */}
            <style>{`/* вставляем твои :root и все стили отсюда */`}</style>

            <Header burgerRef={burgerRef} menuRef={menuRef} />

            <main>
                <Hero />
                <Services />
                <Pricing cls={cls} setCls={setCls} pack={pack} setPack={setPack} price={price} />
                <Process />
                <BeforeAfter clip={clip} setClip={setClip} />
                <Gallery />
                <Reviews reviews={reviews} reviewForm={review} />
                <Booking bookingForm={booking} />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
