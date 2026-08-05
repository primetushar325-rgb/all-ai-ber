"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
const base="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
export default function LoremIpsumGeneratorTool(){
  const [paras,setParas]=useState(3)
  const [text,setText]=useState(Array(3).fill(base).join('\n\n'))
  const gen=()=>{ setText(Array(paras).fill(base).join('\n\n')) }
  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center"><label className="text-sm">Paragraphs:</label><input type="number" min={1} max={20} value={paras} onChange={e=>setParas(parseInt(e.target.value)||1)} className="h-10 w-20 px-3 rounded-xl border"/><Button variant="accent" onClick={gen}>Generate</Button></div>
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full min-h-[200px] p-4 rounded-2xl border"/>
      <Button variant="outline" onClick={()=>copyToClipboard(text)}>Copy Text</Button>
    </div>
  )
}
