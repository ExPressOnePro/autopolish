<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        // Главное изображение
        $image = Storage::url('AutoPolish.jpg');

        // Галерея — просто список имён файлов
        $galleryFiles = [
            'pol1.png',
            'pol2.png',
            'pol3.png',
            'pol4.png',
            'pol5.png',
            'pol6.png',
            'pol7.png',
            'pol8.png',
        ];

        $averageRating = Review::avg('rating');
        $averageRating = $averageRating ? round($averageRating, 2) : 0;

        // 📈 Количество отзывов
        $totalReviews = Review::count();



        $before = Storage::url('before2.JPG');
        $after = Storage::url('after1.JPG');
        // Генерируем корректные URL
        $gallery = array_map(fn($file) => Storage::url($file), $galleryFiles);

        return Inertia::render('HomeTest', [
            'image'         => $image,
            'gallery'       => $gallery,
            'before'        => $before,
            'after'         => $after,
            'averageRating' => $averageRating,
            'totalReviews'  => $totalReviews,
        ]);
    }

}
