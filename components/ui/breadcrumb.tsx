"use client"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            {item.href ? (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-semibold">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function BreadcrumbSkeleton() {
  return (
    <div className="flex gap-2 h-5 animate-pulse">
      <div className="h-4 w-16 bg-muted rounded" />
      <div className="h-4 w-20 bg-muted rounded" />
    </div>
  )
}
