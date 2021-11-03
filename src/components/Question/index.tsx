import { ChangeEvent, useEffect, useState } from 'react'
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
import { Question } from 'src/types'

type Props = Question

const formStyles: SxProps = { mt: 2, marginInline: 3 }
const formDateStyle: SxProps = {
  ...formStyles,
  paddingTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  const { alternatives } = props

  const [value, setValue] = useState(alternatives)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue([
      {
        ...alternatives[0],
        value: event.target.value === 'true',
      },
    ])
  }

  return (
    <FormControl sx={formStyles} component="fieldset">
      <RadioGroup value={value[0].value} onChange={handleChange}>
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
        {alternatives?.map(({ id, label }) => (
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
  const { alternatives } = props
  const [values, setValues] = useState(alternatives)

  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    const auxValues = [...alternatives]
    auxValues.splice(1, 1, {
      ...auxValues[1],
      value: event.target.checked,
    })
    setValues(auxValues)
  }

  return (
    <Box sx={formDateStyle}>
      <DatePicker
        label="Data"
        value={values[0].value}
        clearText="Limpar"
        onChange={newValue => {
          const auxValues = [...alternatives]
          auxValues.splice(0, 1, {
            ...auxValues[0],
            value: newValue,
          })
          setValues(auxValues)
        }}
        renderInput={params => <TextField {...params} />}
        clearable
        disableFuture
      />

      <FormControl sx={{ mt: 2 }} component="fieldset" variant="standard">
        <FormGroup>
          {values?.map(({ id, label, value }, index) => {
            if (id === 0) return null
            return (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={value}
                    onChange={event => handleChange(event, id)}
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
    [QuestionType.number]: CheckBoxQuestion,
  }

  return components[type]
}

const QuestionComponent = (props: Props) => {
  const { type } = props

  const Component = chooseComponent(type)
  return <Component {...props} />
}

export default QuestionComponent
