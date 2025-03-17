export default {
    mode: 'jit',
    content: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
    theme: {
        scale: {
            xs: '1',
            sm: '1.125',
            md: '1.25',
            lg: '1.5',
            xl: '2',
            '2x': '2.5',
            '3x': '3',
            '4x': '4',
        },
        fontSize: {
            xs: '1rem',
            sm: '1.125rem',
            md: '1.25rem',
            lg: '1.5rem',
            xl: '2rem',
            '2xl': '2.5rem',
            '3xl': '3rem',
            '4xl': '4rem',
        },
        extend: {
            screens: {
                xs: '320px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                '3xl': '1920px',
                '4xl': '3840px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
