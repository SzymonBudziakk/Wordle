import { X } from 'lucide-react'
import Row from './Row'

const rulesData = [
  {
    text: 'You guessed the letter and its correct position:',
    letters: 'CHART',
    tileStatus: Array(5)
      .fill('')
      .map((e, id) => (id === 2 ? 'confirmed' : 'primary')),
  },
  {
    text: 'You guessed the letter, but it appears in a different position:',
    letters: 'PINKY',
    tileStatus: Array(5)
      .fill('')
      .map((e, id) => (id === 0 ? 'noticed' : 'primary')),
  },
  {
    text: 'The given letter does not appear in the word:',
    letters: 'TOAST',
    tileStatus: Array(5)
      .fill('')
      .map((e, id) => (id === 3 ? 'secondary' : 'primary')),
  },
]
const tileStyle = 'w-8 h-8 sm:w-[3rem] sm:h-[3rem]'

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
  return (
    <>
      <div className='absolute top-0 w-full h-full flex items-center justify-center text-textColor text-justify'>
        <div className='bg-primary max-w-[600px] border-[1px] border-secondary border- rounded-md z-10'>
          <button onClick={toggleModal} className='block ml-auto mr-3 mt-3'>
            <X width={32} height={32} />
          </button>
          <div className='px-12 pb-5'>
            <h1 className='text-2xl font-bold pb-2'>The Rules</h1>
            <p>
              Every day at midnight, a new word is drawn that needs to be
              guessed. You only have 6 attempts. Each attempt must be an
              existing word in the English language - otherwise, it will not be
              accepted. When confirming each word, you will encounter the
              following situations:
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
              To enter letters into the boxes, you can use an external device or
              the on-screen keyboard provided on the website.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={toggleModal}
        className='absolute top-0 w-full h-full cursor-default opacity-[0.25] bg-black'
      />
    </>
  )
}
