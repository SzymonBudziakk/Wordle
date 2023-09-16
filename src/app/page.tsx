import Game from './Game'
import supabase from '../../database/supabase'
import { revalidatePath } from 'next/cache'

export interface letterStatusProps {
  used: string[]
  noticed: string[]
  confirmed: string[]
}

export interface guessVerificationProps {
  victory: boolean
  wordExists: boolean
  tileStatus: string[][]
  letterStatus: letterStatusProps
  error?: unknown
}

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

  const guessVerification = async (
    guess: string,
    tileStatus: string[][],
    letterStatus: letterStatusProps
  ) => {
    'use server'

    const tempTileStatus = [...tileStatus]
    const tempLetterStatus = letterStatus
    const status: guessVerificationProps = {
      victory: false,
      wordExists: true,
      tileStatus: tempTileStatus,
      letterStatus: tempLetterStatus,
    }

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
      if (tempTileStatus[i][0] === 'primary') {
        currIndex = i
        break
      }
    }
    guess.split('').forEach((letter, id) => {
      if (letter === solution[id]) {
        tempLetterStatus.confirmed.push(letter)
        tempTileStatus[currIndex][id] = 'confirmed'
      } else if (solution.includes(letter)) {
        tempLetterStatus.noticed.push(letter)
        tempTileStatus[currIndex][id] = 'noticed'
      } else {
        tempLetterStatus.used.push(letter)
        tempTileStatus[currIndex][id] = 'secondary'
      }
    })
    revalidatePath('/game')
    if (guess === solution) {
      status.victory = true
    }
    return status
  }

  return (
    <Game setSolution={setSolution} guessVerification={guessVerification} />
  )
}
