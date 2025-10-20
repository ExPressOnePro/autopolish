export default function ReviewsList({ reviews }) {
    return (
        <section id="reviews" className="py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Отзывы клиентов</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((r) => (
                        <div key={r.id} className="bg-white shadow rounded-lg p-4">
                            <p className="text-gray-600 mb-3">“{r.text}”</p>
                            <div className="font-semibold">{r.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
