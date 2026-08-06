"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Bot, Home, Users, Workflow, CheckSquare, 
  BarChart2, Bell, Settings, HelpCircle, LogOut 
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { title: "Dashboard", icon: Home, href: "/dashboard" },
  { title: "AI Agents", icon: Users, href: "/dashboard/agents" },
  { title: "Workflows", icon: Workflow, href: "/dashboard/workflows" },
  { title: "Tasks", icon: CheckSquare, href: "/dashboard/tasks" },
  { title: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
  { title: "AI Chat", icon: Bot, href: "/dashboard/chat" },
]

const secondaryItems = [
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications", badge: "3" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Help Center", icon: HelpCircle, href: "/dashboard/help" },
]

export function AppSidebar() {
  // Normally we would use usePathname() here to set active state, but this is a server component by default
  // Wait, we can make it a client component if needed, or pass active state. Let's make it work without strict active state for now, or just use usePathname if we add "use client".
  
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="h-16 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
            <Bot className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">FlowMind AI</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.href} />}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.href} className="flex justify-between w-full" />}>
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium leading-none truncate">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">admin@flowmind.ai</span>
          </div>
          <Link href="/login" className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
