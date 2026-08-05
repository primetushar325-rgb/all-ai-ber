"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function JsonFormatterTool(){
  const [input,setInput]=useState('{"name":"All Ai Ber","tools":100,"free":true}')
  const [output,setOutput]=useState("")
  const [error,setError]=useState("")
  const format=()=>{
    try{
      const parsed=JSON.parse(input)
      setOutput(JSON.stringify(parsed,null,2))
      setError("")
    }catch(e:any){ setError(e.message); setOutput("") }
  }
  const minify=()=>{
    try{
      const parsed=JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError("")
    }catch(e:any){ setError(e.message) }
  }
  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full min-h-[140px] p-4 rounded-2xl border font-mono text-sm focus:ring-2 focus:ring-accent/50 outline-none"/>
      <div className="flex gap-2 flex-wrap">
        <Button onClick={format} variant="accent">Beautify</Button>
        <Button onClick={minify} variant="outline">Minify</Button>
        <Button onClick={()=>{setInput("");setOutput("")}} variant="ghost">Clear</Button>
      </div>
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
      {output && (
        <div>
          <div className="flex justify-between items-center mb-2"><span className="text-sm font-semibold">Output</span><Button size="sm" variant="outline" onClick={()=>copyToClipboard(output)}>Copy</Button></div>
          <pre className="w-full min-h-[200px] p-4 rounded-2xl bg-foreground text-white overflow-auto text-sm">{output}</pre>
        </div>
      )}
    </div>
  )
}
