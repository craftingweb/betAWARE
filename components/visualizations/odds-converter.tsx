"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { InfoIcon as InfoCircle } from "lucide-react"

export default function OddsConverter() {
  const [activeTab, setActiveTab] = useState<string>("decimal")
  const [decimalOdds, setDecimalOdds] = useState<string>("2.00")
  const [americanOdds, setAmericanOdds] = useState<string>("+100")
  const [fractionalOdds, setFractionalOdds] = useState<string>("1/1")
  const [impliedProbability, setImpliedProbability] = useState<number>(50)
  const [isUpdatingFromSlider, setIsUpdatingFromSlider] = useState<boolean>(false)

  // Convert between odds formats
  useEffect(() => {
    if (isUpdatingFromSlider) return

    try {
      if (activeTab === "decimal") {
        const decimal = Number.parseFloat(decimalOdds)
        if (isNaN(decimal) || decimal <= 1) return

        // Calculate American odds
        let american: number
        if (decimal >= 2) {
          american = (decimal - 1) * 100
          setAmericanOdds(`+${american.toFixed(0)}`)
        } else {
          american = -100 / (decimal - 1)
          setAmericanOdds(american.toFixed(0))
        }

        // Calculate fractional odds
        const impliedProb = 1 / decimal
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
        const denominator = 100
        const numerator = Math.round((1 - impliedProb) * denominator)
        const divisor = gcd(numerator, denominator)
        setFractionalOdds(`${numerator / divisor}/${denominator / divisor}`)

        // Update implied probability
        setImpliedProbability(impliedProb * 100)
      } else if (activeTab === "american") {
        const american = Number.parseInt(americanOdds.replace(/[+-]/g, ""))
        if (isNaN(american)) return

        // Calculate decimal odds
        let decimal: number
        if (americanOdds.startsWith("+")) {
          decimal = american / 100 + 1
        } else {
          decimal = 100 / american + 1
        }
        setDecimalOdds(decimal.toFixed(2))

        // Calculate implied probability
        const impliedProb = 1 / decimal
        setImpliedProbability(impliedProb * 100)

        // Calculate fractional odds
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
        const denominator = 100
        const numerator = Math.round((1 - impliedProb) * denominator)
        const divisor = gcd(numerator, denominator)
        setFractionalOdds(`${numerator / divisor}/${denominator / divisor}`)
      } else if (activeTab === "fractional") {
        const [numerator, denominator] = fractionalOdds.split("/").map(Number)
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return

        // Calculate decimal odds
        const decimal = numerator / denominator + 1
        setDecimalOdds(decimal.toFixed(2))

        // Calculate American odds
        let american: number
        if (decimal >= 2) {
          american = (decimal - 1) * 100
          setAmericanOdds(`+${american.toFixed(0)}`)
        } else {
          american = -100 / (decimal - 1)
          setAmericanOdds(american.toFixed(0))
        }

        // Update implied probability
        setImpliedProbability((1 / decimal) * 100)
      } else if (activeTab === "probability") {
        // Calculate decimal odds from probability
        const decimal = 100 / impliedProbability
        setDecimalOdds(decimal.toFixed(2))

        // Calculate American odds
        let american: number
        if (decimal >= 2) {
          american = (decimal - 1) * 100
          setAmericanOdds(`+${american.toFixed(0)}`)
        } else {
          american = -100 / (decimal - 1)
          setAmericanOdds(american.toFixed(0))
        }

        // Calculate fractional odds
        const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
        const denominator = 100
        const numerator = Math.round((1 - impliedProbability / 100) * denominator)
        const divisor = gcd(numerator, denominator)
        setFractionalOdds(`${numerator / divisor}/${denominator / divisor}`)
      }
    } catch (error) {
      console.error("Error converting odds:", error)
    }
  }, [activeTab, decimalOdds, americanOdds, fractionalOdds, impliedProbability, isUpdatingFromSlider])

  const handleProbabilitySliderChange = (value: number[]) => {
    setIsUpdatingFromSlider(true)
    setImpliedProbability(value[0])

    // Calculate decimal odds from probability
    const decimal = 100 / value[0]
    setDecimalOdds(decimal.toFixed(2))

    // Calculate American odds
    let american: number
    if (decimal >= 2) {
      american = (decimal - 1) * 100
      setAmericanOdds(`+${american.toFixed(0)}`)
    } else {
      american = -100 / (decimal - 1)
      setAmericanOdds(american.toFixed(0))
    }

    // Calculate fractional odds
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
    const denominator = 100
    const numerator = Math.round((1 - value[0] / 100) * denominator)
    const divisor = gcd(numerator, denominator)
    setFractionalOdds(`${numerator / divisor}/${denominator / divisor}`)

    setTimeout(() => setIsUpdatingFromSlider(false), 100)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Odds Converter</CardTitle>
        <CardDescription>Convert between different odds formats and see implied probabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="decimal">Decimal</TabsTrigger>
            <TabsTrigger value="american">American</TabsTrigger>
            <TabsTrigger value="fractional">Fractional</TabsTrigger>
            <TabsTrigger value="probability">Probability</TabsTrigger>
          </TabsList>

          <TabsContent value="decimal" className="space-y-4">
            <div className="space-y-2 pt-4">
              <Label htmlFor="decimal-odds">Decimal Odds (e.g., 2.00)</Label>
              <Input
                id="decimal-odds"
                type="number"
                step="0.01"
                min="1.01"
                value={decimalOdds}
                onChange={(e) => setDecimalOdds(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Decimal odds represent the total return on a 1 unit stake, including the stake.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="american" className="space-y-4">
            <div className="space-y-2 pt-4">
              <Label htmlFor="american-odds">American Odds (e.g., +100 or -110)</Label>
              <Input id="american-odds" value={americanOdds} onChange={(e) => setAmericanOdds(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Positive numbers (+100) show how much profit you'd win on a 100 unit stake. Negative numbers (-110) show
                how much you need to stake to win 100 units.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="fractional" className="space-y-4">
            <div className="space-y-2 pt-4">
              <Label htmlFor="fractional-odds">Fractional Odds (e.g., 1/1 or 5/2)</Label>
              <Input id="fractional-odds" value={fractionalOdds} onChange={(e) => setFractionalOdds(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Fractional odds represent the profit relative to the stake. For example, 5/2 means you win 5 units for
                every 2 units staked.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="probability" className="space-y-4">
            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <Label htmlFor="probability-slider">Implied Probability: {impliedProbability.toFixed(1)}%</Label>
              </div>
              <Slider
                id="probability-slider"
                min={1}
                max={99}
                step={0.1}
                value={[impliedProbability]}
                onValueChange={handleProbabilitySliderChange}
              />
              <p className="text-xs text-muted-foreground">
                Implied probability is what the odds suggest is the likelihood of an outcome occurring.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium mb-3">Conversion Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Decimal</p>
              <p className="font-medium">{decimalOdds}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">American</p>
              <p className="font-medium">{americanOdds}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Fractional</p>
              <p className="font-medium">{fractionalOdds}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Probability</p>
              <p className="font-medium">{impliedProbability.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <InfoCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-300">Understanding the House Edge</p>
            <p className="mt-1 text-blue-700 dark:text-blue-400">
              Bookmakers build their profit margin into the odds by offering prices that imply a probability greater
              than 100% when all outcomes are combined. This is known as the "overround" or "vig".
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
