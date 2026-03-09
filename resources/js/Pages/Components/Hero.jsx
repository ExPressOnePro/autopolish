export default function Hero({ image, averageRating, totalReviews }) {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                {image && (
                    <img
                        src={image}
                        alt="Полировка автомобиля"
                        className="w-full h-full object-cover scale-105"
                    />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a0f] via-[#060a0fcc] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative container mx-auto max-w-6xl px-6">
                <div className="max-w-xl backdrop-blur-md bg-[#0c1118cc] border border-[#1b2a3a] rounded-3xl p-10 shadow-2xl">

                    <span className="text-xs uppercase tracking-widest text-blue-400">
                        Premium Auto Detailing
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-3">
                        Идеальный блеск
                        <span className="text-blue-500"> для вашего автомобиля</span>
                    </h1>

                    <p className="text-gray-300 mt-4 text-lg">
                        Глубокая полировка, удаление царапин, керамическая защита и
                        антигравийная пленка. Вернем вашему автомобилю вид,
                        как будто он только что из салона.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button
                            onClick={() =>
                                document.getElementById("Цены")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                        >
                            Смотреть пакеты
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById("Контакты")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="border border-gray-600 hover:border-blue-500 hover:text-blue-400 transition px-6 py-3 rounded-xl text-white"
                        >
                            Бесплатная оценка
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-10 text-center border-t border-[#1b2a3a] pt-6">

                        <div>
                            <div className="text-2xl font-bold text-white">600+</div>
                            <div className="text-gray-400 text-sm">
                                авто отполировано
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                                ⭐ {averageRating ? averageRating : "—"}
                            </div>
                            <div className="text-gray-400 text-sm">
                                отзывов ({totalReviews})
                            </div>
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-white">24 мес</div>
                            <div className="text-gray-400 text-sm">
                                гарантия защиты
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
