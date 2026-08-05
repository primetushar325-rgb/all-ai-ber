"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function UuidGeneratorTool(){
  const [uuids,setUuids]=useState<string[]>([crypto.randomUUID()])
  const gen=()=>setUuids(Array(5).fill(0).map(()=>crypto.randomUUID()))
  const genOne=()=>setUuids([crypto.randomUUID(),...uuids].slice(0,10))
  return (
    <div className="space-y-4">
      <div className="flex gap-2"><Button variant="accent" onClick={gen}>Generate 5</Button><Button variant="outline" onClick={genOne}>Add One</Button></div>
      <div className="space-y-2">
        {uuids.map(u=>(
          <div key={u} className="flex justify-between items-center p-3 bg-muted rounded-xl font-mono text-sm"><span className="truncate">{u}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(u)}>Copy</Button></div>
        ))}
      </div>
    </div>
  )
}
