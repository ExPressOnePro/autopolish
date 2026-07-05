<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        if (Review::count() > 0) {
            return;
        }

        $reviews = [
            [
                'name' => 'Андрей',
                'message' => 'Делал полную полировку на BMW X5. Машина блестит как новая, царапины убрали полностью. Ребята работают аккуратно, всё объяснили. Рекомендую!',
                'rating' => 5,
                'ip' => 'seed-1',
                'created_at' => now()->subDays(12),
            ],
            [
                'name' => 'Марина',
                'message' => 'Готовили авто к продаже — салон, кузов, фары. Покупатель приехал и сразу сказал, что машина выглядит на 100%. Продала за 3 дня!',
                'rating' => 5,
                'ip' => 'seed-2',
                'created_at' => now()->subDays(8),
            ],
            [
                'name' => 'Ион',
                'message' => 'Полировка фар — ночью свет стал намного ярче. Быстро, качественно, по адекватной цене. Буду обращаться ещё.',
                'rating' => 5,
                'ip' => 'seed-3',
                'created_at' => now()->subDays(21),
            ],
            [
                'name' => 'Дмитрий',
                'message' => 'Керамика Pro — прошло 4 месяца, вода скатывается, блеск держится. Очень доволен результатом и сервисом.',
                'rating' => 5,
                'ip' => 'seed-4',
                'created_at' => now()->subDays(5),
            ],
            [
                'name' => 'Елена',
                'message' => 'Первый раз была в Prime Detail — приятно удивлена. Машину отдали чистой, с приятным запахом, без разводов. Спасибо!',
                'rating' => 4,
                'ip' => 'seed-5',
                'created_at' => now()->subDays(15),
            ],
            [
                'name' => 'Виктор',
                'message' => 'Оклеили капот бронеплёнкой. Работа аккуратная, швы не видно. Через месяц на трассе камень прилетел — ЛКП целое.',
                'rating' => 5,
                'ip' => 'seed-6',
                'created_at' => now()->subDays(30),
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}
