"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { InfoIcon as InfoCircle } from "lucide-react"

export default function HouseEdgeVisualizer() {
  const [houseEdge, setHouseEdge] = useState<number>(5)
  const [betCount, setBetCount] = useState<number>(100)
  const [visualizationType, setVisualizationType] = useState<string>("cumulative")

  // Calculate expected loss over time
  const calculateExpectedLoss = (bets: number, edge: number, betAmount = 100) => {
    return bets * betAmount * (edge / 100)
  }

  // Generate random outcomes for simulation
  const generateSimulation = () => {
    const results = []
    let balance = 0

    for (let i = 0; i < betCount; i++) {
      // Each bet has a house edge, so expected value is negative
      const randomOutcome = Math.random()
      const win = randomOutcome > houseEdge / 100

      // If win, gain $90-100, if lose, lose $100
      // This simulates a house edge by paying slightly less than true odds
      const betResult = win ? 100 - houseEdge : -100
      balance += betResult

      results.push({
        bet: i + 1,
        result: betResult,
        balance,
      })
    }

    return results
  }

  // Generate simulation once when parameters change
  const simulation = generateSimulation()

  // Calculate theoretical expected loss
  const theoreticalLoss = calculateExpectedLoss(betCount, houseEdge)

  // Render cumulative balance chart
  const renderCumulativeChart = () => {
    const maxBalance = Math.max(...simulation.map((s) => s.balance), 0)
    const minBalance = Math.min(...simulation.map((s) => s.balance), 0)
    const range = Math.max(Math.abs(maxBalance), Math.abs(minBalance))

    return (
      <div className="h-64 w-full relative border rounded-lg p-4 bg-white dark:bg-gray-800">
        {/* Zero line */}
        <div className="absolute left-0 right-0 border-t border-gray-300 dark:border-gray-600" style={{ top: "50%" }} />

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>${range.toFixed(0)}</span>
          <span>$0</span>
          <span>-${range.toFixed(0)}</span>
        </div>

        {/* Theoretical line */}
        <div
          className="absolute h-0.5 bg-red-500"
          style={{
            left: "12px",
            right: "0",
            top: `${50 - (theoreticalLoss / (range * 2)) * 100}%`,
          }}
        />

        {/* Chart */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          <svg width="100%" height="100%" viewBox={`0 0 ${betCount} ${range * 2}`} preserveAspectRatio="none">
            <path
              d={`M 0 ${range} ${simulation.map((s) => `L ${s.bet} ${range - s.balance}`).join(" ")}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs bg-white dark:bg-gray-800 p-1 rounded">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500"></div>
            <span>Actual Balance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500"></div>
            <span>Expected Loss</span>
          </div>
        </div>
      </div>
    )
  }

  // Render distribution chart
  const renderDistributionChart = () => {
    // Create a histogram of final balances from multiple simulations
    const simulations = Array.from({ length: 100 }, () => generateSimulation()[betCount - 1].balance)

    // Group into buckets
    const bucketSize = 500
    const buckets: Record<string, number> = {}

    simulations.forEach((balance) => {
      const bucketKey = Math.floor(balance / bucketSize) * bucketSize
      buckets[bucketKey] = (buckets[bucketKey] || 0) + 1
    })

    const bucketEntries = Object.entries(buckets)
      .map(([key, count]) => ({ balance: Number.parseInt(key), count }))
      .sort((a, b) => a.balance - b.balance)

    const maxCount = Math.max(...bucketEntries.map((b) => b.count))

    return (
      <div className="h-64 w-full relative border rounded-lg p-4 bg-white dark:bg-gray-800">
        {/* X-axis */}
        <div className="absolute left-12 right-0 bottom-8 h-px bg-gray-300 dark:bg-gray-600" />

        {/* Y-axis */}
        <div className="absolute left-12 top-0 bottom-8 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxCount}</span>
          <span>{Math.floor(maxCount / 2)}</span>
          <span>0</span>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 h-8 flex justify-between text-xs text-muted-foreground">
          {bucketEntries.length > 0 && (
            <>
              <span>{bucketEntries[0].balance}</span>
              <span>Balance</span>
              <span>{bucketEntries[bucketEntries.length - 1].balance}</span>
            </>
          )}
        </div>

        {/* Theoretical expected value line */}
        <div
          className="absolute bottom-8 w-0.5 h-full bg-red-500"
          style={{
            left: `${12 + ((0 - theoreticalLoss - bucketEntries[0]?.balance) / (bucketEntries[bucketEntries.length - 1]?.balance - bucketEntries[0]?.balance)) * 100}%`,
          }}
        />

        {/* Bars */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end">
          {bucketEntries.map((bucket, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-500 mx-0.5"
              style={{
                height: `${(bucket.count / maxCount) * 100}%`,
              }}
              title={`${bucket.balance} to ${bucket.balance + bucketSize}: ${bucket.count} occurrences`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs bg-white dark:bg-gray-800 p-1 rounded">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500"></div>
            <span>Outcome Distribution</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500"></div>
            <span>Expected Value</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>House Edge Visualizer</CardTitle>
        <CardDescription>See how the house edge affects your balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>House Edge: {houseEdge}%</Label>
            </div>
            <Slider
              min={0.5}
              max={15}
              step={0.5}
              value={[houseEdge]}
              onValueChange={(value) => setHouseEdge(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Typical house edges: Sports betting: 4.5%, Blackjack: 0.5%, Roulette: 5.3%, Slots: 5-15%
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Number of Bets: {betCount}</Label>
            </div>
            <Slider min={10} max={500} step={10} value={[betCount]} onValueChange={(value) => setBetCount(value[0])} />
            <p className="text-xs text-muted-foreground">Increase to see the long-term effect of the house edge.</p>
          </div>

          <div className="pt-4 border-t">
            <Tabs value={visualizationType} onValueChange={setVisualizationType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cumulative">Balance Over Time</TabsTrigger>
                <TabsTrigger value="distribution">Outcome Distribution</TabsTrigger>
              </TabsList>
              <TabsContent value="cumulative" className="pt-4">
                {renderCumulativeChart()}
              </TabsContent>
              <TabsContent value="distribution" className="pt-4">
                {renderDistributionChart()}
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-4 rounded-lg bg-muted">
            <h3 className="text-sm font-medium mb-2">Simulation Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Theoretical expected loss:</span>
                <span className="text-red-600 dark:text-red-400">-${theoreticalLoss.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Simulated final balance:</span>
                <span
                  className={
                    simulation[betCount - 1].balance >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  ${simulation[betCount - 1].balance.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Highest balance reached:</span>
                <span className="text-green-600 dark:text-green-400">
                  ${Math.max(...simulation.map((s) => s.balance)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Lowest balance reached:</span>
                <span className="text-red-600 dark:text-red-400">
                  ${Math.min(...simulation.map((s) => s.balance)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <InfoCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-300">Why Gamblers Lose in the Long Run</p>
              <p className="mt-1 text-blue-700 dark:text-blue-400">
                Even though you might see winning streaks in the short term, the house edge ensures that the casino or
                bookmaker will profit over time. This visualization shows how a small edge compounds with each bet,
                eventually overcoming any short-term luck.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
