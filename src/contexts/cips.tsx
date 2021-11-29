import { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { makeCIPS, cipsLength } from 'src/cips/cips'
import { Question, Score } from 'src/types'

export type CIP = {
  title: string
  description: string
  questions: Question[]
}

interface CipsContextData {
  cip: CIP | null
  currentCIPIndex: number
  storedQuestions: Question[][]
  scores: Score[]
  isLastCIP: boolean
  addQuestionsToStore: (questions: Question[]) => void
  addScore: (score: Score) => void
  lastCIP: () => void
  nextCIP: () => void
}

const getCIP = async (index: number) => {
  const filteredCips = makeCIPS().filter(cip => cip.isActive)
  const { isActive, path, ...rest } = filteredCips[index]
  const response = await import(`src/cips/${path}`)
  return {
    ...rest,
    questions: (await response.default()) as Question[],
  }
}

export const CipsContext = createContext({} as CipsContextData)

const CipsProvider: React.FC = ({ children }) => {
  const { push } = useRouter()
  const [currentCIPIndex, setCurrentCIPIndex] = useState(0)
  const [cip, setCIP] = useState<CIP | null>(null)
  const [storedQuestions, setStoredQuestions] = useState<Question[][]>([])
  const [scores, setScores] = useState<Score[]>([])

  const isLastCIP = currentCIPIndex === cipsLength - 1

  const lastCIP = useCallback(() => {
    const isFirstCIP = currentCIPIndex === 0
    if (isFirstCIP) return push('/')
    return setCurrentCIPIndex(isFirstCIP ? 0 : currentCIPIndex - 1)
  }, [currentCIPIndex, push])
  const nextCIP = useCallback(() => {
    if (isLastCIP) {
      setStoredQuestions([])
      return push('/relatorio')
    }
    return setCurrentCIPIndex(prevValue =>
      isLastCIP ? prevValue : prevValue + 1
    )
  }, [isLastCIP, push])

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
    [currentCIPIndex]
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
        isLastCIP,
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
