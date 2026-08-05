"use client"
import { useState } from "react"
import { Button } from "../ui/button"
const units:Record<string,any>={
  length:{m:1,km:0.001,cm:100,mm:1000,ft:3.28084,in:39.3701,mile:0.000621371},
  weight:{kg:1,g:1000,lb:2.20462,oz:35.274},
  temp:{c:'c',f:'f',k:'k'},
}
export default function UnitConverterTool(){
  const [category,setCategory]=useState<'length'|'weight'|'temp'>('length')
  const [from,setFrom]=useState('m')
  const [to,setTo]=useState('km')
  const [val,setVal]=useState(1)
  const convert=()=>{
    if(category==='temp'){
      let c=val
      if(from==='f') c=(val-32)*5/9
      if(from==='k') c=val-273.15
      if(to==='f') return c*9/5+32
      if(to==='k') return c+273.15
      return c
    }else{
      const base = val / (units[category][from] ) * (category==='length'?1:1) // Actually m base
      // simpler: val in base unit = val / factor? Let's do base = val / (units[category][from] relative to base? Let's fix)
      // For generic: we stored factor to convert 1 base to that unit. So to get base: val / factorBase->target? We need invert.
      // Define: units[cat][unit] = how many of that unit per 1 base. So base = val / factorFrom
      const baseUnit = Object.keys(units[category])[0]
      const baseVal = category==='length'? (from==='m'?val: val / units[category][from]) : (from==='kg'?val: val / units[category][from])
      if(category==='length'){
        if(to==='m') return baseVal
        return baseVal * units[category][to]
      }else{
        if(to==='kg') return baseVal
        return baseVal * units[category][to]
      }
    }
  }
  // Simplified for demo
  const simpleConvert=()=>{
    if(category==='temp'){
      let c=val
      if(from==='f') c=(val-32)*5/9
      if(from==='k') c=val-273.15
      if(to==='f') return c*9/5+32
      if(to==='k') return c+273.15
      return c
    }
    // length base m
    if(category==='length'){
      const toM:any={m:1,km:1000,cm:0.01,mm:0.001,ft:0.3048,in:0.0254,mile:1609.34}
      const inM = val * toM[from]
      return inM / toM[to]
    }
    if(category==='weight'){
      const toKg:any={kg:1,g:0.001,lb:0.453592,oz:0.0283495}
      const inKg = val * toKg[from]
      return inKg / toKg[to]
    }
    return val
  }
  const res = simpleConvert()
  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex gap-2">
        {(['length','weight','temp'] as const).map(c=>(
          <button key={c} onClick={()=>{setCategory(c); const ks=Object.keys(units[c]); setFrom(ks[0]); setTo(ks[1]||ks[0])}} className={`px-4 py-2 rounded-full text-sm capitalize border ${category===c?'bg-foreground text-white':'bg-white'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
        <div className="space-y-2"><input type="number" value={val} onChange={e=>setVal(parseFloat(e.target.value)||0)} className="w-full h-12 px-4 rounded-2xl border"/><select value={from} onChange={e=>setFrom(e.target.value)} className="w-full h-10 px-3 rounded-xl border text-sm">{Object.keys(units[category]).map(u=><option key={u} value={u}>{u.toUpperCase()}</option>)}</select></div>
        <div className="text-xl">=</div>
        <div className="space-y-2"><div className="h-12 px-4 rounded-2xl border bg-muted flex items-center font-bold">{res.toFixed(4).replace(/\.?0+$/,'')}</div><select value={to} onChange={e=>setTo(e.target.value)} className="w-full h-10 px-3 rounded-xl border text-sm">{Object.keys(units[category]).map(u=><option key={u} value={u}>{u.toUpperCase()}</option>)}</select></div>
      </div>
    </div>
  )
}
