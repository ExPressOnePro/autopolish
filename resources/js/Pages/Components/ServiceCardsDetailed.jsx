import React from "react";

export default function ServicesFull() {
    const services = [
        {
            title: "Полировка кузова",
            desc: "Удаляем царапины, окисления и матовость, восстанавливаем глубокий заводской блеск.",
            extended: [
                "Глубокая шлифовка лакокрасочного покрытия",
                "Удаление мелких и средних царапин",
                "Восстановление цвета и блеска",
                "Защита поверхности на 3-6 месяцев с использованием защитных восков",
            ],
            images: [
                "/storage/cardPolish001.jpg",
                "/storage/polishing2.jpg",
                "/storage/services/polishing3.jpg",
            ],
        },
        {
            title: "Полировка фар и оптики",
            desc: "Восстанавливаем прозрачность фар, устраняем помутнение, желтизну и мелкие царапины.",
            extended: [
                "Удаление желтизны и помутнения",
                "Снятие мелких царапин",
                "Восстановление света фар и улучшение видимости ночью",
                "Нанесение защитного покрытия на 6-12 месяцев",
            ],
            images: [
                "/storage/002.jpg",
                "/storage/services/headlight2.jpg",
            ],
        },
        {
            title: "Оклейка бронеплёнкой (PPF)",
            desc: "Максимальная защита лакокрасочного покрытия от сколов, царапин и реагентов.",
            extended: [
                "Невидимая защита кузова — сохраняет цвет и блеск",
                "Самовосстанавливающаяся плёнка при нагреве",
                "Защита от ультрафиолета, реагентов и камней",
                "Долговечность до 7 лет",
            ],
            images: [
                "/storage/003.jpg",
                "/storage/ppf2.jpg",
                "/storage/ppf3.jpg",
            ],
        },
    ];

    return (
        <div id="services" className="mx-auto py-20 px-4">
            <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-white mb-3">Наши услуги</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Полный спектр услуг по уходу за автомобилем — от полировки до оклейки бронеплёнкой.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className=" rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
                    >
                        {/* Фото */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={service.images[0]}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1826]/80 to-transparent"></div>
                        </div>

                        {/* Контент */}
                        <div className="p-6 flex flex-col flex-grow justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-300 mb-3">{service.desc}</p>

                                <ul className="text-gray-300 mb-4 pl-4 list-disc space-y-1">
                                    {service.extended.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>

                                {/* Галерея миниатюр */}
                                {/*<div className="flex gap-2 mb-4 flex-wrap">*/}
                                {/*    {service.images.map((img, idx) => (*/}
                                {/*        <img*/}
                                {/*            key={idx}*/}
                                {/*            src={img}*/}
                                {/*            alt={`${service.title} ${idx + 1}`}*/}
                                {/*            className="w-20 h-20 object-cover rounded-lg border border-[#1b3247]"*/}
                                {/*            loading="lazy"*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                            </div>

                            <button
                                onClick={() =>
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl shadow hover:opacity-90 transition-all"
                            >
                                Записаться
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
