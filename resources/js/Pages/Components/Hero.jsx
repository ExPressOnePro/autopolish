import OptimizedImage from '@/Components/OptimizedImage';

export default function Hero({ image, averageRating, totalReviews }) {
    return (
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
                {image && (
                    <OptimizedImage
                        src={image}
                        alt="Полировка автомобиля Prime Detail"
                        priority
                        sizes="100vw"
                        wrapperClassName="h-full w-full"
                        className="scale-105 object-cover object-center"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a0f] via-[#060a0fe6] to-[#060a0f66] sm:to-transparent" />
            </div>

            <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 py-10">
                <div className="max-w-xl backdrop-blur-md bg-[#0c1118cc] border border-[#1b2a3a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
                    <span className="text-xs uppercase tracking-widest text-blue-400">
                        Premium Auto Detailing
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mt-3 text-balance">
                        Идеальный блеск
                        <span className="text-blue-500"> для вашего автомобиля</span>
                    </h1>

                    <p className="text-gray-300 mt-4 text-base sm:text-lg leading-relaxed">
                        Глубокая полировка, удаление царапин, керамическая защита и
                        антигравийная плёнка. Вернём вашему автомобилю вид,
                        как будто он только что из салона.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8">
                        <button
                            onClick={() =>
                                document.getElementById('Цены')?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                        >
                            Смотреть пакеты
                        </button>

                        <button
                            onClick={() =>
                                document.getElementById('Контакты')?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="w-full sm:w-auto border border-gray-600 hover:border-blue-500 hover:text-blue-400 transition px-6 py-3 rounded-xl text-white"
                        >
                            Бесплатная оценка
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-8 sm:mt-10 text-center border-t border-[#1b2a3a] pt-6">
                        <div>
                            <div className="text-lg sm:text-2xl font-bold text-white">600+</div>
                            <div className="text-gray-400 text-[11px] sm:text-sm leading-tight">авто отполировано</div>
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-bold text-white flex items-center justify-center gap-1">
                                ⭐ {averageRating ? averageRating : '—'}
                            </div>
                            <div className="text-gray-400 text-[11px] sm:text-sm leading-tight">
                                отзывов ({totalReviews})
                            </div>
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-bold text-white">24 мес</div>
                            <div className="text-gray-400 text-[11px] sm:text-sm leading-tight">гарантия защиты</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
