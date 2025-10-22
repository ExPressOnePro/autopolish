export default function Hero({ image, averageRating, totalReviews }) {
    return (
        <section className="container mx-auto max-w-6xl px-4 md:px-0 grid md:grid-cols-[1.1fr_.9fr] gap-8 py-16 items-center">
            {/* Левый блок с текстом */}
            <div className="bg-[#0f141b] p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-between h-full">
                <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full text-[#9bb3c9] bg-[#0c1826] border-[#1e3146]">
                        Глубокая полировка • PPF • Антигравий
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl mt-4 mb-4 font-bold text-white leading-tight">
                        Вернём заводской блеск и защитим ваш автомобиль
                    </h1>
                    <p className="text-[#bcd2e6] leading-relaxed text-sm sm:text-base lg:text-lg">
                        Удалим паутинку, оксид и мелкие дефекты. Покроем керамикой 9H или защитной плёнкой. Гарантия до 24 месяцев.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    <button className="btn bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 px-6 rounded-xl shadow-md font-semibold"
                            onClick={() =>
                                document.getElementById("Цены")?.scrollIntoView({ behavior: "smooth" })
                            }
                    >
                        Смотреть пакеты
                    </button>
                    <button className="btn bg-[#122131] border border-[#263545] shadow-none text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#1c2a3b] transition-colors"
                            onClick={() =>
                                document.getElementById("Контакты")?.scrollIntoView({ behavior: "smooth" })
                            }
                    >

                        Бесплатная оценка
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                    <div>
                        <b className="text-white text-lg sm:text-xl lg:text-2xl">600+</b>
                        <div className="text-[#9bb3c9] text-xs sm:text-sm">полированных авто</div>
                    </div>
                    <div>
                        <b className="text-white text-lg sm:text-xl lg:text-2xl">
                            {averageRating ? `${averageRating}/5` : '—'}
                        </b>
                        <div className="text-[#9bb3c9] text-xs sm:text-sm">
                            рейтинг клиентов ({totalReviews})
                        </div>
                    </div>
                    <div>
                        <b className="text-white text-lg sm:text-xl lg:text-2xl">24 мес</b>
                        <div className="text-[#9bb3c9] text-xs sm:text-sm">гарантия защиты</div>
                    </div>
                </div>
            </div>

            {/* Правый блок с изображением */}
            <div className="relative rounded-3xl border border-[#1b3247] overflow-hidden shadow-lg">
                <img
                    src={image}
                    alt="Полировка кузова"
                    className="w-full h-auto object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
                />
            </div>
        </section>
    );
}
