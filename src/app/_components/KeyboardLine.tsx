import { twMerge } from 'tailwind-merge'
import KeyboardButton from './KeyboardButton'

export default function KeyboardLine({
  letters,
  odd,
}: {
  letters: string[]
  odd: boolean
}) {
  return (
    <div
      className={twMerge(
        'flex gap-[2px] justify-center',
        odd ? 'w-[90%]' : 'w-full'
      )}>
      {letters.map((element, id) => {
        return <KeyboardButton key={id} text={element} />
      })}
    </div>
  )
}
