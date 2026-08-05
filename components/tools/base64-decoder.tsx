"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function Base64DecoderTool(){
  const [input,setInput]=useState("")
  const [output,setOutput]=useState("")
  const [err,setErr]=useState("")
  const decode=()=>{
    try{ setOutput(decodeURIComponent(escape(atob(input)))); setErr("") }catch(e:any){ setErr("Invalid Base64"); setOutput("") }
  }
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter Base64 to decode..." className="w-full min-h-[120px] p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-accent/50 font-mono text-sm"/>
      <Button onClick={decode} variant="accent">Decode Base64</Button>
      {err && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm">{err}</div>}
      {output && (
        <div className="p-4 rounded-2xl bg-muted border break-all text-sm">
          {output}
          <Button size="sm" className="mt-3" variant="outline" onClick={()=>copyToClipboard(output)}>Copy</Button>
        </div>
      )}
    </div>
  )
}
