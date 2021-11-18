import Link from 'next/link'
import { Typography } from '@mui/material'
import { ElectricPoleIcon } from 'public/assets/icons'
import { Header } from './styles'

interface Props {
  enableHomeLink?: boolean
}

const HeaderComponent = (props: Props) => {
  const { enableHomeLink = false } = props
  return (
    <Header>
      {enableHomeLink ? (
        <Link href="/" passHref>
          <Typography variant="h1" component="a">
            PRANC
          </Typography>
        </Link>
      ) : (
        <Typography variant="h1" component="span">
          PRANC
        </Typography>
      )}

      <ElectricPoleIcon />
    </Header>
  )
}

export default HeaderComponent
