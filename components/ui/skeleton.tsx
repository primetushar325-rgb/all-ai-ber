import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-muted", className)}
      {...props}
    />
  )
}

function ToolCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-5 space-y-4">
      <div className="flex gap-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export { Skeleton, ToolCardSkeleton }
