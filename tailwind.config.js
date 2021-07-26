module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FE2BE9',
        secondary: 'rgb(81, 106, 240)',
        primaryLight: '#FFCEFB',
        primaryDark: '#6C4078',
        secondaryLight: '#D4DAFC',
        secondaryDark: '#3E4B79',
        eng: '#302bfe',
        ger: '#000000',
        pol: '#fe2b38',
        ned: '#fe902b',
        spa: '#feeb2b',
        fra: '#33eefa',
        ita: '#34d231'
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
