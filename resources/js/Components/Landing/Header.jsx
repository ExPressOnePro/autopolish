import React from "react";

export default function Header({ burgerRef, menuRef }) {
    return (
        <header className="bg-sky-600 text-white fixed w-full z-50 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">Prime Detail</h1>
                <nav
                    ref={menuRef}
                    className="hidden md:flex space-x-6 md:space-x-8 font-medium"
                >
                    <a href="#services">Услуги</a>
                    <a href="#pricing">Цены</a>
                    <a href="#process">Процесс</a>
                    <a href="#gallery">Галерея</a>
                    <a href="#reviews">Отзывы</a>
                    <a href="#booking">Запись</a>
                    <a href="#contact">Контакты</a>
                </nav>
                <button
                    ref={burgerRef}
                    className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
                >
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                    <span className="block w-6 h-0.5 bg-white"></span>
                </button>
            </div>
        </header>
    );
}
