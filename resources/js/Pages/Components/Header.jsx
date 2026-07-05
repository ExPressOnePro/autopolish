import { useState } from 'react';
import Logo from '@/Components/Logo';
import { site } from '@/config/site';

export default function Header({ scrollToId }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = ['Услуги', 'Продажа', 'Цены', 'Галерея', 'Отзывы', 'Контакты'];

    const goHome = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="sticky top-0 z-50 bg-[rgba(7,12,18,.95)] backdrop-blur-md border-b border-[#142234]">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-5">
                <a
                    href="/"
                    onClick={goHome}
                    className="flex items-center shrink-0 max-w-[160px] sm:max-w-[180px]"
                    aria-label={site.logoAlt}
                >
                    <Logo className="h-10 sm:h-11 w-full object-contain object-left" />
                </a>

                <nav className="hidden lg:flex gap-5 items-center" aria-label="Основное меню">
                    {navItems.map((id) => (
                        <button
                            key={id}
                            onClick={() => scrollToId(id)}
                            className="text-gray-200 hover:text-white transition text-sm"
                        >
                            {id}
                        </button>
                    ))}
                    <a
                        href={`tel:${site.phone}`}
                        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm whitespace-nowrap"
                    >
                        {site.phone}
                    </a>
                    <a
                        href={site.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                    >
                        WhatsApp
                    </a>
                    <a
                        href={site.telegram}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-[#0c1826] border border-[#1b3247] hover:border-blue-500 text-white rounded-lg transition text-sm"
                    >
                        Telegram
                    </a>
                    <button
                        onClick={() => scrollToId('Контакты')}
                        className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition text-sm"
                    >
                        Записаться
                    </button>
                </nav>

                <button
                    className="lg:hidden text-2xl text-white p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <nav className="lg:hidden bg-[#0c1826] border-t border-[#1b3247] text-center py-4 flex flex-col gap-2" aria-label="Мобильное меню">
                    {navItems.map((id) => (
                        <button
                            key={id}
                            className="block py-2 text-lg text-white hover:text-blue-400 transition"
                            onClick={() => {
                                setMenuOpen(false);
                                scrollToId(id);
                            }}
                        >
                            {id}
                        </button>
                    ))}
                    <a href={`tel:${site.phone}`} className="block py-2 text-lg text-white bg-blue-600 rounded-lg mx-4">
                        {site.phone}
                    </a>
                    <a href={site.whatsapp} target="_blank" rel="noreferrer" className="block py-2 text-lg text-white bg-green-600 rounded-lg mx-4">
                        WhatsApp
                    </a>
                    <a href={site.telegram} target="_blank" rel="noreferrer" className="block py-2 text-lg text-white bg-[#101f30] border border-[#1b3247] rounded-lg mx-4">
                        Telegram
                    </a>
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            scrollToId('Контакты');
                        }}
                        className="block py-2 mt-2 mx-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg"
                    >
                        Записаться
                    </button>
                </nav>
            )}
        </header>
    );
}
