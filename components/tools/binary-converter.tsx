"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function BinaryConverterTool(){
  const [text,setText]=useState("Hello")
  const [binary,setBinary]=useState("")
  const toBin=()=> setBinary(text.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' '))
  const toText=()=>{
    try{
      const decoded=binary.split(' ').map(b=>String.fromCharCode(parseInt(b,2))).join('')
      setText(decoded)
    }catch{}
  }
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Text" className="w-full min-h-[80px] p-4 rounded-2xl border"/>
      <div className="flex gap-2"><Button variant="accent" onClick={toBin}>Text → Binary</Button><Button variant="outline" onClick={toText}>Binary → Text</Button></div>
      <textarea value={binary} onChange={e=>setBinary(e.target.value)} placeholder="Binary" className="w-full min-h-[100px] p-4 rounded-2xl border font-mono text-sm"/>
      {binary && <Button size="sm" variant="ghost" onClick={()=>copyToClipboard(binary)}>Copy Binary</Button>}
    </div>
  )
}
