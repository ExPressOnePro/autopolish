<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class LeadController extends Controller
{
    public function sendLead(Request $request)
    {
        $request->validate([
            'photo' => 'nullable|image|max:5120',
            'name' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'message' => 'nullable|string|max:500',
        ]);

        $path = null;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('leads', 'public');
        }

        $text = "📩 Новая заявка с сайта Prime Detail\n";
        if ($request->name) {
            $text .= "Имя: {$request->name}\n";
        }
        if ($request->phone) {
            $text .= "Телефон: {$request->phone}\n";
        }
        if ($request->message) {
            $text .= "Сообщение: {$request->message}";
        }

        Lead::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'message' => $request->message,
            'photo_path' => $path,
        ]);

        $telegramSent = $this->sendTelegram($text, $path);

        return response()->json([
            'status' => 'success',
            'telegram' => $telegramSent,
        ]);
    }

    private function sendTelegram(string $text, ?string $photoPath = null): bool
    {
        $botToken = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (! $botToken || ! $chatId) {
            Log::warning('Telegram not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env');

            return false;
        }

        try {
            if ($photoPath && Storage::disk('public')->exists($photoPath)) {
                $response = Http::timeout(15)
                    ->attach('photo', Storage::disk('public')->get($photoPath), basename($photoPath))
                    ->post("https://api.telegram.org/bot{$botToken}/sendPhoto", [
                        'chat_id' => $chatId,
                        'caption' => $text,
                    ]);
            } else {
                $response = Http::timeout(15)->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => $text,
                ]);
            }

            if ($response->failed()) {
                Log::error('Telegram API error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return false;
            }

            Log::info('Lead sent to Telegram');

            return true;
        } catch (\Throwable $e) {
            Log::error('Telegram send error', [
                'message' => $e->getMessage(),
            ]);

            return false;
        }
    }
}
