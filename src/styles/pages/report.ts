import { styled } from '@mui/material'

export const ChartContainer = styled('div')(({ theme: { spacing } }) => ({
  width: '100%',
  maxWidth: 450,
  marginBottom: spacing(2),
  marginInline: 'auto',
}))

export const Details = styled('section')(
  ({ theme: { spacing, breakpoints } }) => ({
    padding: spacing(2, 1),

    [breakpoints.up('sm')]: {
      padding: spacing(2, 4),
    },

    '& h4': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  })
)
