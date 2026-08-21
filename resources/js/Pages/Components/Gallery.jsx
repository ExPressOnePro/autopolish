import { useEffect, useState } from 'react';
import axiosInstance from '@/Pages/axiosInstance.js';
import OptimizedImage from '@/Components/OptimizedImage';

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchGallery = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await axiosInstance.get('/gallery');
                if (!cancelled) {
                    setGallery(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                console.error('Ошибка загрузки галереи:', err);
                if (!cancelled) {
                    setError('Не удалось загрузить фото');
                    // fallback relative paths if API fails
                    setGallery([
                        '/images/gallery/002.jpg',
                        '/images/gallery/003.jpg',
                        '/images/gallery/cardPolish001.jpg',
                    ]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchGallery();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl sm:text-3xl mb-6 font-semibold text-center text-white">
                Галерея работ
            </h2>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {Array(6).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] rounded-lg bg-gray-700/80 animate-pulse"
                        />
                    ))}
                </div>
            ) : gallery.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                    {error || 'Фотографии скоро появятся'}
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {gallery.map((img, i) => (
                        <OptimizedImage
                            key={`${img}-${i}`}
                            src={img}
                            alt={`Работа Prime Detail ${i + 1}`}
                            aspectRatio="4 / 3"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            wrapperClassName="rounded-lg shadow-md"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
