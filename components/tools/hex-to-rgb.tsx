"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function HexToRgbTool(){
  const [hex,setHex]=useState("#facc15")
  const [rgb,setRgb]=useState("250, 204, 21")
  const hexToRgb=(h:string)=>{
    const r=parseInt(h.slice(1,3),16)
    const g=parseInt(h.slice(3,5),16)
    const b=parseInt(h.slice(5,7),16)
    setRgb(`${r}, ${g}, ${b}`)
  }
  const rgbToHex=(r:string)=>{
    try{
      const [a,b,c]=r.split(',').map(x=>parseInt(x.trim()))
      const toHex=(n:number)=>n.toString(16).padStart(2,'0')
      setHex(`#${toHex(a)}${toHex(b)}${toHex(c)}`)
    }catch{}
  }
  return (
    <div className="space-y-5 max-w-md">
      <div className="flex gap-2">
        <input value={hex} onChange={e=>{setHex(e.target.value); if(e.target.value.length===7) hexToRgb(e.target.value)}} className="flex-1 h-12 px-4 rounded-2xl border font-mono"/>
        <div className="h-12 w-12 rounded-xl border" style={{background:hex}}/>
      </div>
      <input value={rgb} onChange={e=>{setRgb(e.target.value); rgbToHex(e.target.value)}} placeholder="R, G, B" className="w-full h-12 px-4 rounded-2xl border font-mono"/>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={()=>copyToClipboard(hex)}>Copy HEX</Button>
        <Button variant="outline" onClick={()=>copyToClipboard(`rgb(${rgb})`)}>Copy RGB</Button>
      </div>
    </div>
  )
}
