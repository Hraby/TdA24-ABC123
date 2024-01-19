import type { Metadata } from 'next'
import {open_sans, lalezar} from "./fonts"

export const metadata: Metadata = {
  title: 'Špičkový učitelé na dosah - Teacher digital Agency'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} ${lalezar.className}`} style={{scrollBehavior:'smooth'}}>{children}</body>
    </html>
  )
}
