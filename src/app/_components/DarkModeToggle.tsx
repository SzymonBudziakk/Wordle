import { Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(true)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return (
    <button onClick={toggleDarkMode}>
      {isDark ? (
        <Sun width={64} height={64} />
      ) : (
        <Moon width={64} height={64} />
      )}
    </button>
  )
}
