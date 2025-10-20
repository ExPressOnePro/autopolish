export default function Gallery({ gallery }) {
    return (
        <section id="gallery" className="container mx-auto py-14 px-4">
            <h2 className="text-3xl mb-6 font-semibold text-center">Галерея работ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`Галерея ${i + 1}`}
                        className="rounded-lg shadow-md w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                ))}
            </div>
        </section>
    );
}
