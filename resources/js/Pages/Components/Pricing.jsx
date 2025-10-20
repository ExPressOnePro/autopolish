import React from "react";

export default function Pricing({ scrollToId }) {
    const packages = [
        {
            title: "Light • Обновление блеска",
            price: "2 000 MDL",
            note: "/ седан",
            desc: "Быстрое восстановление блеска и защита поверхности до 3 месяцев.",
            features: [
                "Одноэтапная полировка кузова",
                "Удаление лёгких царапин и матовости",
                "Нанесение защитного воска",
                "Готовность авто в тот же день",
            ],
            badge: null,
            style: {},
        },
        {
            title: "Pro • Коррекция + 12 мес защита",
            price: "4 200 MDL",
            note: "/ седан",
            desc: "Глубокая полировка с керамикой 9H для стойкого блеска и защиты.",
            features: [
                "Двухэтапная коррекция ЛКП",
                "Керамическое покрытие 9H на 12 мес",
                "Защита хрома и пластиковых деталей",
                "Гидрофобный эффект и легкий уход",
            ],
            badge: "ТОП-выбор клиентов",
            style: {
                borderColor: "#22d3ee",
                boxShadow: "0 10px 30px rgba(34, 211, 238, 0.3)",
            },
        },
        {
            title: "Max • Шоу-глянец + 24 мес",
            price: "7 900 MDL",
            note: "/ любой класс",
            desc: "Премиум уход и защита автомобиля на 2 года. Максимальный блеск.",
            features: [
                "Трёхэтапная коррекция кузова",
                "Премиум-керамика с гарантией 24 мес",
                "Защита фар, стёкол и пластиков",
                "Идеальный финиш под шоу-кар",
            ],
            badge: "Премиум",
            style: {
                borderColor: "#eab308",
                boxShadow: "0 10px 30px rgba(234, 179, 8, 0.3)",
            },
        },
    ];

    return (
        <section className="container mx-auto py-20 px-4">
            <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-white mb-3">Пакеты полировки</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Выберите подходящий вариант — от лёгкого обновления до полной коррекции и премиум защиты.
                </p>
                <span className="inline-block mt-4 px-3 py-1 text-xs text-[#22d3ee] border border-[#22d3ee] rounded-full">
                    -10% при онлайн-записи
                </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {packages.map((pkg, i) => (
                    <div
                        key={i}
                        className="bg-[#0c1826] border border-[#1b3247] rounded-2xl p-8 shadow-md flex flex-col justify-between relative hover:scale-[1.02] transition-all duration-300"
                        style={pkg.style}
                    >
                        {pkg.badge && (
                            <div className="absolute top-0 right-0 bg-[#22d3ee] text-black px-3 py-1 text-xs font-semibold rounded-bl-xl">
                                {pkg.badge}
                            </div>
                        )}

                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-2">{pkg.title}</h3>
                            <p className="text-gray-400 mb-4 text-sm">{pkg.desc}</p>
                            <div className="text-3xl font-bold mb-4 text-white">
                                {pkg.price}{" "}
                                <small className="text-gray-400 text-sm font-normal">{pkg.note}</small>
                            </div>

                            <ul className="mb-6 space-y-2">
                                {pkg.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <svg
                                            className="w-5 h-5 text-green-400 flex-shrink-0 mt-[2px]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M9 16.2l-3.5-3.6L4 14l5 5 11-11-1.5-1.5z"
                                            />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => scrollToId?.("contact")}
                            className="mt-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl shadow hover:opacity-90 transition-all"
                        >
                            Записаться
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
