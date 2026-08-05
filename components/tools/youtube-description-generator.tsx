"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function YoutubeDescriptionGeneratorTool(){
  const [topic,setTopic]=useState("")
  const [desc,setDesc]=useState("")
  const gen=()=>{
    if(!topic) return
    setDesc(`🎥 In this video about ${topic}, you'll discover:

✅ What is ${topic}?
✅ Why ${topic} matters in 2025
✅ Step by step tutorial
✅ Common mistakes to avoid
✅ Pro tips and tricks

⏱️ TIMESTAMPS:
00:00 Intro
01:30 What is ${topic}
03:45 How to get started
06:20 Common mistakes
08:10 Pro tips
10:00 Conclusion

🔗 LINKS:
• Free tools: https://allaiber.com
• Subscribe: https://youtube.com

#${topic.replace(/\s+/g,'')} #tutorial #2025

👍 Like, comment, and subscribe for more ${topic} content!
`)
  }
  return (
    <div className="space-y-4">
      <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Video topic" className="w-full h-12 px-4 rounded-2xl border"/>
      <Button onClick={gen} variant="accent">Generate Description</Button>
      {desc && (
        <div className="p-4 rounded-2xl bg-muted border">
          <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded-xl min-h-[200px]">{desc}</pre>
          <Button className="mt-3" variant="outline" onClick={()=>copyToClipboard(desc)}>Copy Description</Button>
        </div>
      )}
    </div>
  )
}
