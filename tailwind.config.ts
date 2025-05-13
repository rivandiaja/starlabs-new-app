import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.ts',
    './resources/**/*.jsx',
    './resources/**/*.tsx',
    ],
    theme: {
    extend: {
        fontFamily: {
            poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            'star-blue': '#0a192f',
            'star-light': '#64ffda',
            'star-dark': '#020c1b',
        },
        animation: {
            'fade-in': 'fadeIn 1s ease-in-out',
            'slide-up': 'slideUp 0.8s ease-in-out',
            'slide-right': 'slideRight 0.8s ease-in-out',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
            },
            slideUp: {
            '0%': { transform: 'translateY(50px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            slideRight: {
            '0%': { transform: 'translateX(-50px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
            },
        }
    }
    },
    plugins: [],
}
