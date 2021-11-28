import { memo } from 'react'
import { Avatar, Box, Link, Typography, useTheme } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

interface Props {
  image: string
  name: string
  jobTitle: string
  linkedin: string
  linkedinUrl: string
  github?: string
  githubUrl?: string
}

const TechCard = (props: Props) => {
  const { spacing } = useTheme()
  const { image, name, jobTitle, linkedin, linkedinUrl, github, githubUrl } =
    props

  return (
    <Box minWidth={300} display="flex" alignItems="center" gap={2}>
      <Avatar
        src={image}
        sx={{
          width: { xs: spacing(11), md: spacing(16) },
          height: { xs: spacing(11), md: spacing(16) },
        }}
      />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={1}
        sx={{
          '& > a': {
            height: '100%',
            color: 'inherit',
            textDecoration: 'none',
            transition: 'all .2s',

            '&:hover': {
              color: 'primary.dark',
              textDecoration: 'underline',
            },
            '& svg': {
              marginRight: 1,
            },
          },
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {name}
          </Typography>
          <Typography>{jobTitle}</Typography>
        </Box>
        {!!github && (
          <Link
            display="flex"
            alignItems="center"
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHub />
            <Typography>{github}</Typography>
          </Link>
        )}
        <Link
          display="flex"
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedIn />
          <Typography>{linkedin}</Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default memo(TechCard)
