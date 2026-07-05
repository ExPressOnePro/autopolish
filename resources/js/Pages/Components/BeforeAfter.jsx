import OptimizedImage from '@/Components/OptimizedImage';

export default function BeforeAfter({ before, after, clip, handleRange }) {
    return (
        <section id="process" className="container mx-auto py-10 sm:py-14 max-w-6xl px-4">
            <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 font-semibold text-white text-center sm:text-left">
                До / После
            </h2>

            <div className="relative rounded-xl sm:rounded-2xl border border-[#1b3247] overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/10] bg-[#0c1826]">
                <OptimizedImage
                    src={before}
                    alt="До полировки"
                    priority={false}
                    wrapperClassName="absolute inset-0"
                    className="object-cover"
                />
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${clip}%)` }}
                >
                    <OptimizedImage
                        src={after}
                        alt="После полировки"
                        priority={false}
                        wrapperClassName="h-full w-full"
                        className="object-cover"
                    />
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={clip}
                    onChange={handleRange}
                    aria-label="Сравнение до и после"
                    className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-ew-resize touch-manipulation"
                />

                <div className="absolute inset-0 pointer-events-none z-10">
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-[#22d3ee] shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                        style={{ left: `${clip}%` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#22d3ee]/90 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ left: `${clip}%` }}
                    >
                        ↔
                    </div>
                </div>

                <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-md bg-black/50 text-xs text-white backdrop-blur-sm">
                    До
                </div>
                <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md bg-black/50 text-xs text-white backdrop-blur-sm">
                    После
                </div>
            </div>
        </section>
    );
}
