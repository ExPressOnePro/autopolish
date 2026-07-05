import { useState } from 'react';
import axiosInstance from '@/Pages/axiosInstance.js';

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5" aria-label={`Оценка ${rating} из 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                    ★
                </span>
            ))}
            <span className="ml-1.5 text-sm font-medium text-yellow-400/90">{rating}/5</span>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function Reviews({ initialReviews = [], averageRating = 0, totalReviews = 0 }) {
    const [reviews, setReviews] = useState(initialReviews);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim() || !rating) {
            setStatus('Напишите отзыв и выберите оценку.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('message', message);
        formData.append('rating', rating);

        setStatus('Отправка...');

        try {
            const res = await axiosInstance.post('/reviews', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.status === 'success') {
                setStatus('Спасибо! Ваш отзыв опубликован.');
                setReviews([res.data.review, ...reviews]);
                setMessage('');
                setName('');
                setShowForm(false);
            } else {
                setStatus(res.data.message || 'Ошибка при отправке.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Ошибка, попробуйте позже.');
        }
    };

    return (
        <section className="py-10 sm:py-14 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Заголовок и сводка */}
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Отзывы клиентов</h2>
                    <p className="mt-2 text-gray-400 text-sm sm:text-base">
                        Что говорят о нашей работе
                    </p>
                    {totalReviews > 0 && (
                        <div className="mt-4 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0c1826] border border-[#1b3247]">
                            <span className="text-2xl font-bold text-yellow-400">★ {averageRating}</span>
                            <span className="text-gray-400 text-sm">
                                {totalReviews} {totalReviews === 1 ? 'отзыв' : totalReviews < 5 ? 'отзыва' : 'отзывов'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Список отзывов — главный блок */}
                {reviews.length === 0 ? (
                    <div className="text-center py-10 px-6 rounded-2xl bg-[#0c1826] border border-[#1b3247] mb-8">
                        <p className="text-gray-400">Пока нет отзывов — будьте первым!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
                        {reviews.map((r) => (
                            <article
                                key={r.id}
                                className="p-5 sm:p-6 rounded-2xl bg-[#0c1826] border border-[#1b3247] hover:border-[#2a4560] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <p className="font-semibold text-white text-base">
                                            {r.name || 'Клиент'}
                                        </p>
                                        {r.created_at && (
                                            <time className="text-xs text-gray-500 mt-0.5 block">
                                                {formatDate(r.created_at)}
                                            </time>
                                        )}
                                    </div>
                                    <StarRating rating={Number(r.rating)} />
                                </div>
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                    «{r.message || r.text}»
                                </p>
                            </article>
                        ))}
                    </div>
                )}

                {/* Форма — свёрнута по умолчанию */}
                <div className="max-w-xl mx-auto">
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full py-3 rounded-xl border border-dashed border-[#1b3247] text-gray-400 hover:text-white hover:border-blue-500 transition text-sm sm:text-base"
                        >
                            + Оставить свой отзыв
                        </button>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-6 rounded-2xl bg-[#0c1826] border border-[#1b3247] space-y-3"
                        >
                            <p className="text-white font-medium mb-1">Ваш отзыв</p>

                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Оценка *</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-2xl transition ${star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input
                                type="text"
                                placeholder="Ваше имя (необязательно)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#101f30] text-white border border-[#1b3247] rounded-xl px-4 py-3 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                            <textarea
                                placeholder="Расскажите о работе: что делали, какой результат?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                required
                                className="w-full bg-[#101f30] text-white border border-[#1b3247] rounded-xl px-4 py-3 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none resize-none"
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                                >
                                    Опубликовать
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-3 rounded-xl border border-[#1b3247] text-gray-400 hover:text-white transition"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    )}

                    {status && (
                        <p
                            className={`mt-3 text-center text-sm ${
                                status.includes('Ошибка') || status.includes('Напишите')
                                    ? 'text-red-400'
                                    : status === 'Отправка...'
                                      ? 'text-gray-400'
                                      : 'text-green-400'
                            }`}
                        >
                            {status}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
