"use client"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function PasswordGeneratorTool(){
  const [length,setLength]=useState(16)
  const [opts,setOpts]=useState({upper:true,lower:true,numbers:true,symbols:true})
  const [pwd,setPwd]=useState("")
  const generate=()=>{
    let chars=""
    if(opts.upper) chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(opts.lower) chars+="abcdefghijklmnopqrstuvwxyz"
    if(opts.numbers) chars+="0123456789"
    if(opts.symbols) chars+="!@#$%^&*()_+-=[]{}|;:,.<>?"
    if(!chars) return
    let p=""
    for(let i=0;i<length;i++) p+=chars[Math.floor(Math.random()*chars.length)]
    setPwd(p)
  }
  useEffect(()=>{generate()},[])
  return (
    <div className="space-y-6 max-w-xl">
      <div className="p-4 rounded-2xl bg-foreground text-white font-mono text-lg flex justify-between items-center break-all">
        <span>{pwd}</span>
        <Button size="sm" variant="glass" onClick={()=>copyToClipboard(pwd)}>Copy</Button>
      </div>
      <div>
        <label className="text-sm font-medium">Length: {length}</label>
        <input type="range" min={6} max={64} value={length} onChange={e=>{setLength(parseInt(e.target.value));}} className="w-full"/>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries({upper:"Uppercase (A-Z)",lower:"Lowercase (a-z)",numbers:"Numbers (0-9)",symbols:"Symbols (!@#$)"}).map(([k,label])=>(
          <label key={k} className="flex items-center gap-2 p-3 rounded-xl border bg-white cursor-pointer">
            <input type="checkbox" checked={(opts as any)[k]} onChange={e=>setOpts({...opts,[k]:e.target.checked})} className="rounded"/>
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
      <Button onClick={generate} variant="accent" className="w-full">Generate Password</Button>
      <div className="text-xs p-3 bg-accent/10 rounded-xl">Strength: <span className="font-bold">{length<10?'Weak':length<16?'Medium':'Strong'}</span></div>
    </div>
  )
}
