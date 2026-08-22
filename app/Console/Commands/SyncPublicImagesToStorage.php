<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SyncPublicImagesToStorage extends Command
{
    protected $signature = 'app:sync-public-images-to-storage {--purge : Remove storage files not present in public/images}';

    protected $description = 'Mirror public/images into storage/app/public/images (storage = copy of public only)';

    /** @var list<string> */
    private array $imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    public function handle(): int
    {
        $sourceRoot = public_path('images');
        $targetRoot = storage_path('app/public/images');

        if (! File::isDirectory($sourceRoot)) {
            $this->error("Directory not found: {$sourceRoot}");

            return self::FAILURE;
        }

        if ($this->option('purge')) {
            $this->purgeStoragePublic();
        }

        File::ensureDirectoryExists($targetRoot);

        $copied = $this->mirrorDirectory($sourceRoot, $targetRoot);

        $link = public_path('storage');
        if (! file_exists($link)) {
            $this->call('storage:link');
        }

        $this->info("Mirrored {$copied} file(s): public/images → storage/app/public/images");

        return self::SUCCESS;
    }

    private function purgeStoragePublic(): void
    {
        $root = storage_path('app/public');

        foreach (File::allFiles($root) as $file) {
            if ($file->getFilename() === '.gitignore') {
                continue;
            }

            if ($this->isImage($file->getExtension())) {
                File::delete($file->getPathname());
            }
        }

        // Remove empty directories left after purge (keep images/ tree rebuilt by mirror)
        $this->removeEmptyDirectories($root);

        $this->line('  Purged old files from storage/app/public');
    }

    private function removeEmptyDirectories(string $dir): void
    {
        if (! File::isDirectory($dir)) {
            return;
        }

        foreach (File::directories($dir) as $sub) {
            $this->removeEmptyDirectories($sub);
        }

        if ($dir !== storage_path('app/public') && File::isEmptyDirectory($dir)) {
            File::deleteDirectory($dir);
        }
    }

    private function mirrorDirectory(string $source, string $target): int
    {
        $count = 0;

        foreach (File::allFiles($source) as $file) {
            if (! $this->isImage($file->getExtension())) {
                continue;
            }

            $relative = $file->getRelativePathname();
            $destination = $target.'/'.$relative;

            File::ensureDirectoryExists(dirname($destination));
            File::copy($file->getPathname(), $destination);
            $this->line("  {$relative}");
            $count++;
        }

        return $count;
    }

    private function isImage(string $extension): bool
    {
        return in_array(strtolower($extension), $this->imageExtensions, true);
    }
}
