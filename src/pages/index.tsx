import Link from 'next/link'
import { Typography } from '@mui/material'
import { ElectricPoleIcon } from 'public/assets/icons'
import {
  Wrap,
  Container,
  Content,
  StartButton,
  AboutLink,
} from 'src/styles/pages/home'

const Home = () => {
  return (
    <Wrap>
      <Link href="/sobre" passHref>
        <AboutLink>
          <ElectricPoleIcon />
        </AboutLink>
      </Link>
      <Container>
        <Content>
          <Typography variant="h1">PRANC</Typography>
          <Typography>Processo de Auditoria NERC CIP</Typography>
          <StartButton href="/questions/cips">Iniciar</StartButton>
        </Content>
      </Container>
    </Wrap>
  )
}

export default Home
