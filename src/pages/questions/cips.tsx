import { Button, Typography } from '@mui/material'
import useCIP from 'src/hooks/useCIP'
import { Header, CategoriesDrawer, QuestionComponent } from 'src/components'
import {
  ButtonsContainer,
  Container,
  Content,
  Wrap,
} from 'src/styles/pages/questions'

const CIPS = () => {
  const { cip } = useCIP()

  return (
    <Wrap>
      <Header />
      <Container>
        <Typography variant="h2">{cip?.title}</Typography>
        <Content>
          <ul>
            {cip?.questions.map((question, index) => (
              <li key={question.title}>
                <Typography variant="h3">
                  {`${index + 1}. ${question.title}`}
                </Typography>
                <QuestionComponent {...question} />
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

export default CIPS
