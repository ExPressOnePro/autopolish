import { Head } from '@inertiajs/react';
import { site } from '@/config/site';

export default function Guest({ children }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#05080c] to-[#0b1220] text-[#eaf2fb] font-sans overflow-hidden">
            <Head>
                <title>{site.seo.title}</title>
                <meta name="description" content={site.seo.description} />
                <meta name="robots" content="noindex, follow" />
            </Head>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shine_8s_linear_infinite]" />
            </div>

            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}
