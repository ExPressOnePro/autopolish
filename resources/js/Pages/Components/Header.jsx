import { useState } from "react";

export default function Header({ scrollToId }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const contacts = {
        phone: "+373 69 204 272",
        whatsapp: "+373 69 204 272",
    };

    return (
        <header className="sticky top-0 z-50 bg-[rgba(7,12,18,.95)] backdrop-blur-md border-b border-[#142234]">
            <div className="container mx-auto flex justify-between items-center h-16 px-5">
                {/* Логотип */}
                <a href="#" className="flex items-center gap-2 font-bold">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#22d3ee] grid place-items-center shadow-md">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M3 12l4.5 5L21 4.5l-1.6-1.6L7.5 14 4.6 11.1 3 12z"/>
                        </svg>
                    </span>
                    Prime Detail
                    <span className="ml-2 px-2 py-1 text-xs border rounded-full text-[#9bb3c9] bg-[#0c1826] border-[#1e3146]">
                        детейлинг студия
                    </span>
                </a>

                {/* Навигация для desktop */}
                <nav className="hidden md:flex gap-6 items-center">
                    {['Услуги', 'Цены', 'Галерея', 'Отзывы', 'Контакты'].map((id) => (
                        <button
                            key={id}
                            onClick={() => scrollToId(id)}
                            className="text-gray-200 hover:text-white transition"
                        >
                            {id}
                        </button>
                    ))}
                    <a
                        href={`tel:${contacts.phone}`}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Позвонить
                    </a>
                    <a
                        href={`https://wa.me/${contacts.whatsapp.replace(/\D/g,'')}`}
                        target="_blank"
                        className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        WhatsApp
                    </a>
                    <button
                        onClick={() => scrollToId('book')}
                        className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition"
                    >
                        Записаться
                    </button>
                </nav>

                {/* Кнопка мобильного меню */}
                <button
                    className="md:hidden text-2xl text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Мобильное меню */}
            {menuOpen && (
                <nav className="md:hidden bg-[#0c1826] border-t border-[#1b3247] text-center py-4 flex flex-col gap-2">
                    {['Услуги', 'Цены', 'Галерея', 'Отзывы', 'Контакты'].map((id) => (
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
                    <a
                        href={`tel:${contacts.phone}`}
                        className="block py-2 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        Позвонить
                    </a>
                    <a
                        href={`https://wa.me/${contacts.whatsapp.replace(/\D/g,'')}`}
                        target="_blank"
                        className="block py-2 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                    >
                        WhatsApp
                    </a>
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            scrollToId('book');
                        }}
                        className="block py-2 mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg"
                    >
                        Записаться
                    </button>
                </nav>
            )}
        </header>
    );
}
