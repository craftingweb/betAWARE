"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowDown, ArrowUp, DollarSign, History, TrendingDown, TrendingUp } from "lucide-react"

export default function SmartPlay() {
  const [virtualBalance, setVirtualBalance] = useState(1000)
  const [betAmount, setBetAmount] = useState<string>("50")
  const [selectedOdds, setSelectedOdds] = useState<string>("2.0")
  const [selectedSport, setSelectedSport] = useState<string>("football")
  const [bettingHistory, setBettingHistory] = useState<any[]>([])
  const [showOutcome, setShowOutcome] = useState(false)
  const [lastOutcome, setLastOutcome] = useState<any>(null)
  const [insights, setInsights] = useState<string[]>([])

  const sports = [
    { value: "football", label: "Football", winProb: 0.48 },
    { value: "basketball", label: "Basketball", winProb: 0.46 },
    { value: "baseball", label: "Baseball", winProb: 0.42 },
    { value: "hockey", label: "Hockey", winProb: 0.45 },
    { value: "soccer", label: "Soccer", winProb: 0.4 },
  ]

  const oddsOptions = [
    { value: "1.5", label: "1.50 (-200)", impliedProb: 0.67 },
    { value: "1.8", label: "1.80 (-125)", impliedProb: 0.56 },
    { value: "2.0", label: "2.00 (+100)", impliedProb: 0.5 },
    { value: "2.5", label: "2.50 (+150)", impliedProb: 0.4 },
    { value: "3.0", label: "3.00 (+200)", impliedProb: 0.33 },
  ]

  const placeBet = () => {
    const amount = Number.parseFloat(betAmount)
    if (isNaN(amount) || amount <= 0 || amount > virtualBalance) return

    const odds = Number.parseFloat(selectedOdds)
    const sport = sports.find((s) => s.value === selectedSport)

    // Simulate outcome based on true probability
    const win = Math.random() < sport.winProb
    const winAmount = win ? amount * (odds - 1) : -amount
    const newBalance = virtualBalance + winAmount

    const bet = {
      id: bettingHistory.length + 1,
      sport: sport.label,
      amount,
      odds,
      win,
      winAmount,
      timestamp: new Date().toISOString(),
      balanceAfter: newBalance,
    }

    setBettingHistory([bet, ...bettingHistory])
    setVirtualBalance(newBalance)
    setLastOutcome(bet)
    setShowOutcome(true)

    // Generate insights
    generateInsights(bet, [...bettingHistory, bet])
  }

  const resetSimulation = () => {
    setVirtualBalance(1000)
    setBettingHistory([])
    setShowOutcome(false)
    setLastOutcome(null)
    setInsights([])
  }

  const generateInsights = (lastBet: any, history: any[]) => {
    const newInsights = []

    // Calculate win rate
    const totalBets = history.length
    const wins = history.filter((bet) => bet.win).length
    const winRate = totalBets > 0 ? (wins / totalBets) * 100 : 0

    // Calculate profit/loss
    const totalProfit = history.reduce((sum, bet) => sum + bet.winAmount, 0)
    const roi = totalBets > 0 ? (totalProfit / (totalBets * Number.parseFloat(betAmount))) * 100 : 0

    // Generate insights based on patterns
    if (totalBets >= 5) {
      newInsights.push(
        `Your current win rate is ${winRate.toFixed(1)}%, while the odds imply a ${(oddsOptions.find((o) => o.value === selectedOdds)?.impliedProb * 100).toFixed(1)}% chance of winning.`,
      )
    }

    if (totalBets >= 10) {
      if (roi < -5) {
        newInsights.push(
          `You're down ${Math.abs(totalProfit).toFixed(2)} virtual dollars (${roi.toFixed(1)}% ROI). This is typical for most recreational bettors.`,
        )
      } else if (roi > 5) {
        newInsights.push(
          `You're up ${totalProfit.toFixed(2)} virtual dollars (${roi.toFixed(1)}% ROI). This is unusually lucky - most bettors have a negative ROI long-term.`,
        )
      }
    }

    // Look for chasing behavior
    const recentBets = history.slice(0, 5)
    const consecutiveLosses = recentBets.findIndex((bet) => bet.win)
    if (consecutiveLosses >= 3) {
      newInsights.push(
        `You've had ${consecutiveLosses} consecutive losses. Be careful not to increase your bet size to chase losses.`,
      )
    }

    // Check for bet sizing issues
    const betSizePercentage = (Number.parseFloat(betAmount) / virtualBalance) * 100
    if (betSizePercentage > 10) {
      newInsights.push(
        `Your current bet (${betSizePercentage.toFixed(1)}% of your bankroll) is larger than recommended. Professional bettors typically bet 1-5% of their bankroll.`,
      )
    }

    setInsights(newInsights)
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">📚 SmartPlay Mode</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Practice betting with virtual money to learn how odds work and develop responsible habits before risking real
        cash.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Virtual Bankroll</CardTitle>
                <Badge variant={virtualBalance > 1000 ? "success" : virtualBalance < 800 ? "destructive" : "outline"}>
                  ${virtualBalance.toFixed(2)}
                </Badge>
              </div>
              <CardDescription>Place bets with virtual money to see how different strategies perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bet-amount">Bet Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="bet-amount"
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sport">Select Sport</Label>
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.value} value={sport.value}>
                        {sport.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="odds">Select Odds</Label>
                <Select value={selectedOdds} onValueChange={setSelectedOdds}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select odds" />
                  </SelectTrigger>
                  <SelectContent>
                    {oddsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} ({(option.impliedProb * 100).toFixed(0)}% implied probability)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={placeBet} className="w-full" disabled={Number.parseFloat(betAmount) > virtualBalance}>
                Place Virtual Bet
              </Button>
            </CardContent>
          </Card>

          {showOutcome && lastOutcome && (
            <Card className={lastOutcome.win ? "border-green-500" : "border-red-500"}>
              <CardHeader
                className={`${lastOutcome.win ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"} rounded-t-lg`}
              >
                <CardTitle className="flex items-center gap-2">
                  {lastOutcome.win ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>You Won!</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span>You Lost</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {lastOutcome.sport} bet at {lastOutcome.odds} odds
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Bet Amount:</span>
                  <span>${lastOutcome.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Outcome:</span>
                  <span className={lastOutcome.win ? "text-green-500" : "text-red-500"}>
                    {lastOutcome.win
                      ? `+$${lastOutcome.winAmount.toFixed(2)}`
                      : `-$${Math.abs(lastOutcome.winAmount).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>New Balance:</span>
                  <span>${lastOutcome.balanceAfter.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {insights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Betting Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Betting History</h3>
              <Button variant="outline" size="sm" onClick={resetSimulation}>
                Reset Simulation
              </Button>
            </div>

            {bettingHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No betting history yet</p>
                <p className="text-sm">Place your first virtual bet to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bettingHistory.map((bet) => (
                  <div key={bet.id} className="flex items-center p-3 border rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${bet.win ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}
                    >
                      {bet.win ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{bet.sport}</span>
                        <span
                          className={bet.win ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
                        >
                          {bet.win ? `+${bet.winAmount.toFixed(2)}` : `-${Math.abs(bet.winAmount).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          ${bet.amount.toFixed(2)} @ {bet.odds}
                        </span>
                        <span>Balance: ${bet.balanceAfter.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
