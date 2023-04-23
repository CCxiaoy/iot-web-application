/** @type {import('tailwindcss').Config} */
module.exports = {
  // content configuration to ensure generated CSS will not miss styles 
  content: [
    './App.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  // performance optimization (Tree-shaking unused pattern declaration)
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      themeColor: {
        lightest: "#FFFFFF",
        light: "#ECFCF4",
        medium: "#B1F1D4",
        dark: "#3CDC94",
        darkest: "#000000",
      },
      authiraryColor: {
        redMedium: "#FE5857",
        blueMedium: "#289CFE",
      },
      borderGray: {
        medium: "#707070",
      }
    },
    fontSize: {
      // base | line-height
      leftnavtitle: ['2rem', '3rem'],
      subnav: ['1.5rem', '2.5rem'],
      scenariotitle: ['1.5rem', '2rem'],
      deviceTitle: ['1rem', '1.75rem'],
      tipDeleteTitle: ['1rem', '1.75rem'],
      tipScenarioTitle: ['1.25rem', '1.75rem'],
      tipAddDeviceTitle: ["1rem", "1,75rem"]
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

