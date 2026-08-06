"use client";

import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Activity, Users, CheckCircle, Zap } from "lucide-react"
import { MOCK_AGENTS, MOCK_TASKS, MOCK_ANALYTICS_DATA } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const activeAgents = MOCK_AGENTS.filter(a => a.status === "running").length;
  const completedTasks = MOCK_TASKS.filter(t => t.status === "done").length;
  const successRate = 98.4;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard overview</h1>
          <p className="text-muted-foreground text-sm">Monitor your AI agents and workflows in real-time.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Agents", value: activeAgents.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Tasks Completed", value: completedTasks.toString(), icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
          { title: "Workflows Running", value: "12", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
          { title: "Success Rate", value: `${successRate}%`, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <GlassCard className="p-6 lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Workflow Activity</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="completed" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Active Agents */}
        <GlassCard className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Active Agents</h2>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{activeAgents} Running</Badge>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {MOCK_AGENTS.filter(a => a.status === "running").map(agent => (
              <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      {agent.name}
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate w-32">{agent.currentTask}</div>
                  </div>
                </div>
                <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                  {agent.performance}%
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recent Tasks */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Tasks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-lg">
              <tr>
                <th className="px-4 py-3 rounded-l-lg font-medium">Task</th>
                <th className="px-4 py-3 font-medium">Assignee</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 rounded-r-lg font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TASKS.slice(0, 5).map((task) => (
                <tr key={task.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{task.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${task.assignee}`} />
                        <AvatarFallback>{task.assignee?.[0]}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={
                      task.priority === 'urgent' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      task.priority === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize text-muted-foreground">{task.status.replace("-", " ")}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
