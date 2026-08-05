"use client"
import { useState, useMemo } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function WordCounterTool() {
  const [text, setText] = useState("")
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length
    const readingTime = Math.ceil(words / 200)
    const speakingTime = Math.ceil(words / 130)
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime }
  }, [text])
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste your text here..." className="w-full min-h-[200px] p-4 rounded-2xl border bg-white focus:ring-2 focus:ring-accent/50 focus:outline-none resize-y text-[15px] leading-relaxed" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {label:'Words', value:stats.words},
          {label:'Characters', value:stats.chars},
          {label:'Chars (no space)', value:stats.charsNoSpace},
          {label:'Sentences', value:stats.sentences},
          {label:'Paragraphs', value:stats.paragraphs},
          {label:'Reading', value:`${stats.readingTime} min`},
          {label:'Speaking', value:`${stats.speakingTime} min`},
          {label:'Keywords', value:stats.words>0? Math.ceil(stats.words*0.05):0},
        ].map(s=>(
          <div key={s.label} className="p-4 rounded-2xl bg-muted border text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={()=>copyToClipboard(text)} variant="outline">Copy Text</Button>
        <Button onClick={()=>setText("")} variant="ghost">Clear</Button>
      </div>
    </div>
  )
}
