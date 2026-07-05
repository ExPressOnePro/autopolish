import OptimizedImage from '@/Components/OptimizedImage';

const zones = [
    {
        title: 'Кузов и ЛКП',
        desc: 'Полировка, удаление царапин и восстановление глубокого блеска',
        icon: '✨',
    },
    {
        title: 'Салон 360°',
        desc: 'Химчистка, кожа, пластик, потолок — без пятен и запахов',
        icon: '🪑',
    },
    {
        title: 'Стёкла и фары',
        desc: 'Кристальная прозрачность и яркий свет фар',
        icon: '💡',
    },
    {
        title: 'Диски и шины',
        desc: 'Чернение резины, очистка дисков, блеск как в шоуруме',
        icon: '🛞',
    },
    {
        title: 'Моторный отсек',
        desc: 'Аккуратная мойка и детейлинг под капотом',
        icon: '⚙️',
    },
    {
        title: 'Финиш для показа',
        desc: 'Антидождь, защита и подготовка к фото для объявления',
        icon: '📸',
    },
];

const benefits = [
    { value: '+15%', label: 'к цене продажи' },
    { value: '×2', label: 'быстрее находится покупатель' },
    { value: '360°', label: 'полный охват деталей' },
];

export default function SaleReady360({ scrollToId }) {
    return (
        <section
            id="Продажа"
            className="relative py-14 sm:py-20 overflow-hidden"
        >
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071018] via-[#0a1520] to-[#05080c]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Текст и CTA */}
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                            Sale Ready 360°
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight text-balance">
                            Подготовим авто к продаже
                            <span className="text-emerald-400"> на 360°</span>
                            — чтобы перед покупателем оно сияло
                        </h2>

                        <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                            Полный комплекс детейлинга: снаружи, внутри и в каждой детали.
                            Автомобиль выглядит как из салона — покупатель видит ухоженную машину
                            и готов платить больше.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
                            {benefits.map((item) => (
                                <div
                                    key={item.label}
                                    className="text-center p-3 sm:p-4 rounded-xl bg-[#0c1826]/80 border border-[#1b3247]"
                                >
                                    <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                                        {item.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1 leading-tight">
                                        {item.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => scrollToId?.('Контакты')}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 transition shadow-lg shadow-emerald-500/20"
                            >
                                Записаться на подготовку
                            </button>
                            <button
                                onClick={() => scrollToId?.('Цены')}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white border border-[#1b3247] hover:border-emerald-500/50 hover:text-emerald-300 transition"
                            >
                                Смотреть пакет Sale Ready
                            </button>
                        </div>
                    </div>

                    {/* Визуал 360° */}
                    <div className="relative">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1b3247] shadow-2xl shadow-emerald-500/10">
                            <OptimizedImage
                                src="/storage/AutoPolish.jpg"
                                alt="Автомобиль после подготовки к продаже"
                                aspectRatio="4 / 3"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                wrapperClassName="relative"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent" />

                            {/* Кольцо 360° */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-emerald-400/40 flex items-center justify-center animate-[spin_30s_linear_infinite]">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0c1826]/90 backdrop-blur-md border border-emerald-500/30 flex flex-col items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                                        <span className="text-2xl sm:text-3xl font-bold text-emerald-400">360°</span>
                                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">полный</span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs sm:text-sm text-white">
                                    До показа покупателю
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/90 text-xs sm:text-sm font-semibold text-black">
                                    Готово к продаже
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Зоны подготовки */}
                <div className="mt-14 sm:mt-16">
                    <h3 className="text-center text-xl sm:text-2xl font-semibold text-white mb-8">
                        Что входит в подготовку 360°
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {zones.map((zone, i) => (
                            <div
                                key={zone.title}
                                className="group relative p-5 sm:p-6 rounded-2xl bg-[#0c1826]/60 border border-[#1b3247] hover:border-emerald-500/40 transition-all duration-300"
                            >
                                <div className="absolute top-4 right-4 text-xs font-mono text-emerald-500/50">
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <span className="text-2xl" role="img" aria-hidden="true">
                                    {zone.icon}
                                </span>
                                <h4 className="mt-3 text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                    {zone.title}
                                </h4>
                                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                                    {zone.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Итоговый баннер */}
                <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#0c1826] to-green-500/10 border border-emerald-500/20 text-center">
                    <p className="text-lg sm:text-xl text-white font-medium text-balance">
                        Первое впечатление решает всё — покупатель оценивает машину за 30 секунд.
                        <span className="text-emerald-400"> Мы сделаем так, чтобы она сияла.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
