<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        $text = "📩 Новый клиент с сайта". "\n";
        if ($request->name) $text .= "Имя: " . $request->name . "\n";
        if ($request->phone) $text .= "Телефон: " . $request->phone . "\n";
        if ($request->message) $text .= "Сообщение: " . $request->message;

        // Сохраняем в базу
        $lead = Lead::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'message' => $request->message,
            'photo_path' => $path,
        ]);

        // Отправка в Telegram
        $this->sendTelegram($text, $path);

        return response()->json(['status' => 'success']);
    }

    private function sendTelegram($text, $photoPath = null)
    {
        $botToken = env('TELEGRAM_BOT_TOKEN');
        $chatId = env('TELEGRAM_CHAT_ID');
        $client = new \GuzzleHttp\Client();

        try {
            if ($photoPath) {
                // Отправка фото
                $client->post("https://api.telegram.org/bot$botToken/sendPhoto", [
                    'multipart' => [
                        [
                            'name'     => 'chat_id',
                            'contents' => $chatId
                        ],
                        [
                            'name'     => 'caption',
                            'contents' => $text,
                            'headers'  => ['Content-Type' => 'text/plain']
                        ],
                        [
                            'name'     => 'photo',
                            'contents' => fopen(storage_path("app/public/$photoPath"), 'r')
                        ]
                    ]
                ]);
            } else {
                // Если фото нет, отправляем текст
                $client->post("https://api.telegram.org/bot$botToken/sendMessage", [
                    'form_params' => [
                        'chat_id' => $chatId,
                        'text' => $text,
                        'parse_mode' => 'HTML',
                    ]
                ]);
            }

            \Log::info('Lead sent to Telegram', ['text' => $text, 'photo' => $photoPath]);
        } catch (\Throwable $e) {
            \Log::error('Telegram send error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
