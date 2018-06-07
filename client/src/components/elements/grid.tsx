import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  opt?: string
}

interface BColProps extends Props {
  size?: string
}

export const Row = (props: Props) => {
  const { opt, children, ...other } = props
  const result = ['row', opt].join(' ')
  return (
    <div className={result} {...other}>
      {children}
    </div>
  )
}

export const BCol = (props: BColProps) => {
  const { opt, children, size, ...other } = props
  const result = ['col', size ? `col-${size}` : '', opt].join(' ')
  return (
    <div className={result} {...other}>
      {children}
    </div>
  )
}
