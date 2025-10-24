import { useState, useEffect, useRef } from "react";
import axios from "axios";
import axiosInstance from "@/Pages/axiosInstance.js";

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const galleryRef = useRef(null);

    // Intersection Observer — следит, когда галерея попадает в поле зрения
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => {
            if (galleryRef.current) observer.unobserve(galleryRef.current);
        };
    }, []);

    // Подгружаем галерею, когда блок стал видимым
    useEffect(() => {
        if (!isVisible || gallery.length > 0) return;

        const fetchGallery = async () => {
            setLoading(true);

            // Минимум 1 секунда ожидания
            const delay = new Promise((res) => setTimeout(res, 1000));

            try {
                const [res] = await Promise.all([
                    axiosInstance.get("/gallery"),
                    delay,
                ]);
                setGallery(res.data);
            } catch (err) {
                console.error("Ошибка загрузки галереи:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [isVisible]);

    return (
        <div ref={galleryRef} id="gallery" className="mx-auto py-14 px-4 max-w-6xl">
            <h2 className="text-3xl mb-6 font-semibold text-center text-white">
                Галерея работ
            </h2>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-64 rounded-lg bg-gray-700 animate-pulse"
                            ></div>
                        ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {gallery.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`pol${i + 1}`}
                            className="rounded-lg shadow-md w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
