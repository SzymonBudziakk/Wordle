'use client'
import DarkModeToggle from './DarkModeToggle'
import Modal from './Modal'
import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleModal = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <header className='w-full bg-gray-600 top-0'>
      <div className='flex items-center justify-center p-6 gap-5'>
        <button onClick={toggleModal}>
          <HelpCircle width={64} height={64} />
        </button>
        <DarkModeToggle />
      </div>
      {isOpen && <Modal toggleModal={toggleModal} />}
    </header>
  )
}
