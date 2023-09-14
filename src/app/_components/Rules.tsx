import Row from './Row'
import { maxWordLength } from '../game/Game'

const rulesData = [
  {
    text: 'You guessed the letter and its correct position:',
    letters: 'CHART',
    tileStatus: Array(maxWordLength)
      .fill('')
      .map((e, id) => (id === 2 ? 'confirmed' : 'primary')),
  },
  {
    text: 'You guessed the letter, but it appears in a different position:',
    letters: 'PINKY',
    tileStatus: Array(maxWordLength)
      .fill('')
      .map((e, id) => (id === 0 ? 'noticed' : 'primary')),
  },
  {
    text: 'The given letter does not appear in the word:',
    letters: 'TOAST',
    tileStatus: Array(maxWordLength)
      .fill('')
      .map((e, id) => (id === 3 ? 'secondary' : 'primary')),
  },
]
const tileStyle =
  'w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 border-2 text-xl sm:text-2xl'

export default function Rules() {
  return (
    <div className='px-12 pb-5 text-sm sm:text-md md:text-lg'>
      <h1 className='text-xl sm:text-2xl font-bold pb-2'>The Rules</h1>
      <p>
        Every day at midnight, a new word is drawn. You only have 6 attempts to
        guess it. Each attempt must be an existing word in the English language
        - otherwise, it will not be accepted. To enter letters into the boxes,
        you can use an external device or the on-screen keyboard provided on the
        website. When confirming each word, you will encounter the following
        situations:
      </p>
      {rulesData.map((data, id) => {
        return (
          <div key={id} className='flex flex-col items-center'>
            <h2 className='py-3 text-center md:text-md'>{data.text}</h2>
            <Row
              letters={data.letters}
              tileStatus={data.tileStatus}
              tileStyle={tileStyle}
            />
          </div>
        )
      })}
      <p className='pb-3 pt-5 text-center'>Good luck!</p>
    </div>
  )
}
