import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, BookOpen, Calculator, DollarSign, HelpCircle } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Odds Reality Check",
      description: "Understand what betting odds really mean and calculate your true chances of winning.",
      icon: Calculator,
      href: "/odds-calculator",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Loss Simulator",
      description: "See how betting affects your finances over time compared to saving or investing.",
      icon: BarChart3,
      href: "/loss-simulator",
      color: "bg-red-100 dark:bg-red-900",
    },
    {
      title: "Risk Profiles",
      description: "Discover your betting risk profile and understand your likely outcomes.",
      icon: DollarSign,
      href: "/risk-profile",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Betting Myths Debunked",
      description: "Learn why common betting strategies don't work and how bookmakers maintain an edge.",
      icon: HelpCircle,
      href: "/betting-myths",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "SmartPlay Mode",
      description: "Practice betting strategies with fake money before risking real cash.",
      icon: BookOpen,
      href: "/smart-play",
      color: "bg-amber-100 dark:bg-amber-900",
    },
  ]

  return (
    <div className="container px-4 py-12 md:py-24">
      <section className="flex flex-col items-center text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Behind Every Bet Is a <span className="text-primary">Risk</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          BetAware reveals the hidden risks behind betting, showing true odds and potential losses—so you think twice
          before placing a bet.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/odds-calculator">Try Odds Calculator</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/smart-play">Practice with SmartPlay</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="border shadow-sm">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href={feature.href}>Try Now</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </section>

      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Why BetAware?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Most betting apps encourage you to bet more. BetAware is different - we help you understand the mathematics
          behind betting so you can make informed decisions.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/betting-myths">Learn More</Link>
        </Button>
      </section>
    </div>
  )
}
