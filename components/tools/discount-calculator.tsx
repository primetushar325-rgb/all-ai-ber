"use client"
import { useState } from "react"
export default function DiscountCalculatorTool(){
  const [price,setPrice]=useState(100)
  const [discount,setDiscount]=useState(20)
  const saved= price*discount/100
  const final= price - saved
  return (
    <div className="space-y-5 max-w-md">
      <input type="number" value={price} onChange={e=>setPrice(parseFloat(e.target.value)||0)} placeholder="Original Price" className="w-full h-12 px-4 rounded-2xl border"/>
      <div><label className="text-sm">Discount: {discount}%</label><input type="range" min={0} max={90} value={discount} onChange={e=>setDiscount(parseInt(e.target.value))} className="w-full"/></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center"><div className="text-xs text-green-700">You Save</div><div className="text-xl font-bold">${saved.toFixed(2)}</div></div>
        <div className="p-4 bg-foreground text-white rounded-2xl text-center"><div className="text-xs opacity-70">Final Price</div><div className="text-xl font-bold">${final.toFixed(2)}</div></div>
      </div>
    </div>
  )
}
