export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen mx-auto">
        root Pages Layout
        {children}
      </body>
    </html>
  )
}
