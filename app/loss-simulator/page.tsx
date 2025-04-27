"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LossSimulator() {
  const [betAmount, setBetAmount] = useState<string>("20")
  const [frequency, setFrequency] = useState<string>("weekly")
  const [duration, setDuration] = useState<number>(3)
  const [winRate, setWinRate] = useState<number>(45)
  const [averageOdds, setAverageOdds] = useState<string>("2.0")
  const [savingsRate, setSavingsRate] = useState<string>("2")
  const [investmentRate, setInvestmentRate] = useState<string>("7")
  const [simulationResults, setSimulationResults] = useState<any>(null)

  const runSimulation = () => {
    const amount = Number.parseFloat(betAmount)
    const odds = Number.parseFloat(averageOdds)
    const winProbability = winRate / 100
    const savingsInterest = Number.parseFloat(savingsRate) / 100
    const investmentReturn = Number.parseFloat(investmentRate) / 100

    let betsPerMonth = 0
    if (frequency === "daily") betsPerMonth = 30
    else if (frequency === "weekly") betsPerMonth = 4
    else if (frequency === "monthly") betsPerMonth = 1

    const months = duration
    const totalBets = betsPerMonth * months

    // Calculate results
    const labels = Array.from({ length: months + 1 }, (_, i) => (i === 0 ? "Start" : `Month ${i}`))
    const bettingResults = [0]
    const savingResults = [0]
    const investingResults = [0]

    let bettingBalance = 0
    let savingBalance = 0
    let investingBalance = 0

    for (let month = 1; month <= months; month++) {
      // Betting simulation
      for (let bet = 0; bet < betsPerMonth; bet++) {
        const win = Math.random() < winProbability
        bettingBalance += win ? amount * (odds - 1) : -amount
      }

      // Saving and investing
      const monthlyAmount = amount * betsPerMonth
      savingBalance += monthlyAmount
      investingBalance += monthlyAmount

      // Apply interest/returns (simplified)
      savingBalance *= 1 + savingsInterest / 12
      investingBalance *= 1 + investmentReturn / 12

      bettingResults.push(bettingBalance)
      savingResults.push(savingBalance)
      investingResults.push(investingBalance)
    }

    setSimulationResults({
      labels,
      betting: bettingResults,
      saving: savingResults,
      investing: investingResults,
      finalBetting: bettingBalance,
      finalSaving: savingBalance,
      finalInvesting: investingBalance,
      totalSpent: amount * totalBets,
    })
  }

  // Run initial simulation on load
  useEffect(() => {
    runSimulation()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">📉 Loss Simulator</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        See how your betting habits affect your finances over time compared to saving or investing that money instead.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Betting Habits</CardTitle>
            <CardDescription>Enter your typical betting pattern</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label htmlFor="frequency">Betting Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Slider
                id="duration"
                min={1}
                max={12}
                step={1}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>6</span>
                <span>12</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="win-rate">Win Rate: {winRate}%</Label>
              </div>
              <Slider
                id="win-rate"
                min={30}
                max={55}
                step={1}
                value={[winRate]}
                onValueChange={(value) => setWinRate(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30%</span>
                <span>45%</span>
                <span>55%</span>
              </div>
              <p className="text-xs text-muted-foreground">Most recreational bettors win 40-45% of their bets.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="average-odds">Average Decimal Odds</Label>
              <Input
                id="average-odds"
                type="number"
                step="0.1"
                value={averageOdds}
                onChange={(e) => setAverageOdds(e.target.value)}
                placeholder="2.0"
              />
            </div>

            <Tabs defaultValue="default">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="default">Default Rates</TabsTrigger>
                <TabsTrigger value="custom">Custom Rates</TabsTrigger>
              </TabsList>
              <TabsContent value="custom" className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="savings-rate">Savings Interest Rate (%)</Label>
                  <Input
                    id="savings-rate"
                    type="number"
                    step="0.1"
                    value={savingsRate}
                    onChange={(e) => setSavingsRate(e.target.value)}
                    placeholder="2.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment-rate">Investment Return Rate (%)</Label>
                  <Input
                    id="investment-rate"
                    type="number"
                    step="0.1"
                    value={investmentRate}
                    onChange={(e) => setInvestmentRate(e.target.value)}
                    placeholder="7.0"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={runSimulation} className="w-full">
              Run Simulation
            </Button>
          </CardContent>
        </Card>

        {simulationResults && (
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
              <CardDescription>Comparing betting vs saving vs investing over {duration} months</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg mb-4">
                <h3 className="text-sm font-medium mb-2">Simulation Summary</h3>
                <p className="text-sm mb-2">
                  This simulation compares what happens to your money over {duration} months when:
                </p>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>
                    You bet ${betAmount} {frequency} with a {winRate}% win rate at {averageOdds} odds
                  </li>
                  <li>You save the same amount with a {savingsRate}% annual interest rate</li>
                  <li>You invest the same amount with a {investmentRate}% annual return</li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Betting</p>
                  <p
                    className={`text-lg font-bold ${simulationResults.finalBetting < 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    ${simulationResults.finalBetting.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Saving</p>
                  <p className="text-lg font-bold text-blue-500">${simulationResults.finalSaving.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Investing</p>
                  <p className="text-lg font-bold text-green-500">${simulationResults.finalInvesting.toFixed(2)}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Total money spent: ${simulationResults.totalSpent.toFixed(2)}
                </p>
                <p className="text-sm">
                  {simulationResults.finalBetting < 0
                    ? `If you had invested this money instead of betting, you would have ${(simulationResults.finalInvesting - simulationResults.finalBetting).toFixed(2)} more dollars.`
                    : `You were lucky! Most bettors lose money in the long run.`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
