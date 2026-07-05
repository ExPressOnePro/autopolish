import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/Pages/axiosInstance.js';
import OptimizedImage from '@/Components/OptimizedImage';

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const galleryRef = useRef(null);

    useEffect(() => {
        const node = galleryRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '250px 0px', threshold: 0.1 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || gallery.length > 0) return;

        const fetchGallery = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/gallery');
                setGallery(res.data);
            } catch (err) {
                console.error('Ошибка загрузки галереи:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [isVisible, gallery.length]);

    return (
        <div ref={galleryRef} className="mx-auto px-4 max-w-6xl content-auto">
            <h2 className="text-2xl sm:text-3xl mb-6 font-semibold text-center text-white">
                Галерея работ
            </h2>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {Array(8).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] rounded-lg bg-gray-700/80 animate-pulse"
                        />
                    ))}
                </div>
            ) : gallery.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Фотографии скоро появятся</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {gallery.map((img, i) => (
                        <OptimizedImage
                            key={img}
                            src={img}
                            alt={`Работа Prime Detail ${i + 1}`}
                            aspectRatio="4 / 3"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            wrapperClassName="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
                            className="group-hover:scale-[1.03] transition-transform duration-500"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
