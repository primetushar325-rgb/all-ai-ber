"use client"
import { useState, useMemo } from "react"
import { Button } from "../ui/button"
export default function CharacterCounterTool(){
  const [text,setText] = useState("")
  const c = useMemo(()=>({
    withSpace:text.length,
    withoutSpace:text.replace(/\s/g,'').length,
    words:text.trim()?text.trim().split(/\s+/).length:0,
    lines:text.split('\n').length,
    tweets: Math.ceil(text.length/280),
    remaining: 280 - (text.length % 280 || 280)
  }),[text])
  return (
    <div className="space-y-6">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type here..." className="w-full min-h-[180px] p-4 rounded-2xl border focus:ring-2 focus:ring-accent/50 outline-none"/>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {k:'With Spaces', v:c.withSpace},
          {k:'Without Spaces', v:c.withoutSpace},
          {k:'Words', v:c.words},
          {k:'Lines', v:c.lines},
          {k:'Tweets', v:c.tweets},
          {k:'Remaining (Twitter)', v:c.remaining},
        ].map(i=>(
          <div key={i.k} className="p-4 bg-muted rounded-2xl text-center"><div className="text-xl font-bold">{i.v}</div><div className="text-xs text-muted-foreground mt-1">{i.k}</div></div>
        ))}
      </div>
      <Button variant="outline" onClick={()=>setText("")}>Clear</Button>
    </div>
  )
}
