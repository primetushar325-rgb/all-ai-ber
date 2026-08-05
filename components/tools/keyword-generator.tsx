"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function KeywordGeneratorTool(){
  const [topic,setTopic]=useState("")
  const [keywords,setKeywords]=useState<string[]>([])
  const generate=()=>{
    if(!topic) return
    setKeywords([
      `${topic} tutorial`,
      `how to ${topic}`,
      `${topic} for beginners`,
      `best ${topic} 2025`,
      `${topic} tips and tricks`,
      `${topic} free`,
      `${topic} tools`,
      `${topic} guide`,
      `${topic} course`,
      `learn ${topic}`,
      `${topic} explained`,
      `${topic} review`,
      `${topic} vs competitor`,
      `${topic} secrets`,
      `advanced ${topic}`
    ])
  }
  return (
    <div className="space-y-4">
      <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Enter seed keyword" className="w-full h-12 px-4 rounded-2xl border"/>
      <Button onClick={generate} variant="accent">Generate Keywords</Button>
      {keywords.length>0 && (
        <div className="p-4 rounded-2xl border bg-white space-y-2">
          {keywords.map(k=><div key={k} className="flex justify-between items-center p-2 hover:bg-muted rounded-lg"><span className="text-sm">{k}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(k)}>Copy</Button></div>)}
          <Button variant="outline" className="w-full mt-2" onClick={()=>copyToClipboard(keywords.join('\n'))}>Copy All</Button>
        </div>
      )}
    </div>
  )
}
