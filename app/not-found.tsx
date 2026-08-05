import Link from "next/link"
export default function NotFound(){
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <div className="text-7xl mb-6">404</div>
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mt-2 text-sm">The page you are looking for doesn't exist or was moved.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link href="/" className="px-6 py-3 bg-foreground text-white rounded-full text-sm font-medium">Go Home</Link>
        <Link href="/tools" className="px-6 py-3 border rounded-full text-sm">Browse Tools</Link>
      </div>
    </div>
  )
}
