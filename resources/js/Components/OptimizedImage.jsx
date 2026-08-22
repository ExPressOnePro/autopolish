import { useEffect, useMemo, useRef, useState } from 'react';
import { getImageFallbacks } from '@/utils/imagePath';

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
    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [sourceIndex, setSourceIndex] = useState(0);
    const sources = useMemo(() => getImageFallbacks(src), [src]);
    const currentSrc = sources[sourceIndex] ?? src;

    useEffect(() => {
        setLoaded(false);
        setSourceIndex(0);
    }, [src]);

    useEffect(() => {
        const img = imgRef.current;
        // Safari/iOS: cached images may already be complete before onLoad binds
        if (img?.complete && img.naturalWidth > 0) {
            setLoaded(true);
        }
    }, [currentSrc]);

    const handleLoad = (event) => {
        setLoaded(true);
        onLoad?.(event);
    };

    const handleError = () => {
        if (sourceIndex < sources.length - 1) {
            setSourceIndex((index) => index + 1);
            return;
        }

        setLoaded(true);
    };

    const img = (
        <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            sizes={sizes ?? undefined}
            onLoad={handleLoad}
            onError={handleError}
            className={[
                // absolute fill for hero/covers — avoid global height:auto breaking mobile
                'absolute inset-0 w-full h-full max-w-none object-cover transition-opacity duration-300',
                loaded ? 'opacity-100' : 'opacity-100',
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
        <div className={['relative overflow-hidden', wrapperClassName].join(' ')}>
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#0c1826] to-[#142234]" />
            )}
            {img}
        </div>
    );
}
