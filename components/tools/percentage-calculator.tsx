"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function PercentageCalculatorTool(){
  const [a,setA]=useState(20)
  const [b,setB]=useState(100)
  const result = (a/100)*b
  const increase = b + result
  const decrease = b - result
  return (
    <div className="space-y-6 max-w-lg">
      <div className="grid grid-cols-3 gap-3 items-center">
        <input type="number" value={a} onChange={e=>setA(parseFloat(e.target.value)||0)} className="h-12 px-4 rounded-2xl border col-span-1"/><span className="text-center">% of</span><input type="number" value={b} onChange={e=>setB(parseFloat(e.target.value)||0)} className="h-12 px-4 rounded-2xl border col-span-1"/>
      </div>
      <div className="p-6 rounded-2xl bg-foreground text-white text-center">
        <div className="text-sm opacity-60">{a}% of {b} is</div>
        <div className="text-4xl font-bold mt-1">{result}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-green-50 rounded-2xl text-center border border-green-100"><div className="text-xs text-green-700">Increase</div><div className="text-xl font-bold">{increase}</div></div>
        <div className="p-4 bg-red-50 rounded-2xl text-center border border-red-100"><div className="text-xs text-red-700">Decrease</div><div className="text-xl font-bold">{decrease}</div></div>
      </div>
      <div className="text-xs text-muted-foreground p-3 bg-muted rounded-xl">Formula: (Percentage/100) × Number = Result. Useful for discounts, tips, interest.</div>
    </div>
  )
}
