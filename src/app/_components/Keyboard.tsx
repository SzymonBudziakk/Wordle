import KeyboardLine from './KeyboardLine'

const keyboardButtons: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]

export default function Keyboard() {
  return (
    <div className='fixed xl:static bottom-0 pb-[3.5rem] xl:p-0 flex flex-col gap-[2px] items-center w-full xl:w-auto bg-primary'>
      {keyboardButtons.map((element, id) => {
        return <KeyboardLine key={id} letters={element} odd={id === 1} />
      })}
    </div>
  )
}
