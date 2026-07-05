import { site } from '@/config/site';

export default function Logo({ className = 'h-10 w-auto object-contain', showText = false }) {
    return (
        <span className="inline-flex items-center gap-2 min-w-0">
            <img
                src={site.logo}
                alt={site.logoAlt}
                className={className}
                width={140}
                height={44}
                decoding="async"
            />
            {showText && (
                <span className="hidden sm:inline font-bold text-white truncate">{site.name}</span>
            )}
        </span>
    );
}
