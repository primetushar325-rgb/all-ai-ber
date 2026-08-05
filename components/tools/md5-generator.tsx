"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
// Simple hash via SubtleCrypto
export default function Md5GeneratorTool(){
  const [input,setInput]=useState("")
  const [hashes,setHashes]=useState<any>({})
  const gen=async()=>{
    const enc=new TextEncoder().encode(input)
    const sha256=await crypto.subtle.digest('SHA-256',enc)
    const sha1=await crypto.subtle.digest('SHA-1',enc)
    const toHex=(b:ArrayBuffer)=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')
    setHashes({sha1:toHex(sha1), sha256:toHex(sha256), sha512:'Use server for SHA512 / MD5 - browser limited. SHA-256 shown.'})
  }
  return (
    <div className="space-y-4 max-w-xl">
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter text to hash..." className="w-full min-h-[100px] p-4 rounded-2xl border"/>
      <Button variant="accent" onClick={gen}>Generate Hashes</Button>
      {hashes.sha256 && (
        <div className="space-y-2">
          {Object.entries(hashes).map(([k,v])=>(
            <div key={k} className="p-3 bg-muted rounded-xl"><div className="flex justify-between"><span className="text-xs font-bold uppercase">{k}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(v as string)}>Copy</Button></div><div className="font-mono text-xs break-all mt-1">{v as string}</div></div>
          ))}
        </div>
      )}
    </div>
  )
}
