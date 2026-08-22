<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SyncPublicImagesToStorage extends Command
{
    protected $signature = 'app:sync-public-images-to-storage';

    protected $description = 'Copy all site images from public/images into storage/app/public (with legacy aliases)';

    /** @var list<string> */
    private array $imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    public function handle(): int
    {
        $sourceRoot = public_path('images');
        $targetRoot = storage_path('app/public');

        if (! File::isDirectory($sourceRoot)) {
            $this->error("Directory not found: {$sourceRoot}");

            return self::FAILURE;
        }

        File::ensureDirectoryExists($targetRoot);

        $copied = 0;

        // 1. Full mirror: public/images/** → storage/app/public/images/**
        $copied += $this->mirrorDirectory($sourceRoot, $targetRoot.'/images');

        // 2. Legacy flat paths (old /storage/AutoPolish.jpg etc.)
        $legacy = [
            'AutoPolish.jpg' => 'AutoPolish.jpg',
            'before2.webp' => 'before2.webp',
            'after1.webp' => 'after1.webp',
            'logo.png' => 'logo.png',
            'logo-32.png' => 'logo-32.png',
            'services/cardPolish001.jpg' => 'cardPolish001.jpg',
            'services/cardPolish001.jpg' => 'services/cardPolish001.jpg',
            'services/002.jpg' => 'services/002.jpg',
            'services/003.jpg' => 'services/003.jpg',
        ];

        foreach ($legacy as $from => $to) {
            $copied += $this->copyIfExists("{$sourceRoot}/{$from}", "{$targetRoot}/{$to}");
        }

        for ($i = 1; $i <= 8; $i++) {
            $copied += $this->copyIfExists(
                "{$sourceRoot}/gallery/pol{$i}.png",
                "{$targetRoot}/gallery/pol{$i}.webp"
            );
            $copied += $this->copyIfExists(
                "{$sourceRoot}/gallery/pol{$i}.png",
                "{$targetRoot}/gallery/pol{$i}.png"
            );
        }

        $copied += $this->copyIfExists("{$sourceRoot}/before2.webp", "{$targetRoot}/before.jpg");
        $copied += $this->copyIfExists("{$sourceRoot}/after1.webp", "{$targetRoot}/after.jpg");

        $link = public_path('storage');
        if (! file_exists($link)) {
            $this->call('storage:link');
        }

        $this->info("Synced {$copied} file(s) to storage/app/public");

        return self::SUCCESS;
    }

    private function mirrorDirectory(string $source, string $target): int
    {
        $count = 0;

        if (! File::isDirectory($source)) {
            return 0;
        }

        File::ensureDirectoryExists($target);

        foreach (File::allFiles($source) as $file) {
            if (! $this->isImage($file->getExtension())) {
                continue;
            }

            $relative = $file->getRelativePathname();
            $destination = $target.'/'.$relative;

            File::ensureDirectoryExists(dirname($destination));

            if (File::copy($file->getPathname(), $destination)) {
                $this->line("  images/{$relative}");
                $count++;
            }
        }

        return $count;
    }

    private function copyIfExists(string $source, string $destination): int
    {
        if (! File::isFile($source)) {
            return 0;
        }

        File::ensureDirectoryExists(dirname($destination));

        if (File::copy($source, $destination)) {
            $this->line('  '.str_replace(storage_path('app/public').'/', '', $destination));

            return 1;
        }

        return 0;
    }

    private function isImage(string $extension): bool
    {
        return in_array(strtolower($extension), $this->imageExtensions, true);
    }
}
