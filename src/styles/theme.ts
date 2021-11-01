import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import type {} from '@mui/lab/themeAugmentation'
declare module '@mui/material/styles' {
  interface Palette {
    gradient: string
  }
  interface PaletteOptions {
    gradient: string
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#025589',
      dark: '#023c60',
      contrastText: '#FFF',
    },
    text: {
      primary: '#404040',
      secondary: '#000',
    },
    background: {
      default: '#F9F9F9',
    },
    gradient: 'linear-gradient(121deg, #025589 0%, #041432 100%)',
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontFamily: 'Good Timing',
    },
    h2: {
      fontFamily: 'Good Timing',
    },
  },
})

export default responsiveFontSizes(theme)
