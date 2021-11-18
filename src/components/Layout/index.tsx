import { memo } from 'react'
import { Typography } from '@mui/material'
import { Header } from 'src/components'
import { Container, Content, Wrap } from './styles'

interface Props {
  title: string
  enableHomeLink?: boolean
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { title, enableHomeLink = false, children } = props
  return (
    <Wrap>
      <Header enableHomeLink={enableHomeLink} />
      <Typography variant="h2">{title}</Typography>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Wrap>
  )
}

export default memo(Layout)
