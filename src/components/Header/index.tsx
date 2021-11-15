import React from 'react'
import { ElectricPoleIcon } from 'public/assets/icons'
import { Header } from './styles'
import { Typography } from '@mui/material'

const HeaderComponent = () => {
  return (
    <Header>
      <Typography variant="h1" component="span">
        PRANC
      </Typography>
      <ElectricPoleIcon />
    </Header>
  )
}

export default HeaderComponent
