import OptimizedImage from '@/Components/OptimizedImage';

export default function ServicesFull() {
    const services = [
        {
            title: 'Полировка кузова',
            desc: 'Удаляем царапины, окисления и матовость, восстанавливаем глубокий заводской блеск.',
            extended: [
                'Глубокая шлифовка лакокрасочного покрытия',
                'Удаление мелких и средних царапин',
                'Восстановление цвета и блеска',
                'Защита поверхности на 3-6 месяцев',
            ],
            images: ['/images/services/cardPolish001.jpg'],
        },
        {
            title: 'Полировка фар и оптики',
            desc: 'Восстанавливаем прозрачность фар, устраняем помутнение, желтизну и мелкие царапины.',
            extended: [
                'Удаление желтизны и помутнения',
                'Снятие мелких царапин',
                'Восстановление света фар',
                'Защитное покрытие на 6-12 месяцев',
            ],
            images: ['/images/services/002.jpg'],
        },
        {
            title: 'Оклейка бронеплёнкой (PPF)',
            desc: 'Максимальная защита лакокрасочного покрытия от сколов, царапин и реагентов.',
            extended: [
                'Невидимая защита кузова',
                'Самовосстанавливающаяся плёнка',
                'Защита от УФ, реагентов и камней',
                'Долговечность до 7 лет',
            ],
            images: ['/images/services/003.jpg'],
        },
    ];

    return (
        <div className="mx-auto py-12 sm:py-20 px-4">
            <div className="text-center mb-10 sm:mb-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Наши услуги</h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    Полный спектр услуг по уходу за автомобилем — от полировки до оклейки бронеплёнкой.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {services.map((service, i) => (
                    <article
                        key={i}
                        className="rounded-2xl overflow-hidden shadow-md flex flex-col bg-[#0c1118]/40 border border-[#1b2a3a]/60"
                    >
                        <div className="relative group">
                            <OptimizedImage
                                src={service.images[0]}
                                alt={service.title}
                                aspectRatio="16 / 10"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                wrapperClassName="relative"
                                className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c1826] to-transparent pointer-events-none" />
                        </div>

                        <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">{service.desc}</p>

                                <ul className="text-gray-300 mb-4 pl-4 list-disc space-y-1 text-sm sm:text-base">
                                    {service.extended.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() =>
                                    document.getElementById('Контакты')?.scrollIntoView({ behavior: 'smooth' })
                                }
                                className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 px-4 rounded-xl shadow hover:opacity-90 transition-all"
                            >
                                Записаться
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
