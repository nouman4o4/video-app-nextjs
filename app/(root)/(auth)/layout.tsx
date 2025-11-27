export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="pt-5">{children}</div>
    </div>
  )
}
