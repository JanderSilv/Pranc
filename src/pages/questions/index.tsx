import { Button, Typography } from '@mui/material'
import generals from 'src/utils/data/generals.json'
import IQuestion from 'src/types/IQuestion'

import { Header, CategoriesDrawer, Question } from 'src/components'
import {
  ButtonsContainer,
  Container,
  Content,
  Wrap,
} from 'src/styles/pages/questions'

export type OmittedIQuestion = Omit<IQuestion, 'evaluate'>

const Generals = () => {
  return (
    <Wrap>
      <Header />
      <Container>
        <Typography variant="h2">Características Gerais</Typography>
        <Content>
          <ul>
            {(generals as OmittedIQuestion[]).map((general, index) => (
              <li key={general.title}>
                <Typography variant="h3">
                  {`${index + 1}. ${general.title}`}
                </Typography>
                <Question {...general} />,
              </li>
            ))}
          </ul>

          <ButtonsContainer>
            <Button variant="outlined">Voltar</Button>
            <Button variant="contained">Avançar</Button>
          </ButtonsContainer>
        </Content>
      </Container>
      <CategoriesDrawer />
    </Wrap>
  )
}

export default Generals
