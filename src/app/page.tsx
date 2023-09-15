import Game from './Game'
import supabase from '../../database/supabase'
import { revalidatePath } from 'next/cache'
import KeyboardContextProvider from './_hooks/KeyboardContextProvider'

export interface letterStatusProps {
  used: string[]
  noticed: string[]
  confirmed: string[]
}
const letterStatus: letterStatusProps = {
  used: [],
  noticed: [],
  confirmed: [],
}

const tileStatus: string[][] = Array.from({ length: 6 }, () =>
  Array(5).fill('primary')
)
let solution: string

export default function GameWrapper() {
  const setSolution = async () => {
    'use server'
    const generateNumber = (): number => {
      const currDate = new Date()
      const numberOfWords = 8885
      const baseNumber =
        currDate.getFullYear() *
        currDate.getMonth() *
        currDate.getDate() *
        currDate.getDay()

      return (baseNumber % numberOfWords) + 1
    }
    const randomIndex = generateNumber()

    try {
      const { data, error } = await supabase
        .from('words')
        .select('word')
        .eq('id', randomIndex)
      if (!error && data !== null) solution = data[0].word
    } catch (error: unknown) {
      return error
    }

    revalidatePath('/game')
  }

  const guessVerification = async (guess: string) => {
    'use server'
    const status: {
      victory: boolean
      wordExists: boolean
      error?: unknown
    } = { victory: false, wordExists: true }

    try {
      const { data } = await supabase
        .from('words')
        .select('word')
        .eq('word', guess)
      if (data?.length === 0 || data === null) {
        status.wordExists = false
        return status
      }
    } catch (error: unknown) {
      status.error = error
      return status
    }

    let currIndex: number
    for (let i = 0; i < 6; i++) {
      if (tileStatus[i][0] === 'primary') {
        currIndex = i
        break
      }
    }
    guess.split('').forEach((letter, id) => {
      if (letter === solution[id]) {
        letterStatus.confirmed.push(letter)
        tileStatus[currIndex][id] = 'confirmed'
      } else if (solution.includes(letter)) {
        letterStatus.noticed.push(letter)
        tileStatus[currIndex][id] = 'noticed'
      } else {
        letterStatus.used.push(letter)
        tileStatus[currIndex][id] = 'secondary'
      }
    })
    revalidatePath('/game')
    if (guess === solution) {
      status.victory = true
    }
    return status
  }

  return (
    <KeyboardContextProvider value={letterStatus}>
      <Game
        tileStatus={tileStatus}
        setSolution={setSolution}
        guessVerification={guessVerification}
      />
    </KeyboardContextProvider>
  )
}
