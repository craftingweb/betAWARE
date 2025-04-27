"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle } from "lucide-react"

export default function ProbabilityVisualizer() {
  const [bookmakerMargin, setBookmakerMargin] = useState<number>(5)
  const [trueWinProbability, setTrueWinProbability] = useState<number>(50)
  const [visualizationType, setVisualizationType] = useState<string>("dots")

  // Calculate implied probability with bookmaker margin
  const impliedProbability = trueWinProbability * (1 + bookmakerMargin / 100)

  // Calculate fair decimal odds and bookmaker odds
  const fairDecimalOdds = 100 / trueWinProbability
  const bookmakerDecimalOdds = 100 / impliedProbability

  // Calculate expected value
  const betAmount = 100
  const potentialWin = betAmount * (bookmakerDecimalOdds - 1)
  const expectedValue = (trueWinProbability / 100) * potentialWin - (1 - trueWinProbability / 100) * betAmount

  // Generate dots for visualization
  const generateDots = (count: number, winCount: number, impliedWinCount: number) => {
    return Array.from({ length: count }, (_, i) => {
      const isTrueWin = i < winCount
      const isImpliedWin = i < impliedWinCount

      let color = "bg-gray-200 dark:bg-gray-700" // Neither

      if (isTrueWin && isImpliedWin) {
        color = "bg-green-500" // Both true win and implied win
      } else if (isTrueWin) {
        color = "bg-blue-500" // Only true win
      } else if (isImpliedWin) {
        color = "bg-red-500" // Only implied win (overestimated by bookmaker)
      }

      return <div key={i} className={`w-3 h-3 rounded-full ${color}`} aria-hidden="true" />
    })
  }

  // Generate bars for visualization
  const generateBars = () => {
    return (
      <div className="w-full h-16 flex">
        <div
          className="h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
          style={{ width: `${trueWinProbability}%` }}
          aria-label={`True win probability: ${trueWinProbability}%`}
        >
          {trueWinProbability >= 10 ? `${trueWinProbability}%` : ""}
        </div>
        <div
          className="h-full bg-red-500 flex items-center justify-center text-white text-xs font-medium"
          style={{ width: `${impliedProbability - trueWinProbability}%` }}
          aria-label={`Bookmaker margin: ${(impliedProbability - trueWinProbability).toFixed(1)}%`}
        >
          {impliedProbability - trueWinProbability >= 5
            ? `${(impliedProbability - trueWinProbability).toFixed(1)}%`
            : ""}
        </div>
        <div
          className="h-full bg-gray-200 dark:bg-gray-700"
          style={{ width: `${100 - impliedProbability}%` }}
          aria-label={`Implied loss probability: ${(100 - impliedProbability).toFixed(1)}%`}
        />
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Probability Visualizer</CardTitle>
        <CardDescription>See how bookmaker margins affect true probabilities and expected value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>True Win Probability: {trueWinProbability}%</Label>
            </div>
            <Slider
              min={1}
              max={99}
              step={1}
              value={[trueWinProbability]}
              onValueChange={(value) => setTrueWinProbability(value[0])}
            />
            <p className="text-xs text-muted-foreground">This is the actual probability of the outcome occurring.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Bookmaker Margin: {bookmakerMargin}%</Label>
            </div>
            <Slider
              min={0}
              max={20}
              step={0.5}
              value={[bookmakerMargin]}
              onValueChange={(value) => setBookmakerMargin(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              The margin bookmakers add to ensure profit (also called "vig" or "juice").
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">True Probability</p>
              <p className="font-medium">{trueWinProbability}%</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Implied Probability</p>
              <p className="font-medium">{impliedProbability.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Fair Odds</p>
              <p className="font-medium">{fairDecimalOdds.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Bookmaker Odds</p>
              <p className="font-medium">{bookmakerDecimalOdds.toFixed(2)}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Tabs value={visualizationType} onValueChange={setVisualizationType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dots">Dot Visualization</TabsTrigger>
                <TabsTrigger value="bars">Bar Visualization</TabsTrigger>
              </TabsList>
              <TabsContent value="dots" className="pt-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto">
                    {generateDots(100, Math.round(trueWinProbability), Math.round(impliedProbability))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>True & Implied Win</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Only True Win</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Only Implied Win</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bars" className="pt-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  {generateBars()}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500"></div>
                      <span>True Win Probability</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500"></div>
                      <span>Bookmaker Margin</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700"></div>
                      <span>Loss Probability</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <h3 className="text-sm font-medium mb-2">Expected Value Analysis</h3>
            <p className="text-sm mb-3">
              For a ${betAmount} bet at odds of {bookmakerDecimalOdds.toFixed(2)}:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Potential win:</span>
                <span>${potentialWin.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Expected value:</span>
                <span
                  className={
                    expectedValue >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  ${expectedValue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Long-term return:</span>
                <span
                  className={
                    expectedValue >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  {((expectedValue / betAmount) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <InfoCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300">How to Read This Chart</p>
              <p className="mt-1 text-blue-700 dark:text-blue-400">
                The difference between true probability and implied probability represents the bookmaker's edge. A
                negative expected value means you'll lose money in the long run. Most bets have negative expected value.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
