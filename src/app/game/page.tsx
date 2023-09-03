import Game from './Game'
import supabase from '../../../database/supabase'
import { revalidatePath } from 'next/cache'

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
  Array(5).fill('default')
)
let solution = 'PIZZA'

export default function GameWrapper() {
  const setNewSolution = async () => {
    'use server'
    const numberOfWords = 8885
    const randomIndex = Math.floor(Math.random() * numberOfWords) + 1

    try {
      const { data, error } = await supabase
        .from('words')
        .select('word')
        .eq('id', randomIndex)
      if (!error && data !== null) solution = data[0].word
    } catch (error: unknown) {
      return error
    }

    // revalidateTag ??
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
      if (tileStatus[i][0] === 'default') {
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
        tileStatus[currIndex][id] = 'used'
      }
    })
    revalidatePath('/game')
    if (guess === solution) {
      status.victory = true
    }
    return status
  }

  return (
    <Game
      solution={solution}
      letterStatus={letterStatus}
      tileStatus={tileStatus}
      setNewSolution={setNewSolution}
      guessVerification={guessVerification}
    />
  )
}
