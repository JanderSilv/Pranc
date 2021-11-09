import { Typography } from '@mui/material'

import { Wrap, Container, Content, StartButton } from 'src/styles/pages/home'

const Home = () => {
  return (
    <Wrap>
      <Container>
        <Content>
          <Typography variant="h1">PRANC</Typography>
          <StartButton href="/questions/cips">Iniciar</StartButton>
        </Content>
      </Container>
    </Wrap>
  )
}

export default Home
