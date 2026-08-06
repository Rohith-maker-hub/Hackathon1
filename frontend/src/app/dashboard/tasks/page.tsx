"use client";

import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { MOCK_TASKS } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks Directory</h1>
          <p className="text-muted-foreground text-sm">Monitor and manage agent tasks across all workflows.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-9 bg-background/50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background/50"><Filter className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="shrink-0 bg-background/50"><ArrowUpDown className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_TASKS.map((task) => (
          <GlassCard key={task.id} className="p-5 flex flex-col hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-base line-clamp-1">{task.title}</h3>
              <Badge variant="outline" className={
                task.priority === 'urgent' ? 'bg-red-500/10 text-red-500 border-red-500/20 ml-2' :
                task.priority === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 ml-2' :
                task.priority === 'medium' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 ml-2' :
                'bg-gray-500/10 text-gray-400 border-gray-500/20 ml-2'
              }>
                {task.priority}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-muted-foreground">Assignee:</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${task.assignee}`} />
                  <AvatarFallback>{task.assignee?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{task.assignee}</span>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-muted-foreground capitalize">{task.status.replace("-", " ")}</span>
                <span className="font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-6">
        <p className="text-sm text-muted-foreground">Showing 1 to {MOCK_TASKS.length} of 32 results</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-background/50" disabled><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-background/50">2</Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-background/50">3</Button>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-background/50"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  )
}
