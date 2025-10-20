import React from "react";

export default function Pricing({ cls, setCls, pack, setPack, price }) {
    return (
        <section id="pricing" className="py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Расчет стоимости</h2>
                <div className="bg-white p-6 shadow rounded-xl space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Класс авто</label>
                        <select
                            value={cls}
                            onChange={(e) => setCls(e.target.value)}
                            className="border rounded p-2 w-full"
                        >
                            <option value="1.0">A/B (малый)</option>
                            <option value="1.2">C/D (средний)</option>
                            <option value="1.4">E/F (большой)</option>
                            <option value="1.6">SUV</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Пакет услуг</label>
                        <select
                            value={pack}
                            onChange={(e) => setPack(e.target.value)}
                            className="border rounded p-2 w-full"
                        >
                            <option value="14900">Полировка Pro + керамика</option>
                            <option value="19900">Полировка Premium</option>
                            <option value="25900">Полировка + 3 слоя керамики</option>
                        </select>
                    </div>
                    <div className="text-2xl font-bold text-sky-600">Стоимость: {price}</div>
                </div>
            </div>
        </section>
    );
}
