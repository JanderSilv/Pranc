import { createContext, useEffect, useState } from 'react'
import { makeCIPS } from 'src/cips/cips'
import { Question } from 'src/types'

export type CIP = {
  title: string
  questions: Question[]
}

interface CipsContextData {
  cip: CIP | null
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

  const lastCIP = () => setCurrentCIPIndex(prevValue => prevValue - 1)
  const nextCIP = () => setCurrentCIPIndex(prevValue => prevValue + 1)

  useEffect(() => {
    const loadCIP = async () => {
      const cip = await getCIP(currentCIPIndex)
      setCIP(cip)
    }
    loadCIP()
  }, [currentCIPIndex])

  return (
    <CipsContext.Provider value={{ cip, lastCIP, nextCIP }}>
      {children}
    </CipsContext.Provider>
  )
}

export default CipsProvider
