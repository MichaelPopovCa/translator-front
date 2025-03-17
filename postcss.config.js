import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        tailwindcss('./tailwind.config.js'),  // Путь к конфигу Tailwind
        autoprefixer,
    ],
}
