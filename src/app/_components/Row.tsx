import Tile from './Tile'

export default function Row({
  letters,
  maxWordLength,
  tileStatus,
}: {
  letters: string | null
  maxWordLength: number
  tileStatus: string[]
}) {
  if (letters === null) letters = ' '.repeat(maxWordLength)
  return (
    <div className='flex gap-2'>
      {letters
        .padEnd(maxWordLength)
        .split('')
        .map((element, id) => {
          return <Tile key={id} letter={element} color={tileStatus[id]} />
        })}
    </div>
  )
}
