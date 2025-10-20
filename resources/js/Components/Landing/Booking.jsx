import React from "react";

export default function Booking({ bookingForm }) {
    return (
        <section id="booking" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Онлайн-запись</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        bookingForm.post("/bookings");
                    }}
                    className="bg-white shadow p-6 rounded-xl space-y-3"
                >
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className="border rounded p-2 w-full"
                        value={bookingForm.data.name}
                        onChange={(e) => bookingForm.setData("name", e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Телефон"
                        className="border rounded p-2 w-full"
                        value={bookingForm.data.phone}
                        onChange={(e) => bookingForm.setData("phone", e.target.value)}
                    />
                    <select
                        className="border rounded p-2 w-full"
                        value={bookingForm.data.service}
                        onChange={(e) => bookingForm.setData("service", e.target.value)}
                    >
                        <option>Полировка Pro + керамика</option>
                        <option>Полировка Premium</option>
                        <option>Полировка + 3 слоя керамики</option>
                    </select>
                    <textarea
                        placeholder="Комментарий"
                        className="border rounded p-2 w-full"
                        value={bookingForm.data.message}
                        onChange={(e) => bookingForm.setData("message", e.target.value)}
                    />
                    <button className="bg-sky-500 text-white px-6 py-2 rounded-xl">
                        Записаться
                    </button>
                </form>
            </div>
        </section>
    );
}
