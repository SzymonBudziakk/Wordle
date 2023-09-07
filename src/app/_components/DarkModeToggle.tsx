import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle({ style }: { style: string }) {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  useEffect(() => {
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {isDark ? <Sun className={style} /> : <Moon className={style} />}
    </button>
  )
}
