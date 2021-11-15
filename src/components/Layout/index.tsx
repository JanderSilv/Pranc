import { memo } from 'react'
import { Typography } from '@mui/material'
import { Header } from 'src/components'
import { Container, Content, Wrap } from './styles'

interface Props {
  title: string
  children: React.ReactNode
}

const Layout = ({ title, children }: Props) => {
  return (
    <Wrap>
      <Header />
      <Typography variant="h2">{title}</Typography>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Wrap>
  )
}

export default memo(Layout)
