import defaultTo from 'lodash/defaultTo'
import React, { ChangeEvent, Component } from 'react'
import { Change } from '../../types'

interface ControlProps {
  name: string
  value: string
  wrap?: string
  type?: string
  placeholder?: string
  handleChange: Change
}

export const Control = (props: ControlProps) => {
  const { name, value, wrap, handleChange, type, placeholder } = props
  const w = defaultTo(wrap, 'form-group')
  const t = defaultTo(type, 'text')
  return (
    <div className={w}>
      <input
        type={t}
        className="form-control"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
