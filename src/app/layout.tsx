import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LeftSideBar from '../components/LeftSideBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'X CLone for HCRL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid-cols-[auto,1fr] desktop:max-w-7xl laptop:max-w-5xl max-w-2xl mx-auto">
          <LeftSideBar />
          <main>
            <div className="grid grid-cols-[auto,1fr] desktop:ml-72 tablet:ml-20 min-h-screen">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
