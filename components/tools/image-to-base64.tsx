"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function ImageToBase64Tool(){
  const [b64,setB64]=useState("")
  const handle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0]
    if(!f) return
    const r=new FileReader()
    r.onload=()=>setB64(r.result as string)
    r.readAsDataURL(f)
  }
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handle} className="w-full p-3 border rounded-2xl bg-white"/>
      {b64 && (
        <div className="space-y-3">
          <img src={b64} className="max-w-sm rounded-2xl border"/>
          <textarea value={b64} readOnly className="w-full min-h-[120px] p-3 rounded-2xl border bg-muted font-mono text-xs break-all"/>
          <Button variant="outline" onClick={()=>copyToClipboard(b64)}>Copy Base64</Button>
        </div>
      )}
    </div>
  )
}
