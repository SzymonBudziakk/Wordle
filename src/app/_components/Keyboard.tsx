import KeyboardLine from './KeyboardLine'

const keyboardButtons: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]

export default function Keyboard() {
  return (
    <div className='flex flex-col gap-2 items-center'>
      {keyboardButtons.map((element, id) => {
        return <KeyboardLine key={id} letters={element} />
      })}
    </div>
  )
}
