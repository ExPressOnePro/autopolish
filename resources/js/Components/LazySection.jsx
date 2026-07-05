import { useEffect, useRef, useState } from 'react';

export default function LazySection({
    children,
    minHeight = '12rem',
    rootMargin = '200px 0px',
    className = '',
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: 0.01 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div
            ref={ref}
            className={className}
            style={{ minHeight: visible ? undefined : minHeight }}
        >
            {visible ? children : (
                <div
                    className="h-full w-full rounded-2xl bg-gradient-to-br from-[#0c1826] to-[#101a28] animate-pulse"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
