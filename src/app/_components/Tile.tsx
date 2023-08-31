export default function Tile({
  letter,
  color,
}: {
  letter: string | null
  color: string
}) {
  return (
    <div
      className={`bg-${color} box-border w-[60px] h-[60px] border-[3px] border-gray-700 text-white 
                flex items-center justify-center font-bold text-3xl`}>
      {letter}
    </div>
  )
}
