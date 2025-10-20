import React from "react";

const steps = ["Осмотр авто", "Мойка и подготовка", "Полировка", "Покрытие керамикой", "Финальная выдача"];

export default function Process() {
    return (
        <section id="process" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Процесс работы</h2>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    {steps.map((s, i) => (
                        <div key={i} className="bg-white shadow p-6 rounded-xl flex-1">
                            <span className="text-sky-600 text-2xl font-bold">{i + 1}</span>
                            <p className="mt-2">{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
