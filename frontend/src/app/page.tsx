"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Zap, Layers, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { PageTransition } from "@/components/ui/animated-transition";

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b bg-background/50 backdrop-blur-md">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">FlowMind AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#agents" className="hover:text-foreground transition-colors">Agents</Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-32 pb-16 px-6 lg:pt-48 lg:pb-32 container mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">FlowMind AI v2.0 is now live</span>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                Autonomous AI workflows <br className="hidden md:block" /> for modern teams
              </h1>
            </motion.div>

            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Connect intelligent agents to automate your entire business. From research and planning to execution, FlowMind AI orchestrates complex tasks seamlessly.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 gap-2">
                  Start Building <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/workflow/new">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full gap-2 backdrop-blur-sm">
                  View Demo <Layers className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Dashboard Preview Image/Mockup */}
            <motion.div variants={fadeIn} className="mt-20 relative w-full max-w-5xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 h-full w-full" />
              <GlassCard className="p-2 border-border/50 bg-background/40">
                <div className="rounded-lg overflow-hidden border border-border/50 bg-card aspect-video relative flex items-center justify-center">
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                   <div className="z-10 flex flex-col items-center gap-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-bounce">
                          <Bot className="w-8 h-8 text-primary" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center animate-pulse">
                          <Cpu className="w-8 h-8 text-secondary" />
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                      <p className="text-muted-foreground font-mono text-sm">Agent Orchestration Engine Active...</p>
                   </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful capabilities</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to automate workflows and scale your business operations with AI.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Layers, title: "Visual Builder", desc: "Drag and drop interface to construct complex multi-agent workflows." },
                { icon: Bot, title: "Specialized Agents", desc: "Pre-trained agents for HR, Finance, Marketing, and Engineering." },
                { icon: BarChart3, title: "Real-time Analytics", desc: "Monitor agent performance, success rates, and workflow execution times." },
                { icon: Zap, title: "Instant Execution", desc: "Agents work in parallel to resolve complex tasks in seconds." },
                { icon: Cpu, title: "Custom Logic", desc: "Add conditional branches, loops, and human-in-the-loop approvals." },
                { icon: Shield, title: "Enterprise Security", desc: "SOC2 compliant infrastructure with role-based access control." }
              ].map((feature, i) => (
                <GlassCard key={i} className="p-6 hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 bg-background">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-semibold">FlowMind AI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 FlowMind AI. Built for the Future.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
