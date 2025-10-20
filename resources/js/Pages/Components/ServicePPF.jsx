export default function ServicePPF() {
    return (
        <section id="ppf" className="container mx-auto py-20 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-3">Оклейка бронеплёнкой (PPF)</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Максимальная защита кузова от царапин, сколов и реагентов. Плёнка невидима,
                    самовосстанавливается при нагреве и сохраняет блеск автомобиля до 7 лет.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Изображение */}
                <div className="relative rounded-2xl overflow-hidden border border-[#1b3247] shadow-lg">
                    <img
                        src="/storage/app/public/ppf-example.jpg" // поменяй путь под свой
                        alt="Оклейка бронеплёнкой"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Контент */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-white">Преимущества</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-1" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.5 11.7L3 13.2L9 19.2L21 7.2L19.5 5.7Z" /></svg>
                            Невидимая защита — сохраняет цвет и блеск кузова.
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-1" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.5 11.7L3 13.2L9 19.2L21 7.2L19.5 5.7Z" /></svg>
                            Самовосстанавливается при нагреве — мелкие царапины исчезают.
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-1" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.5 11.7L3 13.2L9 19.2L21 7.2L19.5 5.7Z" /></svg>
                            Защита от пескоструя, камней, реагентов и ультрафиолета.
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-1" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2L4.5 11.7L3 13.2L9 19.2L21 7.2L19.5 5.7Z" /></svg>
                            Долговечность — служит до 7 лет без потери свойств.
                        </li>
                    </ul>

                    <div className="mt-8">
                        <h4 className="text-xl font-semibold text-white mb-2">Варианты оклейки:</h4>
                        <p className="text-gray-300 mb-4">
                            • Полная оклейка кузова<br />
                            • Частичная оклейка зон риска (капот, бампер, зеркала)<br />
                            • Глянцевая или матовая плёнка под стиль авто
                        </p>

                        <button
                            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all"
                        >
                            Записаться на оклейку
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
