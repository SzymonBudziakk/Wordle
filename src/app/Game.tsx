'use client'
import Keyboard from './_components/Keyboard'
import Row from './_components/Row'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getErrorMessage } from './_utils/getErrorMessage'
import { letterStatusProps, guessVerificationProps } from './page'
import KeyboardContextProvider from './_hooks/KeyboardContextProvider'

export const maxWordLength = 5

export default function Game({
  setSolution,
  guessVerification,
}: {
  setSolution: () => Promise<unknown>
  guessVerification: (
    guess: string,
    tileStatus: string[][],
    letterStatus: letterStatusProps
  ) => Promise<guessVerificationProps>
}) {
  const [rows, setRows] = useState<(string | null)[]>(
    Array(6)
      .fill(null)
      .map((e, id) => (id === 0 ? '' : null))
  )
  const [tileStatus, setTileStatus] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill('primary'))
  )
  const [currRowId, setCurrRowId] = useState<number>(0)
  const [currWord, setCurrWord] = useState<string>('')
  const [gameStatus, setGameStatus] = useState<string>('inProgress')
  const [letterStatus, setLetterStatus] = useState<letterStatusProps>({
    used: [],
    noticed: [],
    confirmed: [],
  })

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
        setTileStatus(gameInfo.tileStatus)
        setGameStatus(gameInfo.gameStatus)
        setLetterStatus(gameInfo.letterStatus)
      }
    } else {
      if (day) {
        localStorage.removeItem('gameInfo')
      }
      localStorage.setItem('day', JSON.stringify(currDate.getDay()))
    }
  }, [])

  useEffect(() => {
    const gameInfo: {
      rows: (string | null)[]
      rowId: number
      tileStatus: string[][]
      gameStatus: string
      letterStatus: letterStatusProps
    } = {
      rows: rows.slice(0, 6),
      rowId: currRowId,
      tileStatus: tileStatus,
      gameStatus: gameStatus,
      letterStatus: letterStatus,
    }
    localStorage.setItem('gameInfo', JSON.stringify(gameInfo))
  }, [rows, tileStatus, gameStatus])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameStatus === 'victory') {
        toast('You already guessed the word! Come back tomorrow!')
      } else if (gameStatus === 'defeat') {
        toast.error('You are out of attempts... Try again tomorrow.')
      } else if (event.key === 'Backspace') {
        setCurrWord((prev) => prev.slice(0, -1))
      } else if (
        currWord.length < maxWordLength &&
        /^[a-zA-Z]$/.test(event.key)
      ) {
        setCurrWord((prev) => prev + event.key.toUpperCase())
      } else if (event.key === 'Enter' && currWord.length === maxWordLength) {
        const verify = async () => {
          const status = await guessVerification(
            currWord,
            tileStatus,
            letterStatus
          )
          setLetterStatus(status.letterStatus)
          setTileStatus(status.tileStatus)
          if (!status.wordExists) {
            toast.error("Word doesn't exist")
          } else if (status.error) {
            toast.error(getErrorMessage(status.error))
          } else {
            const newRows = [...rows]
            newRows[currRowId] = currWord
            setRows(newRows)
            setCurrWord('')
            setCurrRowId((prev) => prev + 1)
            if (status.victory) {
              setGameStatus('victory')
              toast('Congratulations! You guessed the word!')
            } else if (currRowId === 5) {
              setGameStatus('defeat')
              toast.error(`You didn't guees the word... Come back tomorrow!`)
            } else {
              toast('Word passed!')
            }
          }
        }
        verify()
      } else if (event.key === 'Enter') {
        toast.error('Not enough letters')
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currWord, gameStatus])

  return (
    <>
      <div
        className='flex flex-col xl:flex-row justify-center gap-8 xl:justify-evenly items-center 
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
        <KeyboardContextProvider value={letterStatus}>
          <Keyboard />
        </KeyboardContextProvider>
      </div>
    </>
  )
}
