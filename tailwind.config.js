import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'polish-shine': {
                    '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
                    '100%': { transform: 'translateX(220%) skewX(-12deg)' },
                },
            },
            animation: {
                'polish-shine': 'polish-shine 10s linear infinite',
            },
        },
    },

    plugins: [forms],

};
