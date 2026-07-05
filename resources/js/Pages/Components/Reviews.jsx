import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/Pages/axiosInstance.js";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios.get("/reviews")
            .then(res => setReviews(res.data))
            .catch(() => setStatus("Не удалось загрузить отзывы. Обновите страницу."))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message || !rating) {
            setStatus("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
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
        <section className="py-10 sm:py-16 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl">
                <h2 className="text-2xl sm:text-3xl text-white font-bold mb-6 text-center">Отзывы клиентов</h2>

                <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ваше имя (опционально)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2.5 text-base"
                    />
                    <textarea
                        placeholder="Ваш отзыв"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2.5 text-base"
                        rows={4}
                    />
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full sm:w-auto bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2.5 text-base"
                    >
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} звёзд</option>)}
                    </select>
                    <button type="submit" className="w-full bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-700 transition font-medium">
                        Отправить отзыв
                    </button>
                </form>

                {status && <p className="text-center text-gray-300 mb-4 text-sm sm:text-base">{status}</p>}

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-gray-700 p-4 rounded-xl animate-pulse h-20" />
                        ))}
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-400 py-6">
                        Пока нет отзывов — будьте первым!
                    </p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((r) => (
                            <div key={r.id} className="bg-gray-700 p-4 rounded-xl shadow">
                                <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                                    <span className="font-semibold text-white">{r.name || "Аноним"}</span>
                                    <span className="text-yellow-400">{'★'.repeat(r.rating)}</span>
                                </div>
                                <p className="text-gray-300 text-sm sm:text-base">{r.message || r.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
