import { twMerge } from 'tailwind-merge'

export default function Tile({
  letter,
  color,
  style,
}: {
  letter: string | null
  color: string
  style?: string
}) {
  return (
    <div
      className={twMerge(
        'box-border w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] border-secondary flex items-center justify-center font-bold text-3xl',
        color === 'primary' ? 'border-[3px]' : 'border-0',
        `bg-${color}`,
        style
      )}>
      {letter}
    </div>
  )
}
