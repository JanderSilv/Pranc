import { VRF, VSL } from './enums'

interface IAlternative {
  id: number
  label: string
  vrf?: VRF
  vsl?: VSL
}

export default IAlternative
