"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function TextToSpeechTool(){
  const [text,setText]=useState("Hello! Welcome to All Ai Ber - World's best free tools platform.")
  const [rate,setRate]=useState(1)
  const speak=()=>{
    if('speechSynthesis' in window){
      const u=new SpeechSynthesisUtterance(text)
      u.rate=rate
      speechSynthesis.speak(u)
    }
  }
  const stop=()=>speechSynthesis.cancel()
  return (
    <div className="space-y-4 max-w-xl">
      <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full min-h-[140px] p-4 rounded-2xl border"/>
      <div><label className="text-sm">Speed: {rate}</label><input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={e=>setRate(parseFloat(e.target.value))} className="w-full"/></div>
      <div className="flex gap-2"><Button variant="accent" onClick={speak}>🔊 Speak</Button><Button variant="outline" onClick={stop}>Stop</Button></div>
      <div className="text-xs text-muted-foreground p-3 bg-muted rounded-xl">Uses browser's SpeechSynthesis API - 50+ voices available depending on your device.</div>
    </div>
  )
}
