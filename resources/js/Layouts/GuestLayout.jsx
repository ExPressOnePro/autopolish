import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const siteTitle = "Professional Car Polishing | Avtopolirovka.md";
    const description = "Premium car detailing, polishing, and protection services in Chisinau. Quality guaranteed.";
    const keywords = "car detailing, polishing, ceramic coating, Chisinau, auto care";
    const ogImage = "/preview.jpg";

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#05080c] to-[#0b1220] text-[#eaf2fb] font-sans overflow-hidden">
            <Head>
                <title>{siteTitle}</title>

                {/* Favicon */}
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png"/>
                <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon"/>
                <meta name="theme-color" content="#000000"/>

                {/* SEO */}
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>

                {/* Open Graph */}
                <meta property="og:title" content={siteTitle}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={ogImage}/>
                <meta property="og:url" content={window.location.href}/>
            </Head>

            {/* Эффект полировки по всей странице */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shine_8s_linear_infinite]"></div>
            </div>

            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}
