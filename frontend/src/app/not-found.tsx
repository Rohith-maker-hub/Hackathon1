"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/ui/animated-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 text-center">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 mb-8 animate-pulse">
            <Bot className="text-white w-10 h-10" />
          </div>
          
          <h1 className="text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
            404
          </h1>
          
          <h2 className="text-3xl font-bold tracking-tight mb-4">Page not found</h2>
          
          <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <Link href="/">
            <Button className="h-12 px-8 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              <ArrowLeft className="w-5 h-5" /> Back to Safety
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
