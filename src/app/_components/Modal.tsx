import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Modal({
  content,
  toggleModal,
}: {
  content: ReactNode
  toggleModal: () => void
}) {
  return (
    <>
      <div className='absolute top-0 w-full h-full flex items-center justify-center text-textColor dark:text-textColorDark text-justify'>
        <div className='bg-primary dark:bg-primaryDark max-w-[600px] border-[1px] border-secondary dark:border-secondaryDark rounded-md z-10'>
          <button onClick={toggleModal} className='block ml-auto mr-3 mt-3'>
            <X width={32} height={32} />
          </button>
          {content}
        </div>
      </div>
      <button
        onClick={toggleModal}
        className='absolute top-0 w-full h-full cursor-default opacity-[0.25] bg-black'
      />
    </>
  )
}
