module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FE2BE9',
        secondary: 'rgb(81, 106, 240)',
        primary25: 'rgba(254, 43, 233, 0.5)',
        primary50: 'rgba(254, 43, 233, 0.25)',
        secondary25: 'rgba(81, 106, 240, 0.25)',
        secondary50: 'rgba(81, 106, 240, 0.5)'
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
