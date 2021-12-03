import Link from 'next/link'
import { Typography, Slide } from '@mui/material'
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
        <Slide direction="right" timeout={{ enter: 1000 }} in mountOnEnter unmountOnExit>
          <Content>
            <Typography variant="h1">PRANC</Typography>
            <Typography>Processo de Auditoria NERC CIP</Typography>
            <StartButton href="/cips">Iniciar</StartButton>
          </Content>
        </Slide>
      </Container>
    </Wrap>
  )
}

export default Home
