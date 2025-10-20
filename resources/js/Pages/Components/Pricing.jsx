export default function Pricing({ carClass, setCarClass, pack, setPack, calcResult, scrollToId }) {
    const packages = [
        {
            title: "Light • Обновление блеска",
            price: "6 900 ₽",
            note: "/ седан",
            features: [
                "Лёгкая одноэтапная полировка",
                "Защитный воск 3 мес"
            ],
            badge: null,
            style: {}
        },
        {
            title: "Pro • Коррекция + 12мес защита",
            price: "14 900 ₽",
            note: "/ седан",
            features: [
                "Двухэтапная полировка",
                "Керамика 9H • 12 мес",
                "Защита пластика и хрома"
            ],
            badge: "ТОП-выбор",
            style: { borderColor: "#2fc1e6", boxShadow: "0 10px 30px rgba(14,165,233,.2)" }
        },
        {
            title: "Max • Шоу-глянец + 24мес",
            price: "29 900 ₽",
            note: "/ любой класс",
            features: [
                "Трёхэтапная коррекция",
                "Премиум керамика 24 мес",
                "Стекло/фары защита"
            ],
            badge: null,
            style: {}
        }
    ];

    return (
        <div className="container mx-auto py-14 max-w-6xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-semibold mb-2">Пакеты и цены</h2>
                <span className="inline-block px-3 py-1 text-xs text-[#22d3ee] border border-[#22d3ee] rounded-full">скидка -10% при онлайн-записи</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg, i) => (
                    <div key={i} className="bg-[#0f141b] p-6 rounded-xl shadow-md flex flex-col justify-between relative" style={pkg.style}>
                        {pkg.badge && (
                            <div className="absolute top-0 right-0 bg-[#2fc1e6] text-black px-2 py-1 text-xs rounded-bl-lg">{pkg.badge}</div>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                        <div className="text-2xl font-bold mb-4">
                            {pkg.price} <small className="text-sm font-normal">{pkg.note}</small>
                        </div>
                        <ul className="mb-4 space-y-2">
                            {pkg.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9 16.2l-3.5-3.6L4 14l5 5 11-11-1.5-1.5z"/>
                                    </svg>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {/*<button className="btn mt-auto" onClick={() => scrollToId('book')}>Выбрать</button>*/}
                    </div>
                ))}
            </div>
        </div>
    );
}
