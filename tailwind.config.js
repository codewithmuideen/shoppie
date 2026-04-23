/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — aubergine/plum luxury palette
        plum: {
          50:  '#f6f2f8',
          100: '#ece1f0',
          200: '#d6bfe0',
          300: '#b594c5',
          400: '#8d66a3',
          500: '#6a4380',
          600: '#4e2f63',
          700: '#3a224a',
          800: '#2a1437',
          900: '#1a0c24',
          950: '#0f0618'
        },
        gold: {
          50:  '#fbf7ed',
          100: '#f4ecd1',
          200: '#e9d6a2',
          300: '#dcba6f',
          400: '#d2a34f',
          500: '#c9a961', // primary accent
          600: '#a88439',
          700: '#8a6a2e',
          800: '#6f5527',
          900: '#5c4722'
        },
        ivory: {
          50:  '#fdfbf6',
          100: '#faf7f2',
          200: '#f3ede1',
          300: '#ead9c0',
          400: '#d9bd95'
        },
        ink: '#171114'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(42, 20, 55, 0.18)',
        cardHover: '0 24px 60px -20px rgba(42, 20, 55, 0.35)',
        soft: '0 2px 20px -4px rgba(42, 20, 55, 0.08)'
      },
      letterSpacing: {
        luxe: '0.22em'
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'marquee': 'marquee 35s linear infinite'
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
}
