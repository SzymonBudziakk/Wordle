import { X } from 'lucide-react'
import Tile from './Tile'

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
  return (
    <>
      <div className='absolute top-0 w-full h-full flex items-center justify-center text-textColor'>
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
              accepted.
            </p>
            <p>
              When confirming each word, you may encounter the following
              situations:
            </p>
            <Situation
              text='You guessed the letter and its correct position:'
              color='confirmed'
              word='chArt'
            />
            <Situation
              text='You
              guessed the letter, but it appears in a different position:'
              color='noticed'
              word='tOast'
            />
            <Situation
              text='The given letter does not appear in the word:'
              color='secondary'
              word='chArt'
            />
            <p>
              To enter letters into the boxes, you should use an external device
              or the on-screen keyboard provided on the website.
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

export function Situation({
  text,
  color,
  word,
}: {
  text: string
  color: string
  word: string
}) {
  return (
    <>
      <p>{text}</p>
      <div className='flex'>
        {word.split('').map((letter, id) => {
          return (
            <Tile
              key={id}
              letter={letter.toUpperCase()}
              color={letter.toUpperCase() === letter ? color : 'secondary'}
            />
          )
        })}
      </div>

      {/* <Tile letter={letter} color={color} style='w-10 h-10 my-2' /> */}
    </>
  )
}
