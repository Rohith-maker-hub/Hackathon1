"use client";

import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { MOCK_AGENTS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Activity, ShieldCheck, Zap } from "lucide-react"

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Agents</h1>
        <p className="text-muted-foreground text-sm">Manage your specialized workforce of autonomous agents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {MOCK_AGENTS.map((agent) => (
          <GlassCard key={agent.id} className="p-6 flex flex-col hover:border-primary/50 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={agent.avatar} />
                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                </div>
              </div>
              <Badge variant="outline" className={
                agent.status === 'running' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                agent.status === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                agent.status === 'completed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                'bg-gray-500/10 text-gray-400 border-gray-500/20'
              }>
                {agent.status === 'running' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />}
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </Badge>
            </div>

            {agent.status === 'running' && agent.currentTask && (
              <div className="mb-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                <div className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Current Task
                </div>
                <div className="text-sm font-medium truncate">{agent.currentTask}</div>
              </div>
            )}

            <div className="space-y-4 mb-6 flex-1 mt-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3 h-3" /> Performance</span>
                  <span className="font-medium">{agent.performance}%</span>
                </div>
                <Progress value={agent.performance} className="h-1.5 bg-muted/50" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Health</span>
                  <span className="font-medium">{agent.health}%</span>
                </div>
                <Progress value={agent.health} className="h-1.5 bg-muted/50" />
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 mt-auto">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2">Recent Activity</h4>
              <ul className="space-y-1.5">
                {agent.recentActivity.slice(0, 2).map((activity, i) => (
                  <li key={i} className="text-xs truncate text-muted-foreground/80 flex items-center gap-2 before:content-[''] before:block before:w-1 before:h-1 before:rounded-full before:bg-primary/50">
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
