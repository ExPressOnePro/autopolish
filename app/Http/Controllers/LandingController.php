<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
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
            'image' => Storage::url('AutoPolish.jpg'),
            'before' => Storage::url('before2.webp'),
            'after' => Storage::url('after1.webp'),
            'averageRating' => $stats['averageRating'],
            'totalReviews' => $stats['totalReviews'],
            'reviews' => $reviews,
        ]);
    }

    public function gallery(): JsonResponse
    {
        $gallery = Cache::remember('landing.gallery', 3600, function () {
            $files = Storage::disk('public')->files('gallery');

            return array_values(array_map(
                fn ($file) => Storage::disk('public')->url($file),
                $files
            ));
        });

        return response()->json($gallery);
    }
}
