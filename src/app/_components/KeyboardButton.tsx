import { CornerDownLeft, ArrowBigLeft } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { KeyboardContext } from '../_hooks/KeyboardContextProvider'
import { useContext } from 'react'

export default function KeyboardButton({ text }: { text: string }) {
  const key = text
  const event = new KeyboardEvent('keydown', { key })
  const letterStatus = useContext(KeyboardContext)

  return (
    <button
      className={twMerge(
        'py-3 sm:py-4 rounded-md text-lg sm:text-xl font-medium flex justify-center items-center border-secondary dark:border-secondaryDark',
        text.length === 1 ? 'w-12 min-w-min' : 'w-[72px]',
        letterStatus.confirmed.includes(text)
          ? 'bg-confirmed dark:bg-confirmedDark'
          : letterStatus.noticed.includes(text)
          ? 'bg-noticed dark:bg-noticedDark'
          : letterStatus.used.includes(text)
          ? 'bg-secondary dark:bg-secondaryDark'
          : 'bg-primary dark:bg-primaryDark border-2'
      )}
      onClick={() => window.dispatchEvent(event)}>
      {text.length === 1 ? (
        text
      ) : text === 'Enter' ? (
        <CornerDownLeft />
      ) : (
        <ArrowBigLeft />
      )}
    </button>
  )
}
