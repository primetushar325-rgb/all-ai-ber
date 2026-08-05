"use client"
import { useState, useMemo } from "react"
import { Button } from "../ui/button"
export default function LoanCalculatorTool(){
  const [amount,setAmount]=useState(100000)
  const [rate,setRate]=useState(8.5)
  const [years,setYears]=useState(5)
  const calc=useMemo(()=>{
    const r=rate/12/100
    const n=years*12
    const emi = (amount * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
    const total = emi * n
    const interest = total - amount
    return {emi, total, interest}
  },[amount,rate,years])
  return (
    <div className="space-y-5 max-w-lg">
      <div><label className="text-sm font-medium">Loan Amount: ${amount.toLocaleString()}</label><input type="range" min={1000} max={1000000} step={1000} value={amount} onChange={e=>setAmount(parseInt(e.target.value))} className="w-full"/></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm">Interest: {rate}%</label><input type="range" min={1} max={20} step={0.1} value={rate} onChange={e=>setRate(parseFloat(e.target.value))} className="w-full"/></div>
        <div><label className="text-sm">Years: {years}</label><input type="range" min={1} max={30} value={years} onChange={e=>setYears(parseInt(e.target.value))} className="w-full"/></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-foreground text-white rounded-2xl text-center"><div className="text-xs opacity-60">EMI</div><div className="font-bold">${calc.emi.toFixed(0)}</div></div>
        <div className="p-4 bg-muted rounded-2xl text-center"><div className="text-xs">Interest</div><div className="font-bold">${calc.interest.toFixed(0)}</div></div>
        <div className="p-4 bg-muted rounded-2xl text-center"><div className="text-xs">Total</div><div className="font-bold">${calc.total.toFixed(0)}</div></div>
      </div>
    </div>
  )
}
