import { VRF, VSL } from './enums'

interface IAlternative {
  id: number
  label: string
  value: any
  vrf?: VRF
  vsl?: VSL
}

export default IAlternative
