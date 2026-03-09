import React from "react";

export default function Pricing({ scrollToId }) {
    const packages = [
        {
            title: "Light • Обновление блеска",
            price: "",
            note: "",
            desc: "Быстрое восстановление блеска и защита поверхности до 3 месяцев.",
            features: [
                "Одноэтапная полировка кузова",
                "Удаление лёгких царапин и матовости",
                "Нанесение защитного воска",
                "Готовность авто в тот же день",
            ],
            badge: null,
            style: {},
            highlight: false,
        },

        {
            title: "Sale Ready • Подготовка к продаже",
            price: "",
            note: "",
            desc: "Полная подготовка автомобиля, чтобы он выглядел как из автосалона и продавался быстрее и дороже.",
            features: [
                "Глубокая мойка и очистка кузова",
                "Полировка для восстановления блеска",
                "Химчистка салона и удаление запахов",
                "Чернение шин и восстановление пластика",
                "Очистка стекол и фар",
                "Подготовка автомобиля для фото и показа покупателям",
            ],
            badge: "🔥 Лучший выбор перед продажей",
            highlight: true,
            style: {
                borderColor: "#22c55e",
                boxShadow: "0 15px 40px rgba(34, 197, 94, 0.35)",
            },
        },

        {
            title: "Pro • Коррекция + 12 мес защита",
            price: "",
            note: "",
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
            highlight: false,
        },
    ];

    return (
        <section className="container mx-auto py-20 px-4">
            <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-white mb-3">Пакеты услуг</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Выберите подходящий вариант — от лёгкого обновления до полной подготовки автомобиля.
                </p>
                <span className="inline-block mt-4 px-3 py-1 text-xs text-[#22d3ee] border border-[#22d3ee] rounded-full">
                    -10% при онлайн-записи
                </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
                {packages.map((pkg, i) => (
                    <div
                        key={i}
                        className={`bg-[#0c1826] border border-[#1b3247] rounded-2xl p-8 shadow-md flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${
                            pkg.highlight ? "md:scale-105 z-10" : ""
                        }`}
                        style={pkg.style}
                    >
                        {pkg.badge && (
                            <div className="absolute top-0 right-0 bg-[#22c55e] text-black px-3 py-1 text-xs font-semibold rounded-bl-xl">
                                {pkg.badge}
                            </div>
                        )}

                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-2">
                                {pkg.title}
                            </h3>

                            <p className="text-gray-400 mb-3 text-sm">{pkg.desc}</p>

                            {pkg.highlight && (
                                <p className="text-green-400 text-sm mb-4">
                                    Автомобиль выглядит дороже и продаётся быстрее
                                </p>
                            )}

                            <div className="text-3xl font-bold mb-4 text-white">
                                {pkg.price}{" "}
                                <small className="text-gray-400 text-sm font-normal">
                                    {pkg.note}
                                </small>
                            </div>

                            <ul className="mb-6 space-y-2">
                                {pkg.features.map((f, j) => (
                                    <li
                                        key={j}
                                        className="flex items-start gap-2 text-gray-300 text-sm"
                                    >
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
                            className={`mt-auto py-2 rounded-xl shadow transition-all ${
                                pkg.highlight
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
                            }`}
                        >
                            Записаться
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
