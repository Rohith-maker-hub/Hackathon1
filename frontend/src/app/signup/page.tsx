"use client";

import React from "react";
import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { PageTransition } from "@/components/ui/animated-transition";

export default function SignupPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background Gradients */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Bot className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">FlowMind AI</span>
        </Link>

        <GlassCard className="w-full max-w-md p-8 relative z-10 border-border/50 bg-background/60">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 tracking-tight">Create an account</h1>
            <p className="text-muted-foreground text-sm">Start orchestrating AI workflows today</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href='/dashboard'; }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First name</label>
                <Input type="text" placeholder="John" required className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last name</label>
                <Input type="text" placeholder="Doe" required className="bg-background/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="john@company.com" required className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" required className="bg-background/50" />
            </div>

            <Button type="submit" className="w-full h-11 mt-6 bg-primary hover:bg-primary/90">
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-foreground hover:underline font-medium">Sign in</Link>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
