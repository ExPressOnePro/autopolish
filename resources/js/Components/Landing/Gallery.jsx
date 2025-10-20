import React from "react";

export default function Gallery() {
    return (
        <section id="gallery" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Галерея</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <img
                            key={i}
                            src={`/images/gallery/${i}.jpg`}
                            alt="Авто"
                            className="rounded-lg shadow-md"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
