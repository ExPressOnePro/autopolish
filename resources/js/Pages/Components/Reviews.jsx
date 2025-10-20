import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/Pages/axiosInstance.js";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState("");


    useEffect(() => {
        axios.get("/reviews").then(res => setReviews(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка обязательных полей
        if (!message || !rating) {
            setStatus("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);           // добавляем поля
        formData.append("message", message);
        formData.append("rating", rating);

        setStatus("Отправка...");

        try {
            const res = await axiosInstance.post("/reviews", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.status === "success") {
                setStatus("Спасибо за отзыв!");
                setReviews([res.data.review, ...reviews]);
                setMessage("");
                setName("");
            } else {
                setStatus(res.data.message || "Ошибка при отправке.");
            }
        } catch (err) {
            console.error(err);
            setStatus("Ошибка, попробуйте позже.");
        }
    };


    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl text-white font-bold mb-6 text-center">Отзывы клиентов</h2>

                {/* Форма */}
                <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ваше имя (опционально)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2"
                    />
                    <textarea
                        placeholder="Ваш отзыв"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2"
                        rows={4}
                    ></textarea>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}
                            className="bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2">
                        {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} звезды</option>)}
                    </select>
                    <button type="submit" className="w-full bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-700 transition">
                        Отправить отзыв
                    </button>
                </form>

                {/* Статус */}
                {status && <p className="text-center text-gray-300 mb-4">{status}</p>}

                {/* Список отзывов */}
                <div className="space-y-4">
                    {reviews.map((r) => (
                        <div key={r.id} className="bg-gray-700 p-4 rounded-xl shadow">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-white">{r.name || "Аноним"}</span>
                                <span className="text-yellow-400">{'★'.repeat(r.rating)}</span>
                            </div>
                            <p className="text-gray-300">{r.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
