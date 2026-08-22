/** Map old /storage/ paths to /images/ (same files, public is source of truth). */
const STORAGE_TO_PUBLIC = {
    'AutoPolish.jpg': '/images/AutoPolish.jpg',
    'before2.webp': '/images/before2.webp',
    'before.jpg': '/images/before2.webp',
    'after1.webp': '/images/after1.webp',
    'after.jpg': '/images/after1.webp',
    'cardPolish001.jpg': '/images/services/cardPolish001.jpg',
    '002.jpg': '/images/services/002.jpg',
    '003.jpg': '/images/services/003.jpg',
    'pol1.webp': '/images/gallery/pol1.png',
    'pol2.webp': '/images/gallery/pol2.png',
    'pol3.webp': '/images/gallery/pol3.png',
    'pol4.webp': '/images/gallery/pol4.png',
    'pol5.webp': '/images/gallery/pol5.png',
    'pol6.webp': '/images/gallery/pol6.png',
    'pol7.webp': '/images/gallery/pol7.png',
    'pol8.webp': '/images/gallery/pol8.png',
};

export const GALLERY_FALLBACKS = [
    '/images/gallery/pol1.png',
    '/images/gallery/pol2.png',
    '/images/gallery/pol3.png',
    '/images/gallery/pol4.png',
    '/images/gallery/pol5.png',
    '/images/gallery/pol6.png',
    '/images/gallery/pol7.png',
    '/images/gallery/pol8.png',
];

/** Redirect legacy /storage/ URLs to /images/ (public paths). */
export function normalizeImagePath(path) {
    if (!path) {
        return path;
    }

    let normalized = String(path);

    if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
        try {
            normalized = new URL(normalized).pathname;
        } catch {
            return path;
        }
    }

    if (normalized.startsWith('/storage/images/')) {
        return normalized.replace('/storage/images/', '/images/');
    }

    if (normalized.startsWith('/storage/')) {
        const filename = normalized.split('/').pop();
        if (STORAGE_TO_PUBLIC[filename]) {
            return STORAGE_TO_PUBLIC[filename];
        }

        const relative = normalized.replace(/^\/storage\//, '');
        return `/images/${relative}`;
    }

    return normalized;
}

export function getImageFallbacks(path) {
    const normalized = normalizeImagePath(path);

    return [...new Set([normalized, path].filter(Boolean))];
}

export function normalizeGalleryItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return GALLERY_FALLBACKS;
    }

    const normalized = items.map(normalizeImagePath).filter(Boolean);
    const unique = [...new Set(normalized)];

    return unique.length > 0 ? unique : GALLERY_FALLBACKS;
}
