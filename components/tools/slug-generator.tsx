"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard, slugify } from "@/lib/utils"
export default function SlugGeneratorTool(){
  const [input,setInput]=useState("")
  const slug=slugify(input)
  return (
    <div className="space-y-4 max-w-xl">
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter title e.g. How to Make Money Online" className="w-full h-12 px-4 rounded-2xl border"/>
      <div className="p-4 rounded-2xl bg-muted border break-all font-mono">{slug||<span className="opacity-30">your-seo-friendly-slug</span>}</div>
      <Button variant="outline" onClick={()=>copyToClipboard(slug)}>Copy Slug</Button>
    </div>
  )
}
