import React from "react";

export default function Hero() {
    return (
        <section
            id="hero"
            className="h-screen bg-cover bg-center flex items-center justify-center text-center text-white"
            style={{ backgroundImage: "url('/images/hero-car.jpg')" }}
        >
            <div className="bg-black bg-opacity-50 p-6 rounded-xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Профессиональная автополировка
                </h2>
                <p className="text-lg mb-6">
                    Вернем блеск и защитим ваш автомобиль керамикой и полировкой
                </p>
                <a
                    href="#booking"
                    className="bg-sky-500 px-6 py-3 rounded-xl font-semibold hover:bg-sky-400 transition"
                >
                    Записаться
                </a>
            </div>
        </section>
    );
}
