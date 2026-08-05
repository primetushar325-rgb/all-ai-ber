"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function ImageCompressorTool(){
  const [file,setFile]=useState<File|null>(null)
  const [preview,setPreview]=useState("")
  const [compressed,setCompressed]=useState("")
  const [stats,setStats]=useState<any>(null)
  const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0]
    if(!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    // Simulate compression
    const img=new Image()
    img.onload=()=>{
      const canvas=document.createElement('canvas')
      canvas.width=img.width*0.8
      canvas.height=img.height*0.8
      const ctx=canvas.getContext('2d')!
      ctx.drawImage(img,0,0,canvas.width,canvas.height)
      const data=canvas.toDataURL('image/jpeg',0.7)
      setCompressed(data)
      setStats({original:(f.size/1024).toFixed(1), compressed:(data.length*0.75/1024).toFixed(1)})
    }
    img.src=URL.createObjectURL(f)
  }
  return (
    <div className="space-y-6">
      <input type="file" accept="image/*" onChange={handleFile} className="w-full p-3 border rounded-2xl bg-white"/>
      {preview && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-2xl bg-white"><div className="text-xs font-bold mb-2">Original</div><img src={preview} className="w-full rounded-xl"/><div className="text-xs mt-2">{stats?.original} KB</div></div>
          <div className="p-3 border rounded-2xl bg-white"><div className="text-xs font-bold mb-2">Compressed (70% quality, 80% size)</div>{compressed && <><img src={compressed} className="w-full rounded-xl"/><div className="text-xs mt-2">{stats?.compressed} KB - Saved {stats?((1-parseFloat(stats.compressed)/parseFloat(stats.original))*100).toFixed(0):0}%</div><a href={compressed} download="compressed.jpg" className="mt-3 inline-block"><Button size="sm" variant="accent">Download</Button></a></>}</div>
        </div>
      )}
    </div>
  )
}
