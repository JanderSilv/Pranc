import { styled } from '@mui/material'
import LinkButton from 'src/components/LinkButton'

export const Wrap = styled('main')(({ theme: { palette } }) => ({
  width: '100vw',
  minHeight: '100vh',
  background: `linear-gradient(121deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,

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

  '&:after': {
    content: '""',
    display: 'block',
  },
}))

export const Container = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
})

export const Content = styled('section')(({ theme: { palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& > h1': {
    color: palette.primary.contrastText,
  },
}))

export const StartButton = styled(LinkButton)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    maxWidth: '50%',

    marginTop: spacing(2),
    padding: spacing(1, 4),

    color: palette.primary.contrastText,
    borderRadius: 30,
    background: palette.primary.main,

    '&:hover': {
      background: palette.primary.dark,
    },
  })
)
