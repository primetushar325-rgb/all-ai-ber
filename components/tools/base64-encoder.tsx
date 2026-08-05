"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function Base64EncoderTool(){
  const [input,setInput]=useState("")
  const [output,setOutput]=useState("")
  const encode=()=>{ try{ setOutput(btoa(unescape(encodeURIComponent(input)))) }catch{ setOutput("Invalid input") } }
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter text to encode..." className="w-full min-h-[120px] p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-accent/50"/>
      <Button onClick={encode} variant="accent">Encode to Base64</Button>
      {output && (
        <div className="p-4 rounded-2xl bg-muted border break-all font-mono text-sm relative">
          {output}
          <Button size="sm" className="mt-3" variant="outline" onClick={()=>copyToClipboard(output)}>Copy</Button>
        </div>
      )}
    </div>
  )
}
