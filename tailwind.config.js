module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FE2BE9',
        secondary: '#516AF0'
      },
      height: {
        sm: '8px',
        md: '16px',
        lg: '30px',
        xl: '50px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
