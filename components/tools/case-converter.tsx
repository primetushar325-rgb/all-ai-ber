"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function CaseConverterTool(){
  const [text,setText]=useState("")
  const toUpper = text.toUpperCase()
  const toLower = text.toLowerCase()
  const toTitle = text.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())
  const toSentence = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,c=>c.toUpperCase())
  const toAlt = text.split('').map((c,i)=>i%2?c.toLowerCase():c.toUpperCase()).join('')
  const toInverse = text.split('').map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join('')
  const cards = [
    {label:'UPPERCASE', value:toUpper},
    {label:'lowercase', value:toLower},
    {label:'Title Case', value:toTitle},
    {label:'Sentence case', value:toSentence},
    {label:'aLtErNaTiNg', value:toAlt},
    {label:'InVeRsE', value:toInverse},
  ]
  return (
    <div className="space-y-5">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter text to convert..." className="w-full min-h-[140px] p-4 rounded-2xl border focus:ring-2 focus:ring-accent/50 outline-none"/>
      <div className="grid md:grid-cols-2 gap-3">
        {cards.map(cd=>(
          <div key={cd.label} className="p-4 rounded-2xl bg-white border">
            <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold tracking-wider opacity-60">{cd.label}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(cd.value)}>Copy</Button></div>
            <div className="text-sm bg-muted p-3 rounded-xl min-h-[50px] break-words">{cd.value||<span className="opacity-30">Result</span>}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
