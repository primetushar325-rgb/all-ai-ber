"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { copyToClipboard } from "@/lib/utils"
const templates=[
  {name:"Blog Post Writer", prompt:"Write a detailed, SEO-optimized blog post about [TOPIC]. Include introduction, 5 main points with examples, conclusion and FAQs. Tone: {TONE}. Audience: {AUDIENCE}."},
  {name:"Midjourney Art", prompt:"Create a [STYLE] image of [SUBJECT], [DETAILS], ultra detailed, 8k, cinematic lighting, --ar 16:9 --v 6"},
  {name:"Coding Assistant", prompt:"Act as senior {LANGUAGE} developer. Explain and build {FEATURE} with clean, production-ready code. Include comments, error handling, and best practices."},
  {name:"YouTube Script", prompt:"Write an engaging YouTube script for video about [TOPIC]. Include hook (0-15s), intro, 3 main segments, call to action. Duration: {DURATION}. Tone: energetic."},
]
export default function AiPromptGeneratorTool(){
  const [topic,setTopic]=useState("")
  const [selected,setSelected]=useState(templates[0])
  const [custom,setCustom]=useState("")
  const gen = selected.prompt.replace("[TOPIC]",topic||"[YOUR TOPIC]").replace("{TONE}","professional").replace("{AUDIENCE}","beginners").replace("[SUBJECT]",topic||"subject").replace("[DETAILS]","highly detailed").replace("[STYLE]","photorealistic").replace("{LANGUAGE}","JavaScript").replace("{FEATURE}",topic||"feature").replace("{DURATION}","10 minutes")
  const finalPrompt = custom || gen
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {templates.map(t=>(
              <button key={t.name} onClick={()=>setSelected(t)} className={`text-left p-3 rounded-xl border text-sm ${selected.name===t.name?'bg-foreground text-white':'bg-white hover:bg-muted'}`}>{t.name}</button>
            ))}
          </div>
          <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Enter your topic / subject..." className="w-full h-12 px-4 rounded-2xl border"/>
          <textarea value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Or write custom prompt tweaks (optional)" className="w-full min-h-[80px] p-3 rounded-2xl border text-sm"/>
        </div>
        <div className="p-4 rounded-2xl bg-muted border">
          <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Generated Prompt</div>
          <div className="text-sm leading-relaxed bg-white p-4 rounded-xl min-h-[200px]">{finalPrompt}</div>
          <Button className="mt-3 w-full" variant="accent" onClick={()=>copyToClipboard(finalPrompt)}>Copy Prompt</Button>
        </div>
      </div>
    </div>
  )
}
