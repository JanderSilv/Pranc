import { styled } from '@mui/material'
import LinkButton from 'src/components/LinkButton'

export const Wrap = styled('main')(({ theme: { breakpoints, palette } }) => ({
  width: '100vw',
  minHeight: '100vh',
  background: palette.gradient,

  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, auto));',

  '&:before': {
    content: '""',
    width: '100%',
    minHeight: '100vh',
    background:
      '100% bottom /contain no-repeat url(assets/images/high-voltage.png)',
    opacity: 0.5,
    display: 'block',
    position: 'absolute',
  },

  [breakpoints.up('md')]: {
    '&:after': {
      content: '""',
      display: 'block',
    },
  },
}))

export const Container = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
})

export const Content = styled('div')(({ theme: { breakpoints, palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& > h1, & > p': {
    color: palette.primary.contrastText,
  },
  '& > h1': {
    fontSize: '4.5rem',

    [breakpoints.up('sm')]: {
      fontSize: '5rem',
    },
    [breakpoints.up('md')]: {
      fontSize: '6rem',
    },
  },
}))

export const StartButton = styled(LinkButton)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    maxWidth: '50%',

    marginTop: spacing(4),
    padding: spacing(1, 4),

    color: palette.primary.contrastText,
    borderRadius: 30,
    background: palette.primary.main,

    '&:hover': {
      background: palette.primary.dark,
    },
  })
)

export const AboutLink = styled('a')({
  position: 'absolute',
  top: '2rem',
  right: '2rem',
})
