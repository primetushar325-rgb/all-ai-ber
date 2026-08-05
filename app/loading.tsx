import { Skeleton } from "@/components/ui/skeleton"
export default function Loading(){
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-8 w-48"/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_,i)=><Skeleton key={i} className="h-32 w-full rounded-2xl"/>)}
      </div>
    </div>
  )
}
