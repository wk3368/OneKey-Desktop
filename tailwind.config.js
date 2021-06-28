module.exports = {
    mode: 'jit',
    purge: ['../../packages/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                brand: '#00B812',
                gray: {
                    50: '#F9FAF9',
                    100: '#F5F6F5',
                    200: '#E6E9E6',
                    300: '#D3D9D4',
                    400: '#9FACA1',
                    500: '#697A6B',
                    600: '#59675B',
                    700: '#3D473E',
                    800: '#2D342E',
                    900: '#1F241F',
                },
            },
            fill: {
                none: 'none',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
