import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import OddsConverter from "@/components/visualizations/odds-converter"
import ProbabilityVisualizer from "@/components/visualizations/probability-visualizer"
import ExpectedValueCalculator from "@/components/visualizations/expected-value-calculator"
import HouseEdgeVisualizer from "@/components/visualizations/house-edge-visualizer"

export default function BettingVisualizations() {
  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/betting-myths">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Betting Myths
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Betting Risks & Probability Visualizations</h1>
      </div>

      <p className="text-muted-foreground mb-8 max-w-3xl">
        These interactive visualizations help you understand the mathematics behind betting odds, probabilities, and
        expected value. Use them to see why most betting systems fail in the long run.
      </p>

      <Tabs defaultValue="odds" className="max-w-4xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="odds">Odds Converter</TabsTrigger>
          <TabsTrigger value="probability">Probability</TabsTrigger>
          <TabsTrigger value="expected-value">Expected Value</TabsTrigger>
          <TabsTrigger value="house-edge">House Edge</TabsTrigger>
        </TabsList>
        <TabsContent value="odds" className="mt-6">
          <OddsConverter />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Understanding Odds Formats</CardTitle>
              <CardDescription>How different odds formats represent the same probabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Betting odds are displayed in different formats around the world, but they all represent the same thing:
                the probability of an outcome and the potential payout.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Decimal Odds (European)</h3>
                  <p className="text-sm">
                    Represent the total return on a 1 unit stake, including the stake. For example, odds of 2.50 mean
                    you'll receive 2.50 units for every 1 unit staked (1.50 profit plus your 1 unit stake back).
                  </p>
                  <p className="text-sm mt-2 font-medium">Implied probability = 1 / decimal odds</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">American Odds (US)</h3>
                  <p className="text-sm">
                    Positive numbers (+150) show how much profit you'd win on a 100 unit stake. Negative numbers (-200)
                    show how much you need to stake to win 100 units of profit.
                  </p>
                  <p className="text-sm mt-2 font-medium">Implied probability (positive) = 100 / (odds + 100)</p>
                  <p className="text-sm mt-1 font-medium">Implied probability (negative) = |odds| / (|odds| + 100)</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Fractional Odds (UK)</h3>
                  <p className="text-sm">
                    Represent the profit relative to the stake. For example, odds of 5/2 mean you'll win 5 units for
                    every 2 units staked (plus your stake back).
                  </p>
                  <p className="text-sm mt-2 font-medium">
                    Implied probability = denominator / (numerator + denominator)
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Common Odds Equivalents</h3>
                <div className="grid grid-cols-3 gap-2 text-sm text-blue-700 dark:text-blue-400">
                  <div className="font-medium">Decimal</div>
                  <div className="font-medium">American</div>
                  <div className="font-medium">Fractional</div>
                  <div>2.00</div>
                  <div>+100</div>
                  <div>1/1 (Even)</div>
                  <div>1.50</div>
                  <div>-200</div>
                  <div>1/2</div>
                  <div>3.00</div>
                  <div>+200</div>
                  <div>2/1</div>
                  <div>1.91</div>
                  <div>-110</div>
                  <div>10/11</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="probability" className="mt-6">
          <ProbabilityVisualizer />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>True vs. Implied Probability</CardTitle>
              <CardDescription>How bookmakers build their edge into the odds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Bookmakers don't offer "fair" odds that reflect the true probability of an event. Instead, they build in
                a margin (also called "vig," "juice," or "overround") to ensure they make a profit regardless of the
                outcome.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Example: Coin Flip</h3>
                  <p className="text-sm">
                    A fair coin has a 50% chance of landing on heads or tails. Fair odds would be 2.00 (decimal) for
                    either outcome.
                  </p>
                  <p className="text-sm mt-2">But bookmakers might offer:</p>
                  <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                    <li>Heads: 1.91 (implied probability: 52.4%)</li>
                    <li>Tails: 1.91 (implied probability: 52.4%)</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Total implied probability: 104.8% (the extra 4.8% is the bookmaker's edge)
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">The Overround</h3>
                  <p className="text-sm">
                    In a fair market, the sum of all implied probabilities would be exactly 100%. In betting markets,
                    this sum is always greater than 100% - this is the overround.
                  </p>
                  <p className="text-sm mt-2">Typical overrounds:</p>
                  <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                    <li>Major sports: 2-5%</li>
                    <li>Minor sports: 7-10%</li>
                    <li>Casino games: 1-15%</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Finding Value Bets</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  A value bet occurs when your assessment of the true probability is higher than the implied probability
                  from the odds. For example, if you believe a team has a 50% chance of winning, but the odds imply only
                  a 40% chance, that's a value bet. Professional bettors look for these discrepancies to gain an edge
                  over bookmakers.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expected-value" className="mt-6">
          <ExpectedValueCalculator />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>The Mathematics of Expected Value</CardTitle>
              <CardDescription>Why most bets lose money in the long run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Expected Value (EV) is the mathematical concept that explains why betting systems fail. It represents
                the average amount you can expect to win or lose per bet if you placed the same bet many times.
              </p>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">The EV Formula</h3>
                <p className="text-sm font-medium text-center my-3">
                  EV = (Probability of Winning × Amount Won) - (Probability of Losing × Amount Lost)
                </p>
                <p className="text-sm">For a typical sports bet at -110 odds (1.91 decimal):</p>
                <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                  <li>You bet $110 to win $100</li>
                  <li>True probability of winning: 50%</li>
                  <li>EV = (0.5 × $100) - (0.5 × $110) = $50 - $55 = -$5</li>
                </ul>
                <p className="text-sm mt-2">This means for every $110 bet, you'll lose $5 on average over time.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Negative EV Bets</h3>
                  <p className="text-sm">
                    Most gambling activities have a negative expected value, meaning you'll lose money in the long run.
                    Examples include:
                  </p>
                  <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                    <li>Sports betting: -2% to -5% EV</li>
                    <li>Roulette: -2.7% to -5.3% EV</li>
                    <li>Slots: -5% to -15% EV</li>
                    <li>Lottery: -40% to -60% EV</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Positive EV Bets</h3>
                  <p className="text-sm">
                    Positive EV bets are rare but possible. They occur when your assessment of the true probability is
                    more accurate than the bookmaker's. Professional bettors seek these opportunities through:
                  </p>
                  <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                    <li>Advanced statistical modeling</li>
                    <li>Specialized knowledge of niche markets</li>
                    <li>Exploiting bookmaker pricing errors</li>
                    <li>Finding arbitrage opportunities across multiple bookmakers</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">The Kelly Criterion</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  If you do find a positive EV bet, the Kelly Criterion helps determine the optimal bet size:
                </p>
                <p className="text-sm font-medium text-center my-3 text-blue-700 dark:text-blue-400">
                  Optimal Bet % = (bp - q) / b
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Where: b = decimal odds - 1, p = probability of winning, q = probability of losing (1-p)
                </p>
                <p className="text-sm mt-2 text-blue-700 dark:text-blue-400">
                  Even with a positive edge, the Kelly Criterion typically recommends betting only a small percentage of
                  your bankroll to manage risk.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="house-edge" className="mt-6">
          <HouseEdgeVisualizer />
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>The House Edge and Gambler's Ruin</CardTitle>
              <CardDescription>Why the house always wins in the long run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The house edge is the mathematical advantage that ensures gambling establishments will always profit in
                the long run. This concept is closely related to the mathematical principle of "Gambler's Ruin."
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Gambler's Ruin Principle</h3>
                  <p className="text-sm">
                    If a player with a finite bankroll plays against an opponent with infinite resources (the casino),
                    the player will eventually lose all their money, even if the game is fair.
                  </p>
                  <p className="text-sm mt-2">
                    When the game has a house edge (unfair odds), ruin becomes a mathematical certainty given enough
                    time.
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Why Betting Systems Fail</h3>
                  <p className="text-sm">No betting system can overcome the house edge because:</p>
                  <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                    <li>The expected value of each bet remains negative</li>
                    <li>Changing bet sizes doesn't change the underlying probabilities</li>
                    <li>The Law of Large Numbers ensures results converge to the expected value</li>
                    <li>All players have finite bankrolls, while casinos have effectively infinite resources</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Variance and Short-Term Luck</h3>
                <p className="text-sm">
                  In the short term, variance (luck) can overcome the house edge, allowing some players to win. This
                  creates the illusion that betting systems work or that some players are "luckier" than others.
                </p>
                <p className="text-sm mt-2">However, as the number of bets increases:</p>
                <ul className="text-sm mt-1 space-y-1 list-disc pl-5">
                  <li>Variance decreases relative to the expected value</li>
                  <li>Results converge toward the mathematical expectation</li>
                  <li>The house edge becomes the dominant factor</li>
                  <li>The probability of being ahead approaches zero</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">The Only Winning Strategy</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  From a mathematical perspective, the only winning strategy in games with a house edge is not to play,
                  or to play for entertainment value only with a budget you're comfortable losing.
                </p>
                <p className="text-sm mt-2 text-blue-700 dark:text-blue-400">
                  If you do choose to gamble, set strict limits on time and money, and never chase losses. Remember that
                  the house edge ensures that, in the long run, the house always wins.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
