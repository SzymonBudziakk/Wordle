'use client'
import DarkModeToggle from './DarkModeToggle'
import Modal from './Modal'
import { useState } from 'react'
import { HelpCircle, Github } from 'lucide-react'
import Rules from './Rules'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(
    localStorage.getItem('day') ? false : true
  )
  const iconStyle = 'w-[48px] h-[48px] md:w-[64px] md:h-[64px]'

  const toggleRules = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <header className='w-full bg-primary dark:bg-primaryDark top-0 text-textColor dark:text-textColorDark flex justify-center'>
        <div className='flex items-center justify-center sm:justify-between p-6 w-[90%] border-b-2 border-textColor dark:border-textColorDark'>
          <h1 className='text-3xl md:text-[2.25rem] font-bold hidden sm:block'>
            Szymon Budziak
          </h1>
          <div className='flex items-center justify-center gap-3'>
            <button onClick={toggleRules}>
              <HelpCircle className={iconStyle} />
            </button>
            <a
              href='https://github.com/SzymonBudziakk'
              target='_blank'
              title='See repository'>
              <Github className={iconStyle} />
            </a>
            <DarkModeToggle style={iconStyle} />
          </div>
        </div>
      </header>
      {isOpen && <Modal content={<Rules />} toggleModal={toggleRules} />}
    </>
  )
}
