import React, { lazy, Suspense, useState } from 'react';
import { Head } from '@inertiajs/react';
import BeforeAfter from '@/Pages/Components/BeforeAfter.jsx';
import Hero from '@/Pages/Components/Hero.jsx';
import SaleReady360 from '@/Pages/Components/SaleReady360.jsx';
import ServiceCardsDetailed from '@/Pages/Components/ServiceCardsDetailed.jsx';
import Header from '@/Pages/Components/Header.jsx';
import Reviews from '@/Pages/Components/Reviews.jsx';
import LazySection from '@/Components/LazySection.jsx';

const Gallery = lazy(() => import('@/Pages/Components/Gallery'));
const Pricing = lazy(() => import('@/Pages/Components/Pricing'));
const Contact = lazy(() => import('@/Pages/Components/Contact'));

function SectionFallback({ label }) {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-14">
            <div className="h-48 rounded-2xl bg-gradient-to-br from-[#0c1826] to-[#101a28] animate-pulse flex items-center justify-center text-gray-500 text-sm">
                {label}
            </div>
        </div>
    );
}

export default function HomeTest({ image, before, after, averageRating, totalReviews, reviews = [] }) {
    const [clip, setClip] = useState(50);

    const handleRange = (e) => setClip(Number(e.target.value));

    const scrollToId = (id) => {
        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                setTimeout(tryScroll, 50);
            }
        };
        tryScroll();
    };

    return (
        <div className="relative text-[#eaf2fb] font-sans min-h-screen overflow-x-hidden scroll-smooth">
            <Head>
                <title>Prime Detail — детейлинг и полировка авто в Кишинёве</title>
                <meta name="description" content="Профессиональная полировка, керамика и защита кузова в Кишинёве. Prime Detail — премиальный детейлинг с гарантией до 24 месяцев." />
                <meta name="keywords" content="полировка авто, детейлинг, керамика, PPF, Кишинёв, Prime Detail" />
                <meta property="og:title" content="Prime Detail — детейлинг и полировка авто" />
                <meta property="og:description" content="Премиальная полировка, керамическая защита и бронеплёнка в Кишинёве." />
                <meta property="og:type" content="website" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
                {image && <link rel="preload" as="image" href={image} fetchPriority="high" />}
            </Head>

            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#05080c] to-[#0b1220]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-polish-shine" />
            </div>

            <Header scrollToId={scrollToId} />

            <a
                href="#Контакты"
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition z-50 mb-[env(safe-area-inset-bottom)]"
            >
                Записаться
            </a>

            <Hero image={image} averageRating={averageRating} totalReviews={totalReviews} />

            <div id="Услуги" className="container mx-auto content-auto">
                <ServiceCardsDetailed />
            </div>

            <BeforeAfter before={before} after={after} clip={clip} handleRange={handleRange} />

            <SaleReady360 scrollToId={scrollToId} />

            <section id="Галерея" className="mx-auto py-10 sm:py-14 max-w-6xl content-auto">
                <LazySection minHeight="20rem">
                    <Suspense fallback={<SectionFallback label="Загрузка галереи..." />}>
                        <Gallery />
                    </Suspense>
                </LazySection>
            </section>

            <section id="Отзывы" className="container mx-auto py-10 sm:py-14 max-w-6xl content-auto">
                <Reviews
                    initialReviews={reviews}
                    averageRating={averageRating}
                    totalReviews={totalReviews}
                />
            </section>

            <section id="Цены" className="container mx-auto py-10 sm:py-14 max-w-6xl content-auto">
                <LazySection minHeight="18rem">
                    <Suspense fallback={<SectionFallback label="Загрузка цен..." />}>
                        <Pricing scrollToId={scrollToId} />
                    </Suspense>
                </LazySection>
            </section>

            <section id="Контакты" className="container mx-auto py-10 sm:py-14 max-w-6xl content-auto">
                <LazySection minHeight="20rem">
                    <Suspense fallback={<SectionFallback label="Загрузка контактов..." />}>
                        <Contact />
                    </Suspense>
                </LazySection>
            </section>

            <footer className="bg-[#0c1826] py-6 text-center text-[#9bb3c9] text-sm sm:text-base">
                © 2026 Prime Detail
            </footer>
        </div>
    );
}
