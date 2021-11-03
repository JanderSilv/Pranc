import { useContext } from 'react'
import { CipsContext } from 'src/contexts/cips'

const useCIP = () => {
  const context = useContext(CipsContext)

  if (!context) {
    throw new Error('useCIP must be use within a CIPProvider')
  }

  return context
}

export default useCIP
