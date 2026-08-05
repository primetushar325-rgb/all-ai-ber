"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function AgeCalculatorTool(){
  const [dob,setDob]=useState("2000-01-01")
  const [result,setResult]=useState<any>(null)
  const calc=()=>{
    const birth=new Date(dob)
    const now=new Date()
    let years=now.getFullYear()-birth.getFullYear()
    let months=now.getMonth()-birth.getMonth()
    let days=now.getDate()-birth.getDate()
    if(days<0){ months--; days+=new Date(now.getFullYear(),now.getMonth(),0).getDate() }
    if(months<0){ years--; months+=12 }
    const totalDays=Math.floor((now.getTime()-birth.getTime())/(1000*60*60*24))
    setResult({years,months,days,totalDays, nextBirthday:new Date(now.getFullYear()+(now>new Date(now.getFullYear(),birth.getMonth(),birth.getDate())?1:0),birth.getMonth(),birth.getDate())})
  }
  return (
    <div className="space-y-6 max-w-md">
      <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full h-12 px-4 rounded-2xl border"/>
      <Button onClick={calc} variant="accent" className="w-full">Calculate Age</Button>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-muted rounded-2xl text-center"><div className="text-2xl font-bold">{result.years}</div><div className="text-xs">Years</div></div>
          <div className="p-4 bg-muted rounded-2xl text-center"><div className="text-2xl font-bold">{result.months}</div><div className="text-xs">Months</div></div>
          <div className="p-4 bg-muted rounded-2xl text-center"><div className="text-2xl font-bold">{result.days}</div><div className="text-xs">Days</div></div>
          <div className="col-span-3 p-4 bg-foreground text-white rounded-2xl text-center"><div className="text-sm opacity-70">Total Days Lived</div><div className="text-2xl font-bold">{result.totalDays.toLocaleString()}</div></div>
        </div>
      )}
    </div>
  )
}
