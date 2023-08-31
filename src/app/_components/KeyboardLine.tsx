import KeyboardButton from './KeyboardButton'

export default function KeyboardLine({ letters }: { letters: string[] }) {
  return (
    <div className='flex gap-2'>
      {letters.map((element, id) => {
        return <KeyboardButton key={id} text={element} />
      })}
    </div>
  )
}
