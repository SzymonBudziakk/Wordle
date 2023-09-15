import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Header from './_components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wordle',
  description: 'Wordle Game by Szymon Budziak',
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/512/3600/3600973.png',
    apple: 'https://cdn-icons-png.flaticon.com/512/3600/3600973.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <div className='bg-primary dark:bg-primaryDark absolute top-0 -z-10 w-full h-[100vh]'>
          <Header />
          {children}
          <Toaster position='top-center' />
        </div>
      </body>
    </html>
  )
}
