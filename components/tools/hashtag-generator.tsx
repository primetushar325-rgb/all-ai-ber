"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function HashtagGeneratorTool(){
  const [topic,setTopic]=useState("")
  const [tags,setTags]=useState<string[]>([])
  const generate=()=>{
    if(!topic) return
    const base=topic.toLowerCase().replace(/\s+/g,'')
    setTags([
      `#${base}`, `#${base}life`, `#${base}tips`, `#${base}2025`, `#${base}community`,
      `#love${base}`, `#${base}lover`, `#${base}daily`, `#viral${base}`, `#trending`,
      `#${base}hack`, `#${base}tutorial`, `#instag${base}`, `#${base}gram`, `#explore`,
      `#${base}love`, `#${base}addict`, `#${base}inspo`, `#${base}goals`, `#${base}style`
    ])
  }
  return (
    <div className="space-y-4">
      <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Enter topic e.g. Travel Photo" className="w-full h-12 px-4 rounded-2xl border"/>
      <Button onClick={generate} variant="accent">Generate Hashtags</Button>
      {tags.length>0 && (
        <div className="p-4 rounded-2xl bg-white border">
          <div className="flex flex-wrap gap-2">{tags.map(t=><span key={t} className="px-3 py-1 bg-accent/20 rounded-full text-sm">{t}</span>)}</div>
          <Button className="mt-4" size="sm" variant="outline" onClick={()=>copyToClipboard(tags.join(' '))}>Copy All</Button>
        </div>
      )}
    </div>
  )
}
