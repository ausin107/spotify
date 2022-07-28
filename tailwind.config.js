// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        containerColor:
          'linear-gradient(rgba(0,0,0,.6) 0,var(--background-base) 100%),var(--background-noise)',
        bgColor: '#121212',
        iconColor: '#b3b3b3',
        navbarColor: '#a7a7a7',
        navigateIcon: '#9f9f9f',
      },
      backgroundImage: {
        loveIconBg:
          'linear-gradient(299deg, rgb(39,73,167) 0%, rgba(145,41,161,1) 45%, rgba(33,55,168,1) 100%)',
        navbarBg:
          'linear-gradient(rgba(0,0,0,.6) 0,var(--background-base) 100%),var(--background-noise)',
      },
    },
  },
  plugins: [],
}
