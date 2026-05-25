/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)', secondary: 'var(--background-secondary)', elevated: 'var(--background-elevated)' },
        foreground: { DEFAULT: 'var(--foreground)', muted: 'var(--muted-foreground)', subtle: 'var(--foreground-subtle)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)', hover: 'var(--primary-hover)', dim: 'var(--primary-dim)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)', dim: 'var(--accent-dim)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)', elevated: 'var(--card-elevated)' },
        border: { DEFAULT: 'var(--border)', subtle: 'var(--border-subtle)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        jlpt: {
          n5: 'var(--jlpt-n5)',
          n4: 'var(--jlpt-n4)',
          n3: 'var(--jlpt-n3)',
          n2: 'var(--jlpt-n2)',
          n1: 'var(--jlpt-n1)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
        'serif-jp': ['Noto Serif JP', 'serif'],
        'sans-jp': ['Noto Sans JP', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-streak': 'bounce-streak 0.5s ease',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
