import ApplicationLogo from '@/Components/ApplicationLogo';
import {Head, Link} from '@inertiajs/react';

export default function Guest({ children }) {
    return (

        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head>
                <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon/favicon-32x32.png') }}"/>
                <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon/favicon-16x16.png') }}"/>
                <link rel="apple-touch-icon" href="{{ asset('favicon/apple-touch-icon.png') }}"/>
                <link rel="shortcut icon" href="{{ asset('favicon/favicon.ico') }}" type="image/x-icon"/>
                <meta name="theme-color" content="#000000"/>
                <title>Professional Car Polishing | Avtopolirovka.md</title>
                <meta name="description"
                      content="Premium car detailing, polishing, and protection services in Chisinau. Quality guaranteed."/>
                <meta name="description"
                      content="Get in touch with Avtopolirovka.md — professional car polishing and detailing in Chisinau."/>
                <meta name="keywords" content="car detailing, polishing, ceramic coating, Chisinau, auto care"/>
                <meta name="description"
                      content="{{ $description ?? 'Профессиональная полировка, керамика и уход за авто в Кишинёве.' }}"/>
                <meta name="keywords" content="полировка авто, керамика, детейлинг, автосервис Кишинёв"/>
                <meta property="og:title" content="{{ $title ?? 'Avtopolirovka.md' }}"/>
                <meta property="og:description" content="{{ $description ?? 'Профессиональная полировка авто' }}"/>
                <meta property="og:image" content="{{ asset('images/preview.jpg') }}"/>
                <meta property="og:url" content="{{ url()->current() }}"/>

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
