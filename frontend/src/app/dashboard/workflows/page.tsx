"use client";

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Play, Save, Plus, Settings2, ZoomIn, ZoomOut, Maximize, 
  MousePointer2, Hand, Trash2, Copy, ArrowRight, Activity, 
  CheckCircle2, GitBranch, Split, UserCheck, RotateCw, GitMerge
} from "lucide-react"
import { apiClient } from "@/config/api"
import { toast } from "sonner"

export default function WorkflowBuilderPage() {
  const [workflowName, setWorkflowName] = useState("Customer Onboarding Workflow");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient('/workflows', {
        method: 'POST',
        body: JSON.stringify({
          name: workflowName,
          description: "Auto-saved workflow",
          status: "active",
          nodes: [] // In a real app, this would be the actual canvas state
        })
      });
      toast.success("Workflow saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save workflow");
    } finally {
      setSaving(false);
    }
  };

  const handleTestRun = async () => {
    setTesting(true);
    try {
      // Assuming ID 1 for test purposes as we don't have a real ID yet
      await apiClient('/workflows/1/run', { method: 'POST' });
      toast.success("Workflow execution started!");
    } catch (error: any) {
      toast.error(error.message || "Failed to start workflow");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -m-4 md:-m-6 lg:-m-8">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border/50 bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Input 
            value={workflowName} 
            onChange={(e) => setWorkflowName(e.target.value)}
            className="w-64 h-8 font-medium bg-transparent border-transparent hover:border-border/50 focus:border-primary" 
          />
          <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">Saved</div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleTestRun} disabled={testing} variant="outline" size="sm" className="h-8 gap-2">
            <Play className="w-3.5 h-3.5" /> {testing ? "Running..." : "Test Run"}
          </Button>
          <Button onClick={handleSave} disabled={saving} size="sm" className="h-8 bg-primary hover:bg-primary/90 gap-2">
            <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Palette */}
        <div className="w-64 border-r border-border/50 bg-background/50 flex flex-col">
          <div className="p-4 font-semibold text-sm border-b border-border/50">Nodes</div>
          <div className="p-4 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <h4 className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Triggers</h4>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-blue-500/20 rounded-md"><Play className="w-4 h-4 text-blue-500" /></div>
                <span className="text-sm font-medium">Webhook Event</span>
              </GlassCard>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-purple-500/20 rounded-md"><Activity className="w-4 h-4 text-purple-500" /></div>
                <span className="text-sm font-medium">Schedule</span>
              </GlassCard>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Actions</h4>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-primary/20 rounded-md"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                <span className="text-sm font-medium">Agent Task</span>
              </GlassCard>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-orange-500/20 rounded-md"><ArrowRight className="w-4 h-4 text-orange-500" /></div>
                <span className="text-sm font-medium">API Request</span>
              </GlassCard>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Logic</h4>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-yellow-500/20 rounded-md"><GitBranch className="w-4 h-4 text-yellow-500" /></div>
                <span className="text-sm font-medium">Condition</span>
              </GlassCard>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-indigo-500/20 rounded-md"><Split className="w-4 h-4 text-indigo-500" /></div>
                <span className="text-sm font-medium">Parallel Branches</span>
              </GlassCard>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-red-500/20 rounded-md"><RotateCw className="w-4 h-4 text-red-500" /></div>
                <span className="text-sm font-medium">Retry Block</span>
              </GlassCard>
              <GlassCard className="p-3 cursor-grab hover:border-primary/50 flex items-center gap-3">
                <div className="p-1.5 bg-green-500/20 rounded-md"><UserCheck className="w-4 h-4 text-green-500" /></div>
                <span className="text-sm font-medium">Human Approval</span>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] bg-muted/20 overflow-hidden cursor-grab">
          {/* Canvas Controls */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border/50 p-1 rounded-lg shadow-sm">
            <Button variant="ghost" size="icon" className="h-8 w-8"><MousePointer2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Hand className="w-4 h-4" /></Button>
            <div className="w-px h-4 bg-border/50 mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomOut className="w-4 h-4" /></Button>
            <span className="text-xs font-medium w-10 text-center">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomIn className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Maximize className="w-4 h-4" /></Button>
          </div>

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Start to Condition */}
            <path d="M 300 150 C 400 150, 350 250, 450 250" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
            {/* Condition to Path A */}
            <path d="M 700 250 C 800 250, 750 150, 850 150" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            {/* Condition to Path B */}
            <path d="M 700 250 C 800 250, 750 350, 850 350" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          </svg>

          {/* Nodes placed absolutely */}
          <GlassCard className="absolute top-[110px] left-[100px] w-64 shadow-lg border-blue-500/30 ring-1 ring-blue-500/20">
            <div className="p-3 border-b border-border/50 flex items-center gap-3 bg-blue-500/5">
              <div className="p-1.5 bg-blue-500/20 rounded-md"><Play className="w-4 h-4 text-blue-500" /></div>
              <span className="font-semibold text-sm">Webhook Trigger</span>
            </div>
            <div className="p-3 text-xs text-muted-foreground">Listens for incoming Stripe events</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-background" />
          </GlassCard>

          <GlassCard className="absolute top-[210px] left-[450px] w-64 shadow-lg border-yellow-500/50 ring-2 ring-yellow-500/20 bg-background">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
            <div className="p-3 border-b border-border/50 flex items-center gap-3 bg-yellow-500/5">
              <div className="p-1.5 bg-yellow-500/20 rounded-md"><GitBranch className="w-4 h-4 text-yellow-500" /></div>
              <span className="font-semibold text-sm">Check Subscription</span>
            </div>
            <div className="p-3 text-xs text-muted-foreground flex flex-col gap-2">
              <div className="flex justify-between items-center"><span className="bg-muted px-2 py-1 rounded">Is Premium?</span><ArrowRight className="w-3 h-3" /></div>
            </div>
            <div className="absolute right-0 top-[30px] translate-x-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
            <div className="absolute right-0 bottom-[30px] translate-x-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
          </GlassCard>

          <GlassCard className="absolute top-[110px] left-[850px] w-64 shadow-lg border-border/50 opacity-80">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
            <div className="p-3 border-b border-border/50 flex items-center gap-3 bg-primary/5">
              <div className="p-1.5 bg-primary/20 rounded-md"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
              <span className="font-semibold text-sm">Assign to Support</span>
            </div>
            <div className="p-3 text-xs text-muted-foreground">High priority ticket generation</div>
          </GlassCard>

          <GlassCard className="absolute top-[310px] left-[850px] w-64 shadow-lg border-border/50 opacity-80">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
            <div className="p-3 border-b border-border/50 flex items-center gap-3 bg-green-500/5">
              <div className="p-1.5 bg-green-500/20 rounded-md"><UserCheck className="w-4 h-4 text-green-500" /></div>
              <span className="font-semibold text-sm">Require Approval</span>
            </div>
            <div className="p-3 text-xs text-muted-foreground">Manager approval needed</div>
          </GlassCard>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 border-l border-border/50 bg-background/95 backdrop-blur flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-border/50">
            <span className="font-semibold text-sm">Node Properties</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Node Name</label>
              <Input defaultValue="Check Subscription" className="h-8 text-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Condition Type</label>
              <select className="w-full h-8 text-sm rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>IF / ELSE</option>
                <option>SWITCH CASE</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Rules</label>
                <Button variant="outline" size="sm" className="h-6 text-xs px-2"><Plus className="w-3 h-3 mr-1" /> Add Rule</Button>
              </div>
              
              <div className="p-3 rounded-lg border border-border/50 bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Rule 1</span>
                  <Settings2 className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <Input defaultValue="event.plan" className="h-7 text-xs flex-1" />
                  <select className="h-7 text-xs rounded border border-input bg-background px-1 w-16">
                    <option>==</option>
                    <option>!=</option>
                  </select>
                  <Input defaultValue="'premium'" className="h-7 text-xs flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
