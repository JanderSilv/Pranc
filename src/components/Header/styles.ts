import { styled } from '@mui/material'
import LinkButton from 'src/components/LinkButton'

export const Header = styled('header')(
  ({ theme: { breakpoints, palette, spacing } }) => ({
    padding: spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [breakpoints.up('sm')]: {
      padding: spacing(4),
    },

    '& > span, & > a': {
      color: palette.primary.contrastText,
      fontSize: '2.5rem',
      textDecoration: 'none',
    },
  })
)

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
