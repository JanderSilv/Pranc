import { styled } from '@mui/material'

export const Wrap = styled('main')(({ theme: { palette, spacing } }) => ({
  width: '100%',
  maxWidth: '100vw',
  minHeight: '100vh',
  paddingBottom: spacing(4),
  background: palette.gradient,

  '& > h2': {
    paddingInline: spacing(4),
    fontSize: '2rem',
    color: palette.primary.contrastText,
  },
}))

export const Container = styled('section')(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingBlock: spacing(2),

    [breakpoints.up('sm')]: {
      padding: spacing(2, 4),
    },
  })
)

export const Content = styled('div')(
  ({ theme: { breakpoints, spacing, palette } }) => ({
    width: '100%',
    maxWidth: 960,
    marginTop: spacing(4),
    marginInline: 'auto',
    padding: spacing(2),

    [breakpoints.up('sm')]: {
      padding: spacing(4),
    },

    borderRadius: 10,
    background: palette.background.default,
  })
)
