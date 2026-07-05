<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'app:generate-sitemap';

    protected $description = 'Generate sitemap.xml and robots.txt for SEO';

    public function handle(): int
    {
        $base = rtrim(config('app.url'), '/');

        Sitemap::create()
            ->add(
                Url::create('/')
                    ->setPriority(1.0)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setLastModificationDate(now())
            )
            ->writeToFile(public_path('sitemap.xml'));

        $robots = implode("\n", [
            'User-agent: *',
            'Allow: /',
            '',
            'Disallow: /dashboard',
            'Disallow: /profile',
            'Disallow: /login',
            'Disallow: /register',
            '',
            "Sitemap: {$base}/sitemap.xml",
            '',
        ]);

        file_put_contents(public_path('robots.txt'), $robots);

        $this->info("Sitemap: {$base}/sitemap.xml");
        $this->info('robots.txt updated');

        return self::SUCCESS;
    }
}
