export default function BeforeAfter({before, after, clip, handleRange }) {
    return (
        <section id="process" className="container mx-auto py-14 max-w-6xl">
            <h2 className="text-3xl mb-6 font-semibold">До / После</h2>
            <div className="relative rounded-lg border border-[#1b3247] overflow-hidden">
                <img
                    src={before}
                     alt="До"
                     className="w-full" />
                <img
                    src={after}
                    alt="После"
                    className="absolute inset-0 w-full h-full"
                    style={{ clipPath: `inset(0 0 0 ${clip}%)` }}
                />
                <input type="range" min="0" max="100" value={clip} onChange={handleRange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 bottom-0 w-0.5 bg-[#22d3ee]" style={{ left: `${clip}%` }}></div>
                </div>
            </div>
        </section>
    );
}
