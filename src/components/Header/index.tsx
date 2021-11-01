import React from 'react'
import { EletricPoleIcon } from 'public/assets/icons'
import { Header } from './styles'
import { Typography } from '@mui/material'

const HeaderComponent = () => {
  return (
    <Header>
      <Typography variant="h1" component="span">
        PRANC
      </Typography>
      <EletricPoleIcon />
    </Header>
  )
}

export default HeaderComponent
