import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  center?: boolean
  opt?: string
  justify?: 'around' | 'start' | 'end' | 'center' | 'between'
}

export const DFlex = (props: Props) => {
  const { children, center, opt, justify } = props

  const result = [
    'd-flex',
    center ? 'align-items-center' : '',
    justify ? `justify-content-${justify}` : '',
    opt
  ].join(' ')

  return <div className={result}>{children}</div>
}
