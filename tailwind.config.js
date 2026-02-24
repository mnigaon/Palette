/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                // Spring Warm
                spring: {
                    50: '#FFF5F0',
                    100: '#FFE8D9',
                    200: '#FFD4B8',
                    300: '#FFBA8C',
                    400: '#FF9A5C',
                    500: '#FF7A3D',
                    peach: '#FFBFA0',
                    coral: '#FF7F5C',
                    ivory: '#FFF8F0',
                    gold: '#FFD980',
                },
                // Summer Cool
                summer: {
                    50: '#FDF2F8',
                    100: '#FCE7F3',
                    200: '#FBCFE8',
                    300: '#F9A8D4',
                    400: '#F472B6',
                    500: '#EC4899',
                    rose: '#F5B8C4',
                    lavender: '#C8B4E0',
                    blue: '#B4C8E0',
                    mauve: '#C4A0B8',
                },
                // Autumn Warm
                autumn: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    terra: '#C4613C',
                    olive: '#7C8C5C',
                    mustard: '#D4A843',
                    burnt: '#C4501C',
                },
                // Winter Cool
                winter: {
                    50: '#FDF4FF',
                    100: '#FAE8FF',
                    200: '#F5D0FE',
                    300: '#F0ABFC',
                    400: '#E879F9',
                    500: '#D946EF',
                    burgundy: '#8C2040',
                    navy: '#1C2854',
                    white: '#F8F8FF',
                    pink: '#E0B0C0',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in': 'slideIn 0.4s ease-out',
                'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
            },
            backgroundImage: {
                'gradient-spring': 'linear-gradient(135deg, #FFE8D9 0%, #FFD4B8 50%, #FFF5F0 100%)',
                'gradient-summer': 'linear-gradient(135deg, #FCE7F3 0%, #EDE9FE 50%, #DBEAFE 100%)',
                'gradient-autumn': 'linear-gradient(135deg, #FFEDD5 0%, #FEF3C7 50%, #ECFCCB 100%)',
                'gradient-winter': 'linear-gradient(135deg, #FAE8FF 0%, #EFF6FF 50%, #F0F9FF 100%)',
                'gradient-hero': 'linear-gradient(135deg, #FFE4E8 0%, #F3E8FF 30%, #E8F4FF 60%, #E8FFF4 100%)',
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'medium': '0 8px 40px rgba(0, 0, 0, 0.12)',
                'glow-spring': '0 0 30px rgba(255, 186, 140, 0.4)',
                'glow-summer': '0 0 30px rgba(200, 180, 224, 0.4)',
                'glow-autumn': '0 0 30px rgba(196, 97, 60, 0.3)',
                'glow-winter': '0 0 30px rgba(140, 32, 64, 0.3)',
            },
        },
    },
    plugins: [],
}
