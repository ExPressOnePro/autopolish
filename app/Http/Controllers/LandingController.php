<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
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
            'image' => $this->publicImage('images/AutoPolish.jpg', 'images/logo.png'),
            'before' => $this->publicImage('images/before2.webp'),
            'after' => $this->publicImage('images/after1.webp'),
            'averageRating' => $stats['averageRating'],
            'totalReviews' => $stats['totalReviews'],
            'reviews' => $reviews,
        ]);
    }

    public function gallery(): JsonResponse
    {
        $gallery = Cache::remember('landing.gallery.v4', 300, function () {
            $fromGallery = $this->listPublicImages('images/gallery');
            if ($fromGallery !== []) {
                return $fromGallery;
            }

            return $this->listPublicImages('images/services');
        });

        return response()->json(array_values($gallery));
    }

    /** @param  list<string>  $candidates relative to public/ */
    private function publicImage(string ...$candidates): string
    {
        foreach ($candidates as $path) {
            if (File::exists(public_path($path))) {
                return '/'.ltrim($path, '/');
            }
        }

        return '/'.ltrim($candidates[0], '/');
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

    private function isImageExt(string $ext): bool
    {
        return in_array(strtolower($ext), ['jpg', 'jpeg', 'png', 'webp', 'gif'], true);
    }
}
