import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#025589',
      dark: '#041432',
      contrastText: '#FFF',
    },
    text: {
      primary: '#646464',
      secondary: '#000',
    },
    background: {
      default: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontFamily: 'Good Timing',
    },
    h2: {
      fontFamily: 'Good Timing',
    },
    h3: {
      fontFamily: 'Good Timing',
    },
    h4: {
      fontFamily: 'Good Timing',
    },
  },
})

export default responsiveFontSizes(theme)
