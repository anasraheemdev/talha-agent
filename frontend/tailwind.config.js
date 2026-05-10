module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(32, 206, 255, 0.22)',
        soft: '0 20px 80px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        cyber: {
          900: '#020617',
          800: '#08101f',
          700: '#111b2c',
          500: '#08f0ff',
          400: '#57f0ff'
        }
      },
      backgroundImage: {
        'grid-lines': 'radial-gradient(circle at top, rgba(8, 240, 255, 0.08), transparent 30%), radial-gradient(circle at bottom right, rgba(96, 165, 250, 0.12), transparent 20%)'
      }
    }
  },
  plugins: []
};
