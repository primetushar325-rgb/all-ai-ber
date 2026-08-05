"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function UrlEncoderTool(){
  const [input,setInput]=useState("")
  const [enc,setEnc]=useState("")
  const [dec,setDec]=useState("")
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter URL or text..." className="w-full min-h-[100px] p-4 rounded-2xl border"/>
      <div className="flex gap-2">
        <Button variant="accent" onClick={()=>setEnc(encodeURIComponent(input))}>Encode</Button>
        <Button variant="outline" onClick={()=>{try{setDec(decodeURIComponent(input))}catch{setDec("Invalid encoded URL")}}}>Decode</Button>
      </div>
      {enc && <div className="p-3 bg-muted rounded-xl break-all font-mono text-sm"><div className="text-xs font-bold mb-1">Encoded:</div>{enc}<Button size="sm" className="mt-2" variant="ghost" onClick={()=>copyToClipboard(enc)}>Copy</Button></div>}
      {dec && <div className="p-3 bg-muted rounded-xl break-all"><div className="text-xs font-bold mb-1">Decoded:</div>{dec}</div>}
    </div>
  )
}
