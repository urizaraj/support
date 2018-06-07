import compact from 'lodash/compact'
import keys from 'lodash/keys'
import pick from 'lodash/pick'
import React, { ReactNode } from 'react'
import { Click } from '../../types'

interface Props {
  opt?: string
  children?: ReactNode
  onClick?: Click

  disabled?: boolean

  primary?: boolean
  secondary?: boolean
  danger?: boolean
  success?: boolean
  warning?: boolean
  info?: boolean
  light?: boolean
  dark?: boolean
  link?: boolean

  size?: string
  outline?: boolean
  block?: boolean
  sm?: boolean
  lg?: boolean

  submit?: boolean
}

type FF = (key: string[] | string) => string

function comp(value: string) {
  return value ? `btn-${value}` : ''
}

const colors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'link',
  'warning',
  'info',
  'light',
  'dark'
]

export const Btn = (props: Props) => {
  const ff: FF = key => keys(pick(props, key))[0]

  const color = ff(colors)

  const outline = ff('outline')

  const type = compact(['btn', outline, color]).join('-')

  const size = comp(ff(['sm', 'lg']))

  const block = comp(ff('block'))

  const result = ['btn', type, size, block, props.opt].join(' ')

  return (
    <button
      onClick={props.onClick}
      className={result}
      disabled={props.disabled}
      type={props.submit ? 'submit' : 'button'}
    >
      {props.children}
    </button>
  )
}
