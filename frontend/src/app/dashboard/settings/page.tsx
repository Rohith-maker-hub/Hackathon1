"use client";

import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard, Key, Bell, User, Monitor, Shield, Copy, Check } from "lucide-react"

export default function SettingsPage() {
  const [copied, setCopied] = React.useState(false);

  const copyKey = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="border-b border-border/50 pb-px overflow-x-auto">
          <TabsList className="bg-transparent h-12 p-0 space-x-6 justify-start w-max">
            <TabsTrigger value="profile" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none h-12 px-0 gap-2">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="workspace" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none h-12 px-0 gap-2">
              <Monitor className="w-4 h-4" /> Workspace
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none h-12 px-0 gap-2">
              <CreditCard className="w-4 h-4" /> Billing
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none h-12 px-0 gap-2">
              <Key className="w-4 h-4" /> API Keys
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none h-12 px-0 gap-2">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6 animate-in fade-in-50">
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-4">Profile Information</h3>
            <div className="flex items-center gap-6 mb-6">
              <Avatar className="h-20 w-20 border">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button size="sm">Upload new</Button>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
                <p className="text-xs text-muted-foreground">Recommended size: 256x256px</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First name</label>
                <Input defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last name</label>
                <Input defaultValue="User" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Email address</label>
                <Input defaultValue="admin@flowmind.ai" disabled />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6 animate-in fade-in-50">
          <GlassCard className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium">API Keys</h3>
                <p className="text-sm text-muted-foreground">Manage your API keys for programmatic access.</p>
              </div>
              <Button size="sm" className="gap-2"><PlusCircle className="w-4 h-4" /> Create new key</Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border/50 bg-muted/20 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Production Key</p>
                  <p className="text-xs text-muted-foreground mt-1">Created on Jan 12, 2026 • Last used 2 hours ago</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm px-3 py-1 bg-background rounded border border-border/50 text-muted-foreground select-all">
                    flm_live_*******************a9b2
                  </div>
                  <Button variant="ghost" size="icon" onClick={copyKey}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Other tabs can be similarly implemented... */}
        <TabsContent value="billing" className="space-y-6 animate-in fade-in-50">
          <GlassCard className="p-6">
            <h3 className="text-lg font-medium mb-2">Current Plan</h3>
            <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg flex justify-between items-center mb-6">
              <div>
                <h4 className="font-semibold text-primary">Enterprise Plan</h4>
                <p className="text-sm text-muted-foreground">Unlimited agents, priority support.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">$299</span><span className="text-muted-foreground text-sm">/mo</span>
              </div>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlusCircle(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
}
