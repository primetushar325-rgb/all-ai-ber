"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function ColorPickerTool(){
  const [color,setColor]=useState("#facc15")
  const hexToRgb=(hex:string)=>{
    const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16)
    return `rgb(${r}, ${g}, ${b})`
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="h-32 w-full md:w-32 rounded-2xl cursor-pointer"/>
        <div className="flex-1 space-y-3">
          <div className="h-24 rounded-2xl border shadow-inner" style={{background:color}}/>
          <div className="grid grid-cols-1 gap-2">
            {[
              {label:'HEX', value:color},
              {label:'RGB', value:hexToRgb(color)},
            ].map(i=>(
              <div key={i.label} className="flex justify-between items-center p-3 bg-muted rounded-xl"><span className="text-sm font-bold">{i.label}</span><span className="font-mono text-sm">{i.value}</span><Button size="sm" variant="ghost" onClick={()=>copyToClipboard(i.value)}>Copy</Button></div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
        {['#facc15','#ef4444','#22c55e','#3b82f6','#a855f7','#ec4899','#000000','#ffffff','#f97316','#06b6d4','#84cc16','#eab308'].map(c=>(
          <button key={c} onClick={()=>setColor(c)} className="h-10 rounded-xl border shadow-sm" style={{background:c}}/>
        ))}
      </div>
    </div>
  )
}
