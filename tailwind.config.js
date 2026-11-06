/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baby: {
          pink: '#ffd1dc',
          'pink-soft': '#fff0f3',
          'pink-deep': '#f48fb1',
          rose: '#e8a598',
          blue: '#c5e3f6',
          'blue-soft': '#ebf5fc',
          mint: '#d2f1e4',
          'mint-soft': '#f0faf5',
          cream: '#fffdfa',
          sand: '#fcf6f0',
          peach: '#ffe5d9',
          gold: '#f3c98b',
          lavender: '#e8def8',
          charcoal: '#37323e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(220, 180, 190, 0.25)',
        'soft-lg': '0 20px 40px -10px rgba(220, 180, 190, 0.35)',
        'glow': '0 0 25px rgba(255, 182, 193, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
