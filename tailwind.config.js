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
      width: {
        sm: '8px',
        md: '16px',
        lg: '30px',
        xl: '50px'
      },
      height: {
        sm: '8px',
        md: '16px',
        lg: '30px',
        xl: '50px'
      },
      fontSize: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px'
      },
      fontFamily: {
        baloo: ['Baloo 2', 'cursive']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
