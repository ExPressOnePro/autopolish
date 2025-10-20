<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function submit(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:50',
            'message' => 'nullable|string|max:500',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $userIp = $request->ip();

        // Проверяем, не оставлял ли этот IP отзыв за последние 24 часа
        $recentIpReview = Review::where('ip', $userIp)
            ->where('created_at', '>=', now()->subDay())
            ->first();

        if ($recentIpReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'Вы уже оставили отзыв за последние 24 часа.'
            ]);
        }

        $review = Review::create([
            'name' => $request->name,
            'message' => $request->message,
            'rating' => $request->rating,
            'ip' => $userIp,
        ]);

        return response()->json([
            'status' => 'success',
            'review' => $review
        ]);
    }


    public function list()
    {
        return Review::orderByDesc('created_at')->take(10)->get();
    }}
