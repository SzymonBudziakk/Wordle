'use client'
import Keyboard from '../_components/Keyboard'
import Row from '../_components/Row'
import { useState, useEffect, createContext } from 'react'
import { letterStatusProps } from './page'
import { toast } from 'react-hot-toast'

// another component for context ??
export const KeyboardContext = createContext({} as letterStatusProps)

// delete solution
export default function Game({
  solution,
  letterStatus,
  tileStatus,
  setNewSolution,
  guessVerification,
}: {
  solution: string
  letterStatus: letterStatusProps
  tileStatus: string[][]
  setNewSolution: () => Promise<unknown>
  guessVerification: (guess: string) => Promise<void>
}) {
  const maxWordLength = 5
  const [rows, setRows] = useState<(string | null)[]>(
    Array(6)
      .fill(null)
      .map((e, id) => (id === 0 ? '' : null))
  )
  const [currRowId, setCurrRowId] = useState<number>(0)
  const [currWord, setCurrWord] = useState<string>('')

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setCurrWord((prev) => prev.slice(0, -1))
    } else if (
      currWord.length < maxWordLength &&
      /^[a-zA-Z]$/.test(event.key)
    ) {
      setCurrWord((prev) => prev + event.key.toUpperCase())
    } else if (event.key === 'Enter' && currWord.length === maxWordLength) {
      guessVerification(currWord)

      toast.error('Word pushed?')

      const newRows = [...rows]
      newRows[currRowId] = currWord
      setRows(newRows)
      setCurrWord('')
      setCurrRowId((prev) => prev + 1)
    } else if (event.key === 'Enter') {
      // is working?
      toast.error('Not enough letters')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  })

  return (
    <div className='flex flex-col justify-center items-center gap-10 mt-16'>
      <div className='flex flex-col gap-2'>
        {rows.map((element, id) => {
          return (
            <Row
              key={id}
              letters={currRowId === id ? currWord : element}
              maxWordLength={maxWordLength}
              tileStatus={tileStatus[id]}
            />
          )
        })}
      </div>
      <h1 className='text-white text-3xl'>solution:{solution}</h1>
      <button
        onClick={async () => await setNewSolution()}
        className='text-white text-3xl'>
        Set new solution
      </button>
      <KeyboardContext.Provider value={letterStatus}>
        <Keyboard />
      </KeyboardContext.Provider>
      <div className='bg-primary fixed top-0 -z-10 w-full h-[100vh]'></div>
    </div>
  )
}
