#!/usr/bin/env php
<?php
/**
 * Verify that every image path used on the site exists under public/.
 * Run: php deploy/verify-images.php
 */
$root = dirname(__DIR__);
$public = $root.'/public';

$required = [
    '/images/AutoPolish.jpg' => 'Hero, Sale Ready 360°',
    '/images/before2.webp' => 'Before/After (до)',
    '/images/after1.webp' => 'Before/After (после)',
    '/images/logo.png' => 'Header, SEO, favicon source',
    '/images/gallery/pol1.png' => 'Gallery',
    '/images/gallery/pol2.png' => 'Gallery',
    '/images/gallery/pol3.png' => 'Gallery',
    '/images/gallery/pol4.png' => 'Gallery',
    '/images/gallery/pol5.png' => 'Gallery',
    '/images/gallery/pol6.png' => 'Gallery',
    '/images/gallery/pol7.png' => 'Gallery',
    '/images/gallery/pol8.png' => 'Gallery',
    '/images/services/cardPolish001.jpg' => 'Service: полировка кузова',
    '/images/services/002.jpg' => 'Service: фары, PPF',
    '/images/services/003.jpg' => 'Service: PPF',
    '/favicon-32x32.png' => 'Favicon',
    '/favicon-16x16.png' => 'Favicon',
    '/apple-touch-icon.png' => 'Apple icon',
    '/android-chrome-192x192.png' => 'PWA icon',
];

$ok = 0;
$fail = 0;

foreach ($required as $path => $label) {
    $file = $public.$path;
    if (is_file($file)) {
        $ok++;
        echo "OK   {$path} — {$label}\n";
    } else {
        $fail++;
        echo "FAIL {$path} — {$label}\n";
    }
}

echo "\n{$ok} ok, {$fail} missing\n";
exit($fail > 0 ? 1 : 0);
