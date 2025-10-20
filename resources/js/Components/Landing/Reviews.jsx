import React from "react";

export default function Reviews({ reviews, reviewForm }) {
    return (
        <section id="reviews" className="py-20">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Отзывы клиентов</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {reviews.map((r, i) => (
                        <div key={i} className="bg-white shadow p-6 rounded-xl text-left">
                            <p className="italic">“{r.message}”</p>
                            <div className="mt-4 font-semibold">{r.name}</div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        reviewForm.post("/reviews");
                    }}
                    className="bg-white shadow p-6 rounded-xl max-w-lg mx-auto"
                >
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        className="border rounded p-2 w-full mb-3"
                        value={reviewForm.data.name}
                        onChange={(e) => reviewForm.setData("name", e.target.value)}
                    />
                    <textarea
                        placeholder="Ваш отзыв"
                        className="border rounded p-2 w-full mb-3"
                        value={reviewForm.data.message}
                        onChange={(e) => reviewForm.setData("message", e.target.value)}
                    />
                    <button className="bg-sky-500 text-white px-6 py-2 rounded-xl">
                        Оставить отзыв
                    </button>
                </form>
            </div>
        </section>
    );
}
