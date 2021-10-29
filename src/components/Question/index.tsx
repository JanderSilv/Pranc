import { ChangeEvent, useState } from 'react'
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
import { OmittedIQuestion } from 'src/pages/questions'

type Props = OmittedIQuestion

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

const CheckBoxQuestion = (props: Props) => {
  const { alternatives } = props

  const [state, setState] = useState<Record<number, true>>({})

  Object.keys(state)

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
  const [value, setValue] = useState<Date | number | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number((event.target as HTMLInputElement).value))
  }

  return (
    <Box sx={formDateStyle}>
      <DatePicker
        label="Data"
        value={value}
        clearText="Limpar"
        onChange={newValue => {
          setValue(newValue)
        }}
        renderInput={params => <TextField {...params} />}
        clearable
        disableFuture
      />

      <FormControl sx={{ mt: 2 }} component="fieldset">
        <RadioGroup value={value} onChange={handleChange}>
          {alternatives?.map(({ id, label }) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

const chooseComponent = (type: QuestionType) => {
  const components = {
    [QuestionType.single]: RadioQuestion,
    [QuestionType.multiple]: CheckBoxQuestion,
    [QuestionType.date]: DateQuestion,
    [QuestionType.number]: CheckBoxQuestion,
  }

  return components[type]
}

const Question = (props: Props) => {
  const { type } = props

  const Component = chooseComponent(type)
  return <Component {...props} />
}

export default Question
