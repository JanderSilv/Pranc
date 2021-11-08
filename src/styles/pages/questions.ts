import { styled } from '@mui/material'
import LinkButton from 'src/components/LinkButton'

export const Wrap = styled('main')(({ theme: { palette } }) => ({
  width: '100%',
  maxWidth: '100vw',
  minHeight: '100vh',
  background: palette.gradient,
}))

export const Container = styled('section')(
  ({ theme: { palette, spacing } }) => ({
    padding: spacing(2, 4),

    '& > h2': {
      fontSize: '2rem',
      color: palette.primary.contrastText,
    },
  })
)

export const Content = styled('div')(({ theme: { palette, spacing } }) => ({
  width: 'max-content',
  maxWidth: 960,
  marginInline: 'auto',

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: spacing(4),

  '& > ul': {
    padding: spacing(4),
    borderRadius: 10,
    background: palette.background.default,

    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',

    '& > li > h3': {
      fontSize: '1.6rem',
      fontWeight: 'bold',
    },
  },
}))

export const ButtonsContainer = styled('div')(
  ({ theme: { spacing, palette } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(4),

    '& > button': {
      color: palette.primary.contrastText,
      padding: spacing(1, 4),
      borderRadius: 50,
    },
  })
)

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
