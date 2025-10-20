export default function Calculator({ carClass, setCarClass, pack, setPack, calcResult }) {
    return (
        <section id="pricing" className="container mx-auto py-14">
            <h2 className="text-3xl mb-6 font-semibold">Калькулятор стоимости</h2>
            <div className="bg-[#0f141b] p-6 rounded-xl shadow-md">
                <div className="grid md:grid-cols-3 gap-4">
                    <select className="input bg-[#0c1826]" value={carClass} onChange={(e)=>setCarClass(Number(e.target.value))}>
                        <option value="1">Седан / Хэтчбек</option>
                        <option value="1.2">Кроссовер</option>
                        <option value="1.4">Внедорожник</option>
                    </select>
                    <select className="input bg-[#0c1826]" value={pack} onChange={(e)=>setPack(Number(e.target.value))}>
                        <option value="6900">Light</option>
                        <option value="14900">Pro</option>
                        <option value="29900">Max</option>
                    </select>
                    <input className="input bg-[#0c1826]" value={calcResult.toLocaleString('ru-RU') + ' ₽'} readOnly />
                </div>
            </div>
        </section>
    );
}
