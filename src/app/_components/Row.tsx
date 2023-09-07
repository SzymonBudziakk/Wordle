import Tile from './Tile'
import { maxWordLength } from '../game/Game'

export default function Row({
  letters,
  tileStatus,
  tileStyle,
}: {
  letters: string | null
  tileStatus: string[]
  tileStyle?: string
}) {
  if (letters === null) letters = ''
  return (
    <div className='flex gap-1 sm:gap-2'>
      {letters
        .padEnd(maxWordLength)
        .split('')
        .map((element, id) => {
          return (
            <Tile
              key={id}
              letter={element}
              color={tileStatus[id]}
              style={tileStyle}
            />
          )
        })}
    </div>
  )
}
