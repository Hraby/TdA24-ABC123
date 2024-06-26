import type { Metadata } from 'next'
import "./layout.css"
import "./global.css"

export const metadata: Metadata = {
  title: 'Špičkoví učitelé na dosah - Teacher digital Agency'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ scrollBehavior: 'smooth' }}>{children}</body>
    </html>
  )
}