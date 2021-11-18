import React, { memo } from 'react'
import { Avatar, Grid, Typography, useTheme } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

interface Props {
  image: string
  name: string
  jobTitle: string
  linkedin: string
  linkedinUrl: string
  github: string
  githubUrl: string
}

const TechCard = (props: Props) => {
  const { breakpoints, spacing, palette } = useTheme()
  const { image, name, jobTitle, linkedin, linkedinUrl, github, githubUrl } =
    props

  return (
    <Grid container alignItems="center" sx={{ marginTop: spacing(4) }}>
      <Grid item xs={3}>
        <Avatar
          src={image}
          sx={{
            width: spacing(16),
            height: spacing(16),

            [breakpoints.down('md')]: {
              marginRight: '1rem',
              width: spacing(11),
              height: spacing(11),
            },
          }}
        />
      </Grid>
      <Grid
        container
        item
        xs={9}
        sx={{
          height: '100%',
          paddingRight: '18rem',
          justifyContent: 'space-between',

          [breakpoints.down('md')]: {
            padding: '0 0 0 1rem',
          },

          '& > a': {
            color: 'inherit',
            textDecoration: 'none',
            transition: 'all .2s',

            '&:hover': {
              color: palette.primary.dark,
              textDecoration: 'underline',
            },
            '& svg': {
              marginRight: 1,
            },
          },
        }}
      >
        <Grid
          item
          xs={12}
          component={Typography}
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          {name}
        </Grid>
        <Grid item xs={12} component={Typography}>
          {jobTitle}
        </Grid>
        <Grid
          container
          alignItems="center"
          component="a"
          href={githubUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHub />
          <Typography>{github}</Typography>
        </Grid>
        <Grid
          container
          alignItems="center"
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedIn />
          <Typography>{linkedin}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default memo(TechCard)
