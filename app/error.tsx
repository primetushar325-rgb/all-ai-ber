"use client"
export default function Error({error, reset}:{error:Error, reset:()=>void}){
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-sm text-muted-foreground mt-2">{error.message || "Unexpected error occurred."}</p>
      <button onClick={reset} className="mt-6 px-6 py-3 bg-foreground text-white rounded-full text-sm">Try again</button>
    </div>
  )
}
