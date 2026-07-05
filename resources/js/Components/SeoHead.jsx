import { Head } from '@inertiajs/react';
import { site } from '@/config/site';

export default function SeoHead({
    title = site.seo.title,
    description = site.seo.description,
    keywords = site.seo.keywords,
    image = site.seo.ogImage,
    url,
    averageRating = 0,
    totalReviews = 0,
}) {
    const canonical = url || (typeof window !== 'undefined' ? window.location.origin : '');
    const ogImage = image?.startsWith('http') ? image : `${canonical}${image}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: `${site.name} — ${site.legalName}`,
        description,
        url: canonical,
        telephone: site.phone,
        email: site.email,
        image: `${canonical}${site.logo}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            addressCountry: 'MD',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.lat,
            longitude: site.geo.lng,
        },
        openingHours: 'Mo-Sa 09:00-19:00',
        priceRange: '$$',
        areaServed: {
            '@type': 'City',
            name: 'Chișinău',
        },
        sameAs: [site.whatsapp, site.telegram],
        ...(totalReviews > 0 && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: averageRating,
                reviewCount: totalReviews,
                bestRating: 5,
                worstRating: 1,
            },
        }),
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content={site.name} />
            <meta name="geo.region" content="MD-CU" />
            <meta name="geo.placename" content="Chișinău" />
            <meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
            <meta name="ICBM" content={`${site.geo.lat}, ${site.geo.lng}`} />

            <link rel="canonical" href={canonical} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={site.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content="ru_MD" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" />

            <link rel="manifest" href="/site.webmanifest" />

            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}
