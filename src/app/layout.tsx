import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import NavBar from '@/componenets/NavBar'
import Providers from '@/componenets/Providers'
import { Toaster } from 'sonner'
import Footer from '@/componenets/Footer'
const inter = Inter({ subsets: ['latin'] })
import localFont from "@next/font/local"

const myFont = localFont({
  src: [
    {
      path: '../../public/AmsterdamFour_ttf.ttf'
    }
  ],
  variable: "--font-Logo"
})
export const metadata: Metadata = {
  title: 'Cabinet de Nutrition - Rym Gamra',
  description: 'Cabinet de Nutrition Rym Gamra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={cn(` relative h-full ${myFont.variable} font-serif antialiased`, inter.className)}>
        <main className=' bg-PrimaryColor relative flex flex-col min-h-screen '>
          <Providers>
            <NavBar />
            <div
              className='flex-grow flex-1'
            >{children}
            </div>
            {/* <Footer /> */}
          </Providers>
        </main>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}