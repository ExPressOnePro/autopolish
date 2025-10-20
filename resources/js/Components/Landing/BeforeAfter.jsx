import React from "react";

export default function BeforeAfter({ clip, setClip }) {
    return (
        <section id="before-after" className="py-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">До и после</h2>
                <div className="relative w-full h-72 overflow-hidden rounded-xl">
                    <img src="/images/before.jpg" alt="До" className="absolute inset-0 w-full h-full object-cover" />
                    <img
                        src="/images/after.jpg"
                        alt="После"
                        className="absolute inset-0 h-full object-cover"
                        style={{ clipPath: `inset(0 ${100 - clip}% 0 0)` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={clip}
                        onChange={(e) => setClip(e.target.value)}
                        className="absolute bottom-4 left-0 w-full"
                    />
                </div>
            </div>
        </section>
    );
}
