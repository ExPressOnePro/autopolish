<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $stats = Cache::remember('landing.review_stats', 300, function () {
            $averageRating = Review::avg('rating');

            return [
                'averageRating' => $averageRating ? round($averageRating, 2) : 0,
                'totalReviews' => Review::count(),
            ];
        });

        $reviews = Review::orderByDesc('created_at')->take(20)->get();

        return Inertia::render('HomeTest', [
            // Только относительные пути — без http:// и без APP_URL (важно для мобильного HTTPS)
            'image' => $this->resolveImage(
                ['images/AutoPolish.jpg', 'images/logo.png'],
                ['AutoPolish.jpg']
            ),
            'before' => $this->resolveImage(
                ['images/before2.webp'],
                ['before2.webp', 'before.jpg']
            ),
            'after' => $this->resolveImage(
                ['images/after1.webp'],
                ['after1.webp', 'after.jpg']
            ),
            'averageRating' => $stats['averageRating'],
            'totalReviews' => $stats['totalReviews'],
            'reviews' => $reviews,
        ]);
    }

    public function gallery(): JsonResponse
    {
        // v2 — сброс старого кэша с http://.../storage/gallery/pol*.webp
        $gallery = Cache::remember('landing.gallery.v3', 300, function () {
            $fromGallery = $this->listPublicImages('images/gallery');
            if ($fromGallery !== []) {
                return $fromGallery;
            }

            return $this->listPublicImages('images/services');
        });

        return response()->json(array_values($gallery));
    }

    /**
     * @param  list<string>  $publicCandidates  relative to public/
     * @param  list<string>  $storageCandidates relative to storage/app/public/
     */
    private function resolveImage(array $publicCandidates, array $storageCandidates = []): string
    {
        foreach ($publicCandidates as $path) {
            if (File::exists(public_path($path))) {
                return '/'.ltrim($path, '/');
            }
        }

        foreach ($storageCandidates as $path) {
            if (Storage::disk('public')->exists($path)) {
                $publicFallback = $this->storageToPublicPath($path);
                if ($publicFallback !== null) {
                    return $publicFallback;
                }

                return '/storage/'.ltrim($path, '/');
            }
        }

        return '/'.ltrim($publicCandidates[0], '/');
    }

    private function listPublicImages(string $dir): array
    {
        $full = public_path($dir);
        if (! File::isDirectory($full)) {
            return [];
        }

        return collect(File::files($full))
            ->filter(fn ($file) => $this->isImageExt($file->getExtension()))
            ->sortBy(fn ($file) => $file->getFilename())
            ->map(fn ($file) => '/'.trim($dir, '/').'/'.$file->getFilename())
            ->values()
            ->all();
    }

    private function listStorageImages(string $dir): array
    {
        if (! Storage::disk('public')->exists($dir)) {
            return [];
        }

        return collect(Storage::disk('public')->files($dir))
            ->filter(fn ($file) => $this->isImageExt(pathinfo($file, PATHINFO_EXTENSION)))
            ->sort()
            ->map(fn ($file) => '/storage/'.ltrim($file, '/'))
            ->values()
            ->all();
    }

    private function isImageExt(string $ext): bool
    {
        return in_array(strtolower($ext), ['jpg', 'jpeg', 'png', 'webp', 'gif'], true);
    }

    /** Map legacy storage filenames to public/images when the file was migrated. */
    private function storageToPublicPath(string $storagePath): ?string
    {
        $map = [
            'AutoPolish.jpg' => 'images/AutoPolish.jpg',
            'before2.webp' => 'images/before2.webp',
            'before.jpg' => 'images/before2.webp',
            'after1.webp' => 'images/after1.webp',
            'after.jpg' => 'images/after1.webp',
            'cardPolish001.jpg' => 'images/services/cardPolish001.jpg',
            'pol1.webp' => 'images/gallery/pol1.png',
            'pol2.webp' => 'images/gallery/pol2.png',
            'pol3.webp' => 'images/gallery/pol3.png',
            'pol4.webp' => 'images/gallery/pol4.png',
            'pol5.webp' => 'images/gallery/pol5.png',
            'pol6.webp' => 'images/gallery/pol6.png',
            'pol7.webp' => 'images/gallery/pol7.png',
            'pol8.webp' => 'images/gallery/pol8.png',
        ];

        $filename = basename($storagePath);
        if (! isset($map[$filename])) {
            return null;
        }

        $publicPath = $map[$filename];
        if (File::exists(public_path($publicPath))) {
            return '/'.$publicPath;
        }

        return null;
    }
}
