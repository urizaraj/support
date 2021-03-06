import { ChangeEvent, FormEvent, MouseEvent } from 'react'

export type Change = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
) => void
export type Click = (
  event: MouseEvent<HTMLElement> | MouseEvent<HTMLAnchorElement>
) => void
export type Submit = (event: FormEvent<HTMLFormElement>) => void
