'use client'
import Keyboard from '../_components/Keyboard'
import Row from '../_components/Row'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { getErrorMessage } from '../_utils/getErrorMessage'

export const maxWordLength = 5

export default function Game({
  solution,
  tileStatus,
  setSolution,
  guessVerification,
}: {
  solution: string
  tileStatus: string[][]
  setSolution: () => Promise<unknown>
  guessVerification: (guess: string) => Promise<{
    victory: boolean
    wordExists: boolean
    error?: unknown
  }>
}) {
  const [rows, setRows] = useState<(string | null)[]>(
    Array(6)
      .fill(null)
      .map((e, id) => (id === 0 ? '' : null))
  )
  const [currRowId, setCurrRowId] = useState<number>(0)
  const [currWord, setCurrWord] = useState<string>('')

  useEffect(() => {
    setSolution()

    const currDate = new Date()
    const day = localStorage.getItem('day')

    if (day && JSON.parse(day) === currDate.getDay()) {
      const stringyfiedGameInfo = localStorage.getItem('gameInfo')
      if (stringyfiedGameInfo) {
        const gameInfo = JSON.parse(stringyfiedGameInfo)
        setRows(gameInfo.rows)
        setCurrRowId(gameInfo.rowId)
        tileStatus = gameInfo.tileStatus
      }
    } else {
      localStorage.setItem('day', JSON.stringify(currDate.getDay()))
    }
  }, [])

  useEffect(() => {
    const newRows = [...rows]
    newRows[currRowId] = currWord.padEnd(maxWordLength)

    const gameInfo: {
      rows: (string | null)[]
      rowId: number
      tileStatus: string[][]
    } = {
      rows: newRows,
      rowId: currRowId,
      tileStatus: tileStatus,
    }
    localStorage.setItem('gameInfo', JSON.stringify(gameInfo))
  }, [rows, tileStatus])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setCurrWord((prev) => prev.slice(0, -1))
      } else if (
        currWord.length < maxWordLength &&
        /^[a-zA-Z]$/.test(event.key)
      ) {
        setCurrWord((prev) => prev + event.key.toUpperCase())
      } else if (event.key === 'Enter' && currWord.length === maxWordLength) {
        const verify = async () => {
          const status = await guessVerification(currWord)
          if (status.victory) {
            // WINNING ACTION
            toast('Congratulations! You guessed the word!')
          } else if (!status.wordExists) {
            toast.error("Word doesn't exist")
          } else if (status.error) {
            toast.error(getErrorMessage(status.error))
          } else if (currRowId === 5) {
            // LOSING ACTION
            toast.error('You lose the game!')
          } else {
            toast('Word passed!')
            const newRows = [...rows]
            newRows[currRowId] = currWord
            setRows(newRows)
            setCurrWord('')
            setCurrRowId((prev) => prev + 1)
          }
        }
        verify()
      } else if (event.key === 'Enter') {
        toast.error('Not enough letters')
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currWord])

  return (
    <>
      <div
        className='flex flex-col xl:flex-row justify-center xl:justify-evenly items-center 
                  mt-8 xl:mt-32 text-textColor dark:text-textColorDark bg-primary dark:bg-primaryDark'>
        <div className='flex flex-col gap-1 sm:gap-2'>
          {rows.map((element, id) => {
            return (
              <Row
                key={id}
                letters={currRowId === id ? currWord : element}
                tileStatus={tileStatus[id]}
              />
            )
          })}
        </div>
        <Keyboard />
        {/* <h1 className='text-white text-3xl'>solution:{solution}</h1> */}
      </div>
    </>
  )
}
