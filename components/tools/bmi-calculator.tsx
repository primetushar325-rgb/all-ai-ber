"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function BmiCalculatorTool(){
  const [h,setH]=useState(170)
  const [w,setW]=useState(70)
  const bmi = w / ((h/100)*(h/100))
  const cat = bmi<18.5?'Underweight': bmi<24.9?'Healthy': bmi<29.9?'Overweight':'Obese'
  return (
    <div className="space-y-5 max-w-md">
      <div><label className="text-sm">Height: {h} cm</label><input type="range" min={100} max={250} value={h} onChange={e=>setH(parseInt(e.target.value))} className="w-full"/></div>
      <div><label className="text-sm">Weight: {w} kg</label><input type="range" min={30} max={200} value={w} onChange={e=>setW(parseInt(e.target.value))} className="w-full"/></div>
      <div className="p-6 rounded-2xl bg-foreground text-white text-center"><div className="text-sm opacity-60">Your BMI</div><div className="text-4xl font-bold">{bmi.toFixed(1)}</div><div className="mt-2 px-3 py-1 bg-white/10 rounded-full inline-block text-sm">{cat}</div></div>
      <div className="text-xs p-3 bg-muted rounded-xl">Healthy BMI range: 18.5 - 24.9</div>
    </div>
  )
}
