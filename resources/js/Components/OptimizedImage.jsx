import { useState } from 'react';

export default function OptimizedImage({
    src,
    alt,
    className = '',
    wrapperClassName = '',
    aspectRatio = null,
    priority = false,
    sizes = null,
    onLoad,
}) {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = (event) => {
        setLoaded(true);
        onLoad?.(event);
    };

    const img = (
        <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes ?? undefined}
            onLoad={handleLoad}
            className={[
                'w-full h-full object-cover transition-opacity duration-500',
                loaded ? 'opacity-100' : 'opacity-0',
                className,
            ].join(' ')}
        />
    );

    if (aspectRatio) {
        return (
            <div
                className={[
                    'relative overflow-hidden bg-[#0c1826]',
                    wrapperClassName,
                ].join(' ')}
                style={{ aspectRatio }}
            >
                {!loaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#0c1826] to-[#142234]" />
                )}
                {img}
            </div>
        );
    }

    return (
        <div className={['relative', wrapperClassName].join(' ')}>
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#0c1826] to-[#142234]" />
            )}
            {img}
        </div>
    );
}
