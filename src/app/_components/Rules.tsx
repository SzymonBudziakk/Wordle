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
const tileStyle = 'w-8 h-8 sm:w-[3rem] sm:h-[3rem]'

export default function Rules() {
  return (
    <div className='px-12 pb-5'>
      <h1 className='text-2xl font-bold pb-2'>The Rules</h1>
      <p>
        Every day at midnight, a new word is drawn. You only have 6 attempts to
        guess it. Each attempt must be an existing word in the English language
        - otherwise, it will not be accepted. When confirming each word, you
        will encounter the following situations:
      </p>
      {rulesData.map((data, id) => {
        return (
          <div key={id} className='flex flex-col items-center'>
            <h2 className='py-3'>{data.text}</h2>
            <Row
              letters={data.letters}
              tileStatus={data.tileStatus}
              tileStyle={tileStyle}
            />
          </div>
        )
      })}
      <p className='py-3'>
        To enter letters into the boxes, you can use an external device or the
        on-screen keyboard provided on the website.
      </p>
    </div>
  )
}
