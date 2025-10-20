import { useForm } from "@inertiajs/react";

export default function BookingForm() {
    const { data, setData, post, processing } = useForm({ name: "", phone: "", service: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("bookings.store"));
    };

    return (
        <section id="booking" className="py-16 bg-gray-100">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Записаться на услугу</h2>
                <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-lg shadow">
                    <input
                        type="text" placeholder="Ваше имя"
                        value={data.name} onChange={(e) => setData("name", e.target.value)}
                        className="border px-4 py-2 rounded"
                    />
                    <input
                        type="text" placeholder="Телефон"
                        value={data.phone} onChange={(e) => setData("phone", e.target.value)}
                        className="border px-4 py-2 rounded"
                    />
                    <select
                        value={data.service} onChange={(e) => setData("service", e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="">Выберите услугу</option>
                        <option>Полировка кузова</option>
                        <option>Химчистка салона</option>
                        <option>Защитное покрытие</option>
                    </select>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-yellow-500 py-2 rounded text-white font-semibold hover:bg-yellow-600"
                    >
                        {processing ? "Отправка..." : "Записаться"}
                    </button>
                </form>
            </div>
        </section>
    );
}
