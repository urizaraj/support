import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  opt?: string
}

export const Card = (props: Props) => {
  const { children, opt } = props

  const result = ['card', opt].join(' ')

  return (
    <div className={result}>
      <div className="card-body">{children}</div>
    </div>
  )
}
