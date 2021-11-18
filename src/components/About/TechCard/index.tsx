import React, { memo } from 'react'
import Image from 'next/image'
import { Tooltip } from '@mui/material'
import { Container } from './styles'

type Props = {
  name: string
  logo: string
  url: string
}

const TechCard = (props: Props) => {
  const { name, logo, url } = props
  return (
    <Tooltip title={name} arrow placement="top">
      <Container href={url} target="_blank" rel="noreferrer">
        <Image
          src={logo}
          alt={`${name} logo`}
          width="80px"
          height="75px"
          draggable="false"
          objectFit="contain"
          quality={90}
        />
      </Container>
    </Tooltip>
  )
}

export default memo(TechCard)
