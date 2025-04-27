"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function OddsCalculator() {
  const [betAmount, setBetAmount] = useState<string>("20")
  const [oddsFormat, setOddsFormat] = useState<string>("american")
  const [odds, setOdds] = useState<string>("+150")
  const [calculationResult, setCalculationResult] = useState<any>(null)

  const calculateOdds = () => {
    const amount = Number.parseFloat(betAmount)
    const probability = 0
    let potentialWin = 0
    let impliedProbability = 0
    let ev = 0

    if (oddsFormat === "american") {
      const americanOdds = Number.parseInt(odds)
      if (americanOdds > 0) {
        potentialWin = amount * (americanOdds / 100)
        impliedProbability = 100 / (americanOdds + 100)
      } else {
        potentialWin = amount * (100 / Math.abs(americanOdds))
        impliedProbability = Math.abs(americanOdds) / (Math.abs(americanOdds) + 100)
      }
    } else if (oddsFormat === "decimal") {
      const decimalOdds = Number.parseFloat(odds)
      potentialWin = amount * (decimalOdds - 1)
      impliedProbability = 1 / decimalOdds
    } else if (oddsFormat === "fractional") {
      const [numerator, denominator] = odds.split("/").map(Number)
      potentialWin = amount * (numerator / denominator)
      impliedProbability = denominator / (numerator + denominator)
    }

    // Assume true probability is close to implied probability but slightly worse for bettor
    // This simulates the bookmaker's edge
    const trueProbability = impliedProbability * 0.95

    // Calculate expected value
    ev = potentialWin * trueProbability - amount * (1 - trueProbability)

    setCalculationResult({
      betAmount: amount,
      potentialWin: potentialWin.toFixed(2),
      impliedProbability: (impliedProbability * 100).toFixed(2),
      trueProbability: (trueProbability * 100).toFixed(2),
      expectedValue: ev.toFixed(2),
      isPositiveEV: ev > 0,
    })
  }

  const handleOddsFormatChange = (value: string) => {
    setOddsFormat(value)
    // Reset odds value based on format
    if (value === "american") setOdds("+150")
    else if (value === "decimal") setOdds("2.5")
    else if (value === "fractional") setOdds("3/2")
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">🎲 Odds Reality Check</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Enter your bet details to understand what the odds really mean, your true probability of winning, and the
        expected value of your bet.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Bet</CardTitle>
            <CardDescription>Input the details of the bet you're considering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bet-amount">Bet Amount ($)</Label>
                <Input
                  id="bet-amount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  placeholder="20"
                />
              </div>

              <div className="space-y-2">
                <Label>Odds Format</Label>
                <Tabs value={oddsFormat} onValueChange={handleOddsFormatChange}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="american">American</TabsTrigger>
                    <TabsTrigger value="decimal">Decimal</TabsTrigger>
                    <TabsTrigger value="fractional">Fractional</TabsTrigger>
                  </TabsList>
                  <TabsContent value="american" className="space-y-2 mt-2">
                    <Label htmlFor="american-odds">American Odds (e.g. +150, -200)</Label>
                    <Input
                      id="american-odds"
                      value={odds}
                      onChange={(e) => setOdds(e.target.value)}
                      placeholder="+150"
                    />
                  </TabsContent>
                  <TabsContent value="decimal" className="space-y-2 mt-2">
                    <Label htmlFor="decimal-odds">Decimal Odds (e.g. 2.5)</Label>
                    <Input id="decimal-odds" value={odds} onChange={(e) => setOdds(e.target.value)} placeholder="2.5" />
                  </TabsContent>
                  <TabsContent value="fractional" className="space-y-2 mt-2">
                    <Label htmlFor="fractional-odds">Fractional Odds (e.g. 3/2)</Label>
                    <Input
                      id="fractional-odds"
                      value={odds}
                      onChange={(e) => setOdds(e.target.value)}
                      placeholder="3/2"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <Button onClick={calculateOdds} className="w-full">
                Calculate Odds
              </Button>
            </div>
          </CardContent>
        </Card>

        {calculationResult && (
          <Card>
            <CardHeader>
              <CardTitle>Odds Analysis</CardTitle>
              <CardDescription>The reality behind your bet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Potential Win</span>
                  <span className="font-medium">${calculationResult.potentialWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Return</span>
                  <span className="font-medium">
                    $
                    {(
                      Number.parseFloat(calculationResult.potentialWin) + Number.parseFloat(calculationResult.betAmount)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Bookmaker's Implied Probability</Label>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Chance of Winning</span>
                    <span>{calculationResult.impliedProbability}%</span>
                  </div>
                  <Progress value={Number.parseFloat(calculationResult.impliedProbability)} />
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the probability implied by the odds the bookmaker is offering.
                </p>
              </div>

              <div className="space-y-3">
                <Label>True Probability (Estimated)</Label>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Actual Chance of Winning</span>
                    <span>{calculationResult.trueProbability}%</span>
                  </div>
                  <Progress value={Number.parseFloat(calculationResult.trueProbability)} className="bg-muted" />
                </div>
                <p className="text-xs text-muted-foreground">
                  The true probability is typically lower than the implied probability due to the bookmaker's edge.
                </p>
              </div>

              <Alert variant={calculationResult.isPositiveEV ? "default" : "destructive"}>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Expected Value: ${calculationResult.expectedValue}</AlertTitle>
                <AlertDescription>
                  {calculationResult.isPositiveEV
                    ? "This bet has a positive expected value, which is rare. Double-check your numbers."
                    : "This bet has a negative expected value, meaning you'll lose money in the long run."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
