import { X } from 'lucide-react'

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
  return (
    <>
      <div className='absolute top-0 w-full h-full flex items-center justify-center'>
        <div className='bg-red-300 max-w-[600px] rounded-md z-10'>
          <button onClick={toggleModal} className='block ml-auto mr-3 mt-3'>
            <X width={32} height={32} />
          </button>
          <div className='px-10 py-5'>
            <h1 className='text-2xl font-bold'>How To Play</h1>
            <p>Guess the Wordle in 6 tries.</p>
            <p>Each guess must be a valid 5-letter word.</p>
            <p>
              The color of the tiles will change to show how close your guess
              was to the word.
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
