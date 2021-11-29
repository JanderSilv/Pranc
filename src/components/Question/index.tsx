import { ChangeEvent, memo, useState } from 'react'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { SxProps } from '@mui/system'
import DatePicker from '@mui/lab/DatePicker'
import { QuestionType } from 'src/types/enums'
import { Question, IAlternative } from 'src/types'

type Props = Question & {
  initialAlternatives?: IAlternative[]
  updateQuestions: (questionId: number, newAlternatives: IAlternative[]) => void
}

const formStyles: SxProps = { mt: 2, marginInline: 3 }
const formDateStyle: SxProps = {
  ...formStyles,
  paddingTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const NumberQuestion = (props: Props) => {
  const { id, alternatives, helper, initialAlternatives, updateQuestions } =
    props

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 15) return
    if (initialAlternatives) {
      let newAlternatives = [...initialAlternatives]
      newAlternatives[0] = {
        ...alternatives[0],
        value: Number(event.target.value),
      }
      updateQuestions(id, newAlternatives)
    }
  }

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (initialAlternatives) {
      let newAlternatives = [...initialAlternatives]
      newAlternatives[1] = {
        ...alternatives[1],
        value: event.target.checked,
      }
      updateQuestions(id, newAlternatives)
    }
  }

  return (
    <Box sx={formDateStyle}>
      <TextField
        label={alternatives[0].label}
        value={alternatives[0].value}
        onKeyPress={event => !/[0-9]/.test(event.key) && event.preventDefault()}
        onChange={handleChangeNumber}
        helperText={helper}
      />
      <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
        <FormGroup>
          {alternatives?.map(({ id, label, value }) => {
            if (id === 0) return null
            return (
              <FormControlLabel
                key={`number-question-${id}`}
                control={
                  <Checkbox
                    checked={value}
                    onChange={event => handleChangeCheckbox(event)}
                    name={label}
                  />
                }
                label={label}
              />
            )
          })}
        </FormGroup>
      </FormControl>
    </Box>
  )
}

const RadioQuestion = (props: Props) => {
  const { alternatives } = props

  const [value, setValue] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl sx={formStyles} component="fieldset">
      <RadioGroup value={value} onChange={handleChange}>
        {alternatives?.map(({ id, label }) => (
          <FormControlLabel
            key={id}
            value={id}
            control={<Radio />}
            label={label ?? ''}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

const YesNoQuestion = (props: Props) => {
  const { id, alternatives, updateQuestions } = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAlternatives = [
      {
        ...alternatives[0],
        value: event.target.value === 'true',
      },
    ]
    updateQuestions(id, newAlternatives)
  }

  return (
    <FormControl sx={formStyles} component="fieldset">
      <RadioGroup value={alternatives[0].value} onChange={handleChange}>
        <FormControlLabel value={true} control={<Radio />} label="Sim" />
        <FormControlLabel value={false} control={<Radio />} label="Não" />
      </RadioGroup>
    </FormControl>
  )
}

const CheckBoxQuestion = (props: Props) => {
  const { alternatives } = props

  const [state, setState] = useState<Record<number, true>>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    let auxState = { ...state }
    event.target.checked
      ? (auxState[Number(id)] = true)
      : delete auxState[Number(id)]

    setState(auxState)
  }

  return (
    <FormControl sx={formStyles} component="fieldset" variant="standard">
      <FormGroup>
        {alternatives?.map(({ id, label }) => id && (
          <FormControlLabel
            key={id}
            control={
              <Checkbox
                checked={state[id] || false}
                onChange={event => handleChange(event, id)}
                name={label}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

const DateQuestion = (props: Props) => {
  const { id, alternatives, initialAlternatives, updateQuestions } = props

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (initialAlternatives) {
      let newAlternatives = [...initialAlternatives]
      newAlternatives[1] = {
        ...alternatives[1],
        value: event.target.checked,
      }
      updateQuestions(id, newAlternatives)
    }
  }

  const handleChangeDate = (newValue: Date | null) => {
    if (initialAlternatives) {
      const newAlternatives = [...initialAlternatives]
      newAlternatives[0] = {
        ...alternatives[0],
        value: newValue,
      }
      updateQuestions(id, newAlternatives)
    }
  }

  return (
    <Box sx={formDateStyle}>
      <DatePicker
        label="Data"
        value={alternatives[0].value}
        clearText="Limpar"
        onChange={handleChangeDate}
        renderInput={params => <TextField {...params} />}
        clearable
        disableFuture
      />

      <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
        <FormGroup>
          {alternatives?.map(({ id, label, value }) => {
            if (id === 0) return null
            return (
              <FormControlLabel
                key={`date-question-${id}`}
                control={
                  <Checkbox
                    checked={value}
                    onChange={event => handleChangeCheckbox(event)}
                    name={label}
                  />
                }
                label={label}
              />
            )
          })}
        </FormGroup>
      </FormControl>
    </Box>
  )
}

const chooseComponent = (type: QuestionType) => {
  const components = {
    [QuestionType.single]: RadioQuestion,
    [QuestionType.yesNo]: YesNoQuestion,
    [QuestionType.multiple]: CheckBoxQuestion,
    [QuestionType.date]: DateQuestion,
    [QuestionType.number]: NumberQuestion,
  }

  return components[type]
}

const QuestionComponent = (props: Props) => {
  const { type } = props

  const Component = chooseComponent(type)
  return <Component {...props} />
}

export default memo(QuestionComponent)
