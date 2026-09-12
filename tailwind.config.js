/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-border': 'var(--color-surface-border)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-dim': 'var(--color-text-dim)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-glow': 'var(--color-accent-glow)',
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      maxWidth: {
        site: 'var(--container-max-width)',
      },
      zIndex: {
        navbar: 'var(--z-navbar)',
        player: 'var(--z-player)',
        modal: 'var(--z-modal)',
        overlay: 'var(--z-overlay)',
      },
      boxShadow: {
        glow: '0 0 25px -5px var(--color-accent-glow)',
        'glow-lg': '0 0 50px -10px var(--color-accent-glow)',
        card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'radar-spin': 'radarSpin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
