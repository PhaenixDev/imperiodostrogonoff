/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        imperio: {
          dark: '#0a0a0c',
          card: '#121216',
          elevated: '#1a1a22',
          surface: '#22222c',
          gold: {
            DEFAULT: '#d4af37',
            light: '#f3cf65',
            hover: '#b89428',
            dark: '#8a6e1a',
            subtle: 'rgba(212, 175, 55, 0.12)',
            border: 'rgba(212, 175, 55, 0.25)',
          },
          amber: {
            DEFAULT: '#f59e0b',
            glow: '#fbbf24',
          },
          cream: {
            DEFAULT: '#fdfbf7',
            muted: '#e8e2d5',
            dark: '#a8a29e',
          },
          badge: '#ffcc00'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Caveat"', '"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 35px -5px rgba(212, 175, 55, 0.4)',
        'amber-glow': '0 0 20px -3px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
