import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [])

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
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
