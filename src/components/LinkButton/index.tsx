import React from 'react'
import Link from 'next/link'
import { Button, ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  href: string
  children: React.ReactNode
}

const LinkButton = (props: Props) => {
  const { href, children, ...rest } = props

  return (
    <Link href={href} passHref>
      <Button LinkComponent="a" {...rest}>
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton
