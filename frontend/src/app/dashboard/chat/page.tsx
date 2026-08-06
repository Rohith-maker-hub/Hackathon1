"use client";

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { MOCK_CHAT_HISTORY, MOCK_AGENTS } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Mic, Image as ImageIcon, Bot, Search, PlusCircle, MoreVertical, Sparkles } from "lucide-react"

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-100px)] -m-4 md:-m-6 lg:-m-8">
      {/* Chat Sidebar */}
      <div className="w-80 border-r border-border/50 bg-background/50 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold">Conversations</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8"><PlusCircle className="w-4 h-4" /></Button>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9 bg-background/50" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {["Market Research Q3", "Bug Triage Assistant", "Onboarding Flow Setup", "General Assistance"].map((conv, i) => (
            <div key={i} className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${i === 0 ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'}`}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{conv}</p>
                <p className="text-xs text-muted-foreground truncate">{i === 0 ? "I've tasked Spark with..." : "Click to view"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background/30 relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">Market Research Q3</h2>
            <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground font-medium">4 Agents Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Bot className="w-4 h-4" /> Add Agent
            </Button>
            <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MOCK_CHAT_HISTORY.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <Avatar className="h-8 w-8 mt-1 border border-border/50 shrink-0">
                {msg.role === 'assistant' ? (
                  <AvatarImage src={MOCK_AGENTS.find(a => a.id === msg.agentId)?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=system"} />
                ) : (
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                )}
                <AvatarFallback>{msg.role === 'assistant' ? 'AI' : 'US'}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {msg.role === 'assistant' ? MOCK_AGENTS.find(a => a.id === msg.agentId)?.name || 'System' : 'You'}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">{msg.timestamp}</span>
                </div>
                <GlassCard className={`p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground border-primary/20' : 'bg-card'}`}>
                  {msg.content.split('\n').map((line, i) => {
                    if (line.startsWith('1. ') || line.startsWith('2. ')) {
                      return <li key={i} className="ml-4">{line.substring(3).replace(/\*\*/g, '')}</li>
                    }
                    if (line.trim() === '') return <br key={i} />
                    return <p key={i}>{line.replace(/\*\*/g, '')}</p>
                  })}
                </GlassCard>
                {msg.role === 'assistant' && msg.id === 'msg-4' && (
                  <div className="mt-2 flex gap-2">
                    <div className="px-3 py-1.5 rounded-md bg-muted border border-border/50 text-xs flex items-center gap-2 hover:bg-muted/80 cursor-pointer transition-colors">
                      <Sparkles className="w-3 h-3 text-primary" /> View Draft
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          <div className="flex gap-4 max-w-3xl">
            <Avatar className="h-8 w-8 mt-1 border border-border/50 shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=Spark" />
            </Avatar>
            <div className="flex flex-col items-start">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">Spark</span>
                </div>
                <GlassCard className="p-4 bg-card w-20 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                </GlassCard>
            </div>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 pb-2 flex gap-2 overflow-x-auto">
          {["Summarize the latest report", "Check marketing campaign status", "Draft an email to the team"].map((prompt, i) => (
            <button key={i} className="px-3 py-1.5 rounded-full border border-border/50 bg-background/50 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground whitespace-nowrap transition-colors">
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2 bg-background/50 backdrop-blur-sm">
          <GlassCard className="p-2 flex items-end gap-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <div className="flex gap-1 pb-1 px-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Paperclip className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><ImageIcon className="w-4 h-4" /></Button>
            </div>
            <textarea 
              className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none resize-none focus:outline-none p-2 text-sm"
              placeholder="Ask FlowMind AI or assign a task..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
            />
            <div className="flex gap-1 pb-1 px-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Mic className="w-4 h-4" /></Button>
              <Button size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"><Send className="w-4 h-4 ml-0.5" /></Button>
            </div>
          </GlassCard>
          <div className="text-center mt-2 text-[10px] text-muted-foreground">
            FlowMind AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  )
}
