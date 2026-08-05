"use client"
import { useState } from "react"
import { Button } from "../ui/button"
export default function ImageResizerTool(){
  const [file,setFile]=useState<File|null>(null)
  const [preview,setPreview]=useState("")
  const [width,setWidth]=useState(800)
  const [height,setHeight]=useState(600)
  const [result,setResult]=useState("")
  const handleFile=(e:any)=>{
    const f=e.target.files?.[0]
    if(!f) return
    setFile(f)
    const url=URL.createObjectURL(f)
    setPreview(url)
    const img=new Image()
    img.onload=()=>{ setWidth(img.width); setHeight(img.height) }
    img.src=url
  }
  const resize=()=>{
    if(!preview) return
    const img=new Image()
    img.onload=()=>{
      const canvas=document.createElement('canvas')
      canvas.width=width
      canvas.height=height
      const ctx=canvas.getContext('2d')!
      ctx.drawImage(img,0,0,width,height)
      setResult(canvas.toDataURL('image/png'))
    }
    img.src=preview
  }
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="w-full p-3 border rounded-2xl bg-white"/>
      {preview && (
        <>
          <div className="flex gap-3">
            <input type="number" value={width} onChange={e=>setWidth(parseInt(e.target.value)||0)} placeholder="Width" className="h-12 w-1/2 px-4 rounded-2xl border"/>
            <input type="number" value={height} onChange={e=>setHeight(parseInt(e.target.value)||0)} placeholder="Height" className="h-12 w-1/2 px-4 rounded-2xl border"/>
          </div>
          <Button onClick={resize} variant="accent">Resize Image</Button>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-2xl p-2 bg-white"><img src={preview} className="w-full rounded-xl"/></div>
            {result && <div className="border rounded-2xl p-2 bg-white"><img src={result} className="w-full rounded-xl"/><a href={result} download="resized.png"><Button size="sm" className="mt-2" variant="outline">Download</Button></a></div>}
          </div>
        </>
      )}
    </div>
  )
}
