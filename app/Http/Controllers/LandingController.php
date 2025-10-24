<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $image = Storage::url('AutoPolish.jpg');

        $averageRating = Review::avg('rating');
        $averageRating = $averageRating ? round($averageRating, 2) : 0;

        $totalReviews = Review::count();

        $before = Storage::url('before2.webp');
        $after = Storage::url('after1.webp');

        return Inertia::render('HomeTest', [
            'image'         => $image,
            'before'        => $before,
            'after'         => $after,
            'averageRating' => $averageRating,
            'totalReviews'  => $totalReviews,
        ]);
    }

    public function gallery(): JsonResponse
    {
        $files = Storage::files('public/gallery');

        $gallery = array_map(fn($file) => Storage::url($file), $files);

        return response()->json($gallery);
    }

}
