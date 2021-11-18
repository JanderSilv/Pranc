import { memo, useState } from 'react'
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import { Radar } from 'react-chartjs-2'
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  HelpRounded,
} from '@mui/icons-material'

import { ElectricPoleIcon } from 'public/assets/icons'
import { Layout } from 'src/components'
import useCIP from 'src/hooks/useCIP'
import { Score } from 'src/types'
import { ChartContainer, Details } from 'src/styles/pages/report'

const average = (list: number[]) =>
  list.reduce((prev, curr) => prev + curr, 0) / list.length

const makeChartData = (scores: Score[]) => ({
  labels: scores.map(score => score.cip),
  datasets: [
    {
      label: 'Pontuação',
      data: scores.map(score =>
        average(score.questionsScores.map(questionScore => questionScore.score))
      ),
      backgroundColor: 'rgba(2, 85, 137, 0.2)',
      borderColor: '#025589',
      borderWidth: 1,
    },
  ],
})

const options = {
  scales: {
    r: {
      suggestedMin: 0,
      ticks: {
        stepSize: 2,
        showLabelBackdrop: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const Title = memo(({ children }: { children: string }) => {
  const { palette, spacing, breakpoints } = useTheme()
  return (
    <Typography
      variant="h3"
      color="primary.main"
      fontWeight="bold"
      sx={{
        marginBottom: spacing(4),
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        display: 'flex',
        gap: '0.5rem',

        [breakpoints.up('sm')]: {
          fontSize: '1.7rem',
        },

        '& > svg': {
          width: 20,
          height: 'auto',
          fill: palette.primary.main,
        },
      }}
    >
      <ElectricPoleIcon /> {children}
    </Typography>
  )
})
Title.displayName = 'Title'

interface Props {
  index: number
  children: string
}

const QuestionUtterance = ({ index, children }: Props) => {
  const { breakpoints } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClosePopover = () => setAnchorEl(null)
  const isPopoverOpen = !!anchorEl

  return (
    <Typography
      sx={{
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      Questão {index + 1}
      <Box
        component="span"
        aria-owns={isPopoverOpen ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onClick={handleOpenPopover}
        onMouseEnter={handleOpenPopover}
        onMouseLeave={handleClosePopover}
        sx={{
          cursor: 'help',
          display: 'inline-flex',
        }}
      >
        <HelpRounded fontSize="small" />
      </Box>
      <Popover
        id="mouse-over-popover"
        open={isPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClosePopover}
        sx={{
          maxWidth: 600,
          [breakpoints.up('md')]: {
            maxWidth: 800,
            pointerEvents: 'none',
          },
        }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, fontSize: '0.875rem', textAlign: 'justify' }}>
          Enunciado: {children}
        </Typography>
      </Popover>
    </Typography>
  )
}

const Row = memo((props: Score) => {
  const { cip, questionsScores, totalScore } = props
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expandir linha"
            size="small"
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
          >
            {isCollapseOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{cip}</TableCell>
        <TableCell align="right">{`${totalScore}/${
          questionsScores.length * 10
        }`}</TableCell>
        <TableCell align="right">
          {average(questionsScores.map(questionScore => questionScore.score))}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
            <Details>
              <Grid container columnSpacing={{ xs: 4, sm: 2 }}>
                <Grid item xs={5}>
                  <Typography variant="h4" color="primary.main">
                    PONTUAÇÃO POR QUESTÃO
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h4" color="primary.main">
                    SOLUÇÕES
                  </Typography>
                </Grid>
              </Grid>

              {questionsScores.map(({ id, title, score, solutions }, index) => (
                <Grid
                  key={id}
                  container
                  columnSpacing={{ xs: 4, sm: 2 }}
                  sx={{ marginTop: 2 }}
                >
                  <Grid item xs={5}>
                    <Typography>{score} pontos</Typography>
                    <QuestionUtterance index={index}>{title}</QuestionUtterance>
                  </Grid>
                  <Grid item xs={7}>
                    <Box>
                      {solutions.map(solution => {
                        if (score === 0)
                          return 'Aprovado. Não necessita de correções.'
                        return (
                          <Typography key={solution}>{solution}</Typography>
                        )
                      })}
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Details>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
})
Row.displayName = 'Row'

const Report = () => {
  const { scores } = useCIP()
  const chartData = makeChartData(scores)

  return (
    <Layout title="Relatório" enableHomeLink>
      <Title>RELATÓRIO GERAL</Title>
      <ChartContainer>
        <Radar data={chartData} options={options} />
      </ChartContainer>

      <Title>RELATÓRIO POR CIP</Title>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Detalhes</TableCell>
              <TableCell>CIP</TableCell>
              <TableCell align="right">Pontuação Total</TableCell>
              <TableCell align="right">Média</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map(score => (
              <Row key={score.cip} {...score} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default Report
