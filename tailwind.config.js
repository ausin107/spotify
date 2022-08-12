// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        containerColor: 'linear-gradient(rgba(0,0,0,.6) 0,var(--background-base) 100%),var(--background-noise)',
        bgColor: '#121212',
        iconColor: '#b3b3b3',
        navbarColor: '#a7a7a7',
        navigateIcon: '#9f9f9f',
        navbarBg: 'rgba(0,0,0,.5)',
        playIconBg: '#1fdf64',
        itemBg: '#181818',
        itemActiveBg: '#282828',
        musicPlayer: '#bababa',
        activeIcon: '#1db954',
        activeIconHover: '#1ed760',
        facebookBg: '#405a93',
        facebookBgActive: '#384F81',
        googleText: '#535353',
        breakLine: 'rgb(204, 204, 204)',
        textBreakLine: '#7f7f7f',
        inputBorder: '#878787',
        logoutBg: '#282828',
        searchChildBg: '#ffffff1a',
        banner2LoginBg: '#0d72ea',
      },
      backgroundImage: {
        loveIconBg: 'linear-gradient(299deg, rgb(39,73,167) 0%, rgba(145,41,161,1) 45%, rgba(33,55,168,1) 100%)',
        mainContainerBg: 'linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,1) 0%, rgba(29,32,33,1) 100%);',
        notAuthBannerBg: 'linear-gradient(90deg,#af2896,#509bf5)',
        searchItemBg:
          'radial-gradient(circle, rgba(53,45,54,1) 0%, rgba(53,47,60,0.545273211823792) 49%, rgba(55,65,73,0.7805673294708508) 100%)',
        likedBg: 'linear-gradient(180deg, rgba(79,56,154,1) 0%, rgba(62,45,121,1) 50%, rgba(18,18,18,1) 100%);',
        resultBg:
          'linear-gradient(180deg, rgba(18,18,18,0.15031522863051472) 0%, rgba(18,18,18,0.15311634907869398) 50%, rgba(18,18,18,0.5) 100%);',
      },
      boxShadow: {
        '3xl': '-1px 1px 59px 18px rgba(0,0,0,0.51)',
      },
    },
  },
  plugins: [],
}
