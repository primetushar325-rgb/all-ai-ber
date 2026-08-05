"use client"
import dynamic from "next/dynamic"
import { toolComponentMap } from "@/lib/tool-components"
import { Skeleton } from "./ui/skeleton"

export function ToolRenderer({ slug }: { slug: string }) {
  const loader = toolComponentMap[slug]
  if (!loader) return <div>Tool not found</div>

  const Component = dynamic(loader, {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    ),
    ssr: false,
  })

  return <Component />
}
