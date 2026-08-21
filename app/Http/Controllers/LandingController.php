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
                ['images/before.jpg', 'images/services/cardPolish001.jpg'],
                ['before2.webp', 'before.jpg', 'cardPolish001.jpg']
            ),
            'after' => $this->resolveImage(
                ['images/after.jpg', 'images/AutoPolish.jpg'],
                ['after1.webp', 'after.jpg', 'AutoPolish.jpg']
            ),
            'averageRating' => $stats['averageRating'],
            'totalReviews' => $stats['totalReviews'],
            'reviews' => $reviews,
        ]);
    }

    public function gallery(): JsonResponse
    {
        $gallery = Cache::remember('landing.gallery', 300, function () {
            $fromPublic = $this->listPublicImages('images/gallery');
            if ($fromPublic !== []) {
                return $fromPublic;
            }

            $fromStorage = $this->listStorageImages('gallery');
            if ($fromStorage !== []) {
                return $fromStorage;
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
}
