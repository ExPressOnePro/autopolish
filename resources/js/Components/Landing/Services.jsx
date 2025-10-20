import React from "react";

const services = [
    { title: "Полировка кузова", desc: "Удаление царапин и восстановление блеска." },
    { title: "Полировка фар и оптики", desc: "Восстановление прозрачности фар, устранение помутнения, желтизны, царапин" },
    { title: "Керамическая защита", desc: "Долговечная защита от грязи и реагентов." },
    { title: "Химчистка салона", desc: "Глубокая очистка всех поверхностей." },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Наши услуги</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="bg-white shadow p-6 rounded-xl">
                            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                            <p className="text-gray-600">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
