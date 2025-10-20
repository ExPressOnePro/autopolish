import React, { useEffect, useState, useRef } from "react";

export default function LazySection({ children }) {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect(); // больше не нужно наблюдать
                }
            },
            { threshold: 0.1 } // 10% блока видимы
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return <div ref={ref}>{visible ? children : null}</div>;
}
