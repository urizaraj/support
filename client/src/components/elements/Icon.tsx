import React from 'react'

interface IconProps {
  icon: string
  size?: string
}

export const Icon = (props: IconProps) => {
  const result = `oi oi-${props.icon}`
  const style = props.size ? { fontSize: `${props.size}rem` } : {}
  return <span className={result} style={style} />
  // return <img src="/svg/badge.svg" height="16" width="16" alt="icon name" />
}
