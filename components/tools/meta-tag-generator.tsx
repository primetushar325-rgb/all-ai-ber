"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
export default function MetaTagGeneratorTool(){
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [keywords,setKeywords]=useState("")
  const [url,setUrl]=useState("")
  const tags=`<title>${title}</title>
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />`
  return (
    <div className="space-y-4">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Page Title" className="w-full h-12 px-4 rounded-2xl border"/>
      <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Meta Description" className="w-full h-12 px-4 rounded-2xl border"/>
      <input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="Keywords comma separated" className="w-full h-12 px-4 rounded-2xl border"/>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Canonical URL" className="w-full h-12 px-4 rounded-2xl border"/>
      <pre className="w-full min-h-[180px] p-4 rounded-2xl bg-foreground text-white text-xs overflow-auto whitespace-pre-wrap">{tags}</pre>
      <Button variant="outline" onClick={()=>copyToClipboard(tags)}>Copy Meta Tags</Button>
    </div>
  )
}
