import React, { ReactNode } from 'react'
import { Change } from 'types'

interface Props {
  name: string
  value: string | number
  checked: boolean
  handleChange: Change
  children: ReactNode
}

export const Check = (props: Props) => {
  const { value, checked, handleChange, children, name } = props
  return (
    <label className="vlabel">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        style={{
          position: 'absolute',
          opacity: 0
        }}
      />
      {children}
    </label>
  )
}
