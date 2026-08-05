"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function QrGeneratorTool(){
  const [text,setText]=useState("https://allaiber.com")
  const [size,setSize]=useState(256)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Enter URL or text" className="w-full h-12 px-4 rounded-2xl border focus:ring-2 focus:ring-accent/50 outline-none"/>
          <div>
            <label className="text-sm font-medium">Size: {size}px</label>
            <input type="range" min={128} max={512} step={32} value={size} onChange={e=>setSize(parseInt(e.target.value))} className="w-full mt-2"/>
          </div>
          <Button variant="accent" onClick={()=>window.open(qrUrl,'_blank')} className="w-full">Download QR</Button>
          <div className="text-xs text-muted-foreground">QR generated via QRServer API. Works offline after generating.</div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-2xl border">
          {text ? <img src={qrUrl} alt="QR Code" className="rounded-xl bg-white p-2 shadow-soft"/> : <div className="text-sm opacity-50">Enter text to generate</div>}
          <div className="mt-3 text-xs break-all text-center opacity-60 max-w-[200px]">{text}</div>
        </div>
      </div>
    </div>
  )
}
