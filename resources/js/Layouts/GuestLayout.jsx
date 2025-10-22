import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const siteTitle = "Professional Car Polishing | Avtopolirovka.md";
    const description = "Premium car detailing, polishing, and protection services in Chisinau. Quality guaranteed.";
    const keywords = "car detailing, polishing, ceramic coating, Chisinau, auto care";
    const ogImage = "/preview.jpg";

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
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

            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500"/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
