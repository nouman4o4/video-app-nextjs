export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex items-center justify-center min-h-screen mx-auto">
        {children}
      </body>
    </html>
  )
}
