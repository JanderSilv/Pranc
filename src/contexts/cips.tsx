import { createContext, useCallback, useEffect, useState } from 'react'
import { makeCIPS, cipsLength } from 'src/cips/cips'
import { Question, Score } from 'src/types'

export type CIP = {
  title: string
  questions: Question[]
}

interface CipsContextData {
  cip: CIP | null
  currentCIPIndex: number
  storedQuestions: Question[][]
  scores: Score[]
  addQuestionsToStore: (questions: Question[]) => void
  addScore: (score: Score) => void
  lastCIP: () => void
  nextCIP: () => void
}

const getCIP = async (index: number) => {
  const cips = makeCIPS()
  const cip = cips[index]
  const response = await import(`src/cips/${cip.path}`)
  return {
    title: cip.title,
    questions: (await response.default()) as Question[],
  }
}

export const CipsContext = createContext({} as CipsContextData)

const CipsProvider: React.FC = ({ children }) => {
  const [currentCIPIndex, setCurrentCIPIndex] = useState(0)
  const [cip, setCIP] = useState<CIP | null>(null)
  const [storedQuestions, setStoredQuestions] = useState<Question[][]>([])
  const [scores, setScores] = useState<Score[]>([])

  const lastCIP = useCallback(
    () => setCurrentCIPIndex(prevValue => (prevValue > 0 ? prevValue - 1 : 0)),
    []
  )
  const nextCIP = useCallback(
    () =>
      setCurrentCIPIndex(prevValue =>
        prevValue === cipsLength - 1 ? prevValue : prevValue + 1
      ),
    []
  )
  const addQuestionsToStore = useCallback(
    (questions: Question[]) =>
      setStoredQuestions(prevValue => {
        let newQuestions = [...prevValue]
        newQuestions[currentCIPIndex] = questions
        return newQuestions
      }),
    [currentCIPIndex]
  )
  const addScore = useCallback(
    (score: Score) =>
      setScores(prevScores => {
        let newScores = [...prevScores]
        newScores[currentCIPIndex] = score
        return newScores
      }),
    []
  )

  useEffect(() => {
    const loadCIP = async () => {
      const cip = await getCIP(currentCIPIndex)
      setCIP(cip)
    }
    loadCIP()
  }, [currentCIPIndex])

  return (
    <CipsContext.Provider
      value={{
        cip,
        currentCIPIndex,
        storedQuestions,
        scores,
        addQuestionsToStore,
        addScore,
        lastCIP,
        nextCIP,
      }}
    >
      {children}
    </CipsContext.Provider>
  )
}

export default CipsProvider
