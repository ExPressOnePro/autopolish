<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'service' => 'required|string',
            'date' => 'required|date',
        ]);
        Booking::create($request->all());
        return back()->with('success', 'Ваша запись принята!');
    }
}
