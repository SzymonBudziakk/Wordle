'use client'
import DarkModeToggle from './DarkModeToggle'
import Modal from './Modal'
import { useState } from 'react'
import { HelpCircle, Github } from 'lucide-react'
import Rules from './Rules'
import About from './About'

export default function Header() {
  const [areRulesOpen, setAreRulesOpen] = useState<boolean>(false)
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false)
  const iconStyle = 'w-[48px] h-[48px] md:w-[64px] md:h-[64px]'
  const toggleRules = (): void => {
    setAreRulesOpen(!areRulesOpen)
  }
  const toggleAbout = (): void => {
    setIsAboutOpen(!isAboutOpen)
  }

  return (
    <>
      <header className='w-full bg-primary top-0 text-textColor flex justify-center'>
        <div className='flex items-center justify-between p-6 w-[90%] border-b-2 border-textColor'>
          <h1 className='text-3xl md:text-[2.25rem] font-bold'>
            Szymon Budziak
          </h1>
          <div className='flex items-center justify-center gap-3'>
            <button onClick={toggleRules}>
              <HelpCircle className={iconStyle} />
            </button>
            <button onClick={toggleAbout}>
              <Github className={iconStyle} />
            </button>
            <DarkModeToggle style={iconStyle} />
          </div>
        </div>
      </header>
      {areRulesOpen && <Modal content={<Rules />} toggleModal={toggleRules} />}
      {isAboutOpen && <Modal content={<About />} toggleModal={toggleAbout} />}
    </>
  )
}
