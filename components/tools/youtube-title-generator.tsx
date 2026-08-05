"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function YoutubeTitleGeneratorTool(){
  const [topic,setTopic]=useState("")
  const [titles,setTitles]=useState<string[]>([])
  const generate=()=>{
    if(!topic) return
    const t=topic
    const gens=[
      `I Tried ${t} for 30 Days - Here's What Happened!`,
      `${t} Secrets Nobody Tells You (2025)`,
      `How I Mastered ${t} in 7 Days (Step by Step)`,
      `5 ${t} Mistakes That Are Killing Your Growth`,
      `The Ultimate ${t} Guide for Beginners`,
      `${t} vs ${t} Pro - Which is Better?`,
      `Why ${t} is Changing Everything in 2025`,
      `10 ${t} Hacks You Need to Know`,
      `Stop Doing ${t} Wrong! Do This Instead`,
      `This ${t} Trick Made Me Viral`,
    ]
    setTitles(gens)
  }
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Enter video topic e.g. ChatGPT" className="flex-1 h-12 px-4 rounded-2xl border"/>
        <Button onClick={generate} variant="accent">Generate</Button>
      </div>
      <div className="grid gap-2">
        {titles.map((title,i)=>(
          <div key={i} className="flex items-center justify-between p-3 bg-white border rounded-xl hover:shadow-soft transition-all"><span className="text-sm font-medium">{title}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(title)}>Copy</Button></div>
        ))}
      </div>
    </div>
  )
}
