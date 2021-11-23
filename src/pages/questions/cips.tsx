import { useCallback, useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'

import useCIP from 'src/hooks/useCIP'
import { evaluateQuestions, Question, IAlternative } from 'src/types'

import { Header, CategoriesDrawer, QuestionComponent } from 'src/components'
import {
  ButtonsContainer,
  Container,
  Content,
  Wrap,
} from 'src/styles/pages/questions'

type QuestionFormState = Record<number, boolean>

const CIPS = () => {
  const {
    cip,
    currentCIPIndex,
    storedQuestions,
    isLastCIP,
    addQuestionsToStore,
    addScore,
    nextCIP,
    lastCIP,
  } = useCIP()

  const [questions, setQuestions] = useState<Question[]>(cip?.questions ?? [])
  const [questionsState, setQuestionsState] = useState({} as QuestionFormState)

  useEffect(() => {
    const fillQuestionsState = (
      cipQuestions: Question[],
      haveStoredData: boolean
    ) => {
      let auxQuestionsState = {} as QuestionFormState
      cipQuestions.forEach(question => {
        auxQuestionsState[question.id] = haveStoredData
      })
      setQuestionsState(auxQuestionsState)
    }

    const cipQuestions = cip?.questions
    if (cipQuestions) {
      const cipStoredQuestions = storedQuestions[currentCIPIndex]
      const auxQuestions = cipStoredQuestions?.length
        ? cipStoredQuestions
        : cipQuestions
      setQuestions(auxQuestions)
      fillQuestionsState(cipQuestions, !!cipStoredQuestions)
    }
  }, [cip, currentCIPIndex, storedQuestions])

  const updateQuestions = useCallback(
    (questionId: number, newAlternatives: IAlternative[]) => {
      setQuestions(questions => {
        const foundIndex = questions.findIndex(
          question => question.id === questionId
        )
        let auxQuestions = [...questions]
        auxQuestions[foundIndex] = {
          ...questions[foundIndex],
          alternatives: newAlternatives,
        }
        return auxQuestions
      })
      setQuestionsState(questionsState => {
        return {
          ...questionsState,
          [questionId]: true,
        }
      })
    },
    []
  )

  const checkIsAnswered = () =>
    Object.values(questionsState).every(value => value === true)

  return (
    <Wrap>
      <Header />
      <Container>
        <Typography variant="h2">{cip?.title}</Typography>
        <Content>
          <ul>
            {questions.map((question, index) => (
              <li key={question.title}>
                <Typography variant="h3">
                  {`${index + 1}. ${question.title}`}
                </Typography>
                <QuestionComponent
                  updateQuestions={updateQuestions}
                  initialAlternatives={cip?.questions[index]?.alternatives}
                  {...question}
                />
              </li>
            ))}
          </ul>

          <ButtonsContainer>
            <Button variant="outlined" onClick={lastCIP}>
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (cip) {
                  addQuestionsToStore(questions)
                  addScore(
                    evaluateQuestions(cip.title, cip.description, questions)
                  )
                  nextCIP()
                }
              }}
              disabled={!cip?.questions || !checkIsAnswered()}
            >
              {!isLastCIP ? 'Avançar' : 'Finalizar'}
            </Button>
          </ButtonsContainer>
        </Content>
      </Container>
      <CategoriesDrawer />
    </Wrap>
  )
}

export default CIPS
