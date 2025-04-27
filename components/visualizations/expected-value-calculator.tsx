"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { InfoIcon as InfoCircle, Calculator } from "lucide-react"

export default function ExpectedValueCalculator() {
  const [betAmount, setBetAmount] = useState<string>("100")
  const [decimalOdds, setDecimalOdds] = useState<string>("2.00")
  const [winProbability, setWinProbability] = useState<number>(45)
  const [expectedValue, setExpectedValue] = useState<number | null>(null)
  const [roi, setRoi] = useState<number | null>(null)
  const [breakEvenProbability, setBreakEvenProbability] = useState<number | null>(null)
  const [edgePercentage, setEdgePercentage] = useState<number | null>(null)

  const calculateEV = () => {
    const amount = Number.parseFloat(betAmount)
    const odds = Number.parseFloat(decimalOdds)
    const probability = winProbability / 100

    if (isNaN(amount) || isNaN(odds) || odds < 1) return

    // Calculate implied probability from odds
    const impliedProbability = 1 / odds

    // Calculate expected value
    const potentialProfit = amount * (odds - 1)
    const ev = probability * potentialProfit - (1 - probability) * amount

    // Calculate ROI
    const returnOnInvestment = (ev / amount) * 100

    // Calculate break-even probability
    const breakEven = impliedProbability * 100

    // Calculate edge percentage
    const edge = (probability - impliedProbability) * 100

    setExpectedValue(ev)
    setRoi(returnOnInvestment)
    setBreakEvenProbability(breakEven)
    setEdgePercentage(edge)
  }

  // Calculate on initial render and when inputs change
  useEffect(() => {
    calculateEV()
  }, [betAmount, decimalOdds, winProbability])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Expected Value Calculator
        </CardTitle>
        <CardDescription>Calculate the expected value and long-term profitability of a bet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bet-amount">Bet Amount ($)</Label>
              <Input
                id="bet-amount"
                type="number"
                min="1"
                step="1"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimal-odds">Decimal Odds</Label>
              <Input
                id="decimal-odds"
                type="number"
                min="1.01"
                step="0.01"
                value={decimalOdds}
                onChange={(e) => setDecimalOdds(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Your Estimated Win Probability: {winProbability}%</Label>
            </div>
            <Slider
              min={1}
              max={99}
              step={1}
              value={[winProbability]}
              onValueChange={(value) => setWinProbability(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              This is your assessment of how likely the outcome is to occur.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3">Expected Value Analysis</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Potential profit:</span>
                    <span className="font-medium">
                      ${Number.parseFloat(betAmount) * (Number.parseFloat(decimalOdds) - 1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected value:</span>
                    <span
                      className={`font-medium ${expectedValue && expectedValue >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      ${expectedValue !== null ? expectedValue.toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Return on investment:</span>
                    <span
                      className={`font-medium ${roi && roi >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {roi !== null ? roi.toFixed(2) : "0.00"}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Implied probability:</span>
                    <span className="font-medium">
                      {breakEvenProbability !== null ? breakEvenProbability.toFixed(2) : "0.00"}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Your edge:</span>
                    <span
                      className={`font-medium ${edgePercentage && edgePercentage >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {edgePercentage !== null ? edgePercentage.toFixed(2) : "0.00"}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Long-term expectation:</span>
                    <span
                      className={`font-medium ${expectedValue && expectedValue >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {expectedValue && expectedValue >= 0 ? "Profitable" : "Unprofitable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${winProbability > breakEvenProbability ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${winProbability}%` }}
                  aria-label={`Your estimated probability: ${winProbability}%`}
                />
                {breakEvenProbability && (
                  <div
                    className="h-full border-l-2 border-yellow-500 absolute pointer-events-none"
                    style={{ left: `${breakEvenProbability}%`, marginLeft: "-1px" }}
                    aria-label={`Break-even probability: ${breakEvenProbability.toFixed(2)}%`}
                  />
                )}
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Your Probability</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border-l-2 border-yellow-500"></div>
                  <span>Break-even Point</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <InfoCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300">Understanding Expected Value</p>
              <p className="mt-1 text-blue-700 dark:text-blue-400">
                Expected Value (EV) is the average amount you can expect to win or lose per bet if you were to place the
                same bet many times. A positive EV means the bet is profitable in the long run, while a negative EV
                means you'll lose money over time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
