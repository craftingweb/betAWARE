"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  BarChart3,
  BookOpen,
  Calculator,
  DollarSign,
  HelpCircle,
  Home,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Odds Calculator", href: "/odds-calculator", icon: Calculator },
    { name: "Loss Simulator", href: "/loss-simulator", icon: BarChart3 },
    { name: "Risk Profile", href: "/risk-profile", icon: DollarSign },
    { name: "Betting Myths", href: "/betting-myths", icon: HelpCircle },
    { name: "SmartPlay", href: "/smart-play", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="BetAware Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex gap-6 text-sm mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="absolute right-4">
            <ModeToggle />
          </div>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <Button variant="outline" size="icon" asChild>
            <Link href="/odds-calculator">
              <Calculator className="h-4 w-4" />
              <span className="sr-only">Odds Calculator</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
