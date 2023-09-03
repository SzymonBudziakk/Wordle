import { X } from 'lucide-react'

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
  return (
    <>
      <div className='absolute top-0 w-full h-full flex items-center justify-center'>
        <div className='bg-red-300 w-[400px] h-[600px] rounded-md z-10'>
          <button onClick={toggleModal} className='top-0 right-0'>
            <X width={32} height={32} />
          </button>
        </div>
      </div>
      <button
        onClick={toggleModal}
        className='absolute top-0 w-full h-full cursor-default'
      />
    </>
  )
}
