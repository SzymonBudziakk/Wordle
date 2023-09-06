'use client'
import { createContext, ReactNode } from 'react'
import { letterStatusProps } from '../game/page'

export const KeyboardContext = createContext({} as letterStatusProps)

export default function KeyboardContextProvider({
  children,
  value,
}: {
  children: ReactNode
  value: letterStatusProps
}) {
  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  )
}
