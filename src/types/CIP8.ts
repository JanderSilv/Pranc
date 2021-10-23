import CIP from './CIP'
import { VRF } from './enums'
import IAlternative from './IAlternative'
import { IFuncTable, IQuestionEvaluate } from './IQuestion'

const calculoPadrao = (alternatives: IAlternative[]) => {
  let val: number = 0
  alternatives.forEach(a => {
    if (a.id == 0 && a.value == false) {
      val += 7
    } else {
      if (a.value == true) {
        switch (a.vrf) {
          case VRF.high:
            val += 5
            break
          case VRF.medium:
            val += 3
          default:
            val += 2
        }
      }
    }
  })
  return val
}

const cip8Funcs: IFuncTable = [
  {
    keys: [0, 1, 2],
    func: calculoPadrao,
  },
]

class CIP8 extends CIP {
  constructor() {
    super(8, cip8Funcs)
  }
}

const cip8 = new CIP8()

export default CIP8
