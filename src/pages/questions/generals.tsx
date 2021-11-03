import { Button, Typography } from '@mui/material'
import generals from 'src/utils/data/generals.json'
import { Question } from 'src/types'

import { Header, CategoriesDrawer, QuestionComponent } from 'src/components'
import {
  ButtonsContainer,
  Container,
  Content,
  Wrap,
} from 'src/styles/pages/questions'

const Generals = () => {
  return (
    <Wrap>
      <Header />
      <Container>
        <Typography variant="h2">Características Gerais</Typography>
        <Content>
          <ul>
            {(generals as Question[]).map((general, index) => (
              <li key={general.title}>
                <Typography variant="h3">
                  {`${index + 1}. ${general.title}`}
                </Typography>
                <QuestionComponent {...general} />,
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
