const STORAGE_TO_PUBLIC = {
    'AutoPolish.jpg': '/images/AutoPolish.jpg',
    'before2.webp': '/images/before.jpg',
    'before.jpg': '/images/before.jpg',
    'after1.webp': '/images/after.jpg',
    'after.jpg': '/images/after.jpg',
    'cardPolish001.jpg': '/images/services/cardPolish001.jpg',
    '002.jpg': '/images/gallery/002.jpg',
    '003.jpg': '/images/gallery/003.jpg',
};

export const GALLERY_FALLBACKS = [
    '/images/gallery/002.jpg',
    '/images/gallery/003.jpg',
    '/images/gallery/cardPolish001.jpg',
];

/** Convert legacy /storage/ and absolute URLs to /images/ paths. */
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

    if (normalized.startsWith('/storage/app/public/')) {
        normalized = normalized.replace('/storage/app/public/', '/images/');
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

/** Ordered list of URLs to try when the primary image fails. */
export function getImageFallbacks(path) {
    const normalized = normalizeImagePath(path);
    const fallbacks = [normalized];

    if (path && path !== normalized) {
        fallbacks.push(String(path));
    }

    return [...new Set(fallbacks.filter(Boolean))];
}

/** Gallery API on old prod returns /storage/ URLs — use known public files instead. */
export function normalizeGalleryItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return GALLERY_FALLBACKS;
    }

    const usesLegacyStorage = items.some((item) => String(item).includes('/storage/'));
    if (usesLegacyStorage) {
        return GALLERY_FALLBACKS;
    }

    const normalized = items.map(normalizeImagePath).filter(Boolean);
    return normalized.length > 0 ? normalized : GALLERY_FALLBACKS;
}
