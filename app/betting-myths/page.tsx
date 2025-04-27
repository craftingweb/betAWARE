import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  BadgeInfo,
  BarChart,
  Brain,
  Clock,
  Coins,
  DollarSign,
  Lightbulb,
  TrendingDown,
} from "lucide-react"

export default function BettingMyths() {
  const myths = [
    {
      id: "hot-streak",
      title: "The Hot Streak Fallacy",
      icon: TrendingDown,
      description: "Why winning streaks don't predict future success",
      content: (
        <div className="space-y-4">
          <p>
            Many bettors believe that if they've won several bets in a row, they're on a "hot streak" and more likely to
            win their next bet. This is a cognitive bias called the "hot hand fallacy."
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>
            Each bet is an independent event. Previous wins have absolutely no influence on future outcomes. Bookmakers
            rely on this misunderstanding to encourage more betting after wins.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Example
            </h4>
            <p className="text-sm mt-2">
              If you flip a fair coin and get heads 5 times in a row, the probability of getting heads on the 6th flip
              is still exactly 50%. The coin has no "memory" of previous flips.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: The Basketball Shooting Study</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    In 1985, psychologists Gilovich, Vallone, and Tversky analyzed thousands of basketball shots by the
                    Philadelphia 76ers to test the "hot hand" theory.
                  </p>
                  <p>Despite players and fans strongly believing in hot streaks, the data showed that:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>A player who made their previous shot was no more likely to make their next shot</li>
                    <li>Shooting "streaks" occurred at the same frequency that would be expected by random chance</li>
                    <li>
                      Players who had made several shots in a row were actually slightly less likely to make their next
                      shot (possibly due to overconfidence or taking more difficult shots)
                    </li>
                  </ul>
                  <p className="italic mt-2">
                    This study has been replicated many times across different sports with the same conclusion: hot
                    streaks are largely a product of human pattern recognition, not statistical reality.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: "chase-losses",
      title: "Chasing Losses",
      icon: ArrowRight,
      description: "Why trying to recover losses leads to bigger problems",
      content: (
        <div className="space-y-4">
          <p>
            After losing a bet, many bettors feel the need to place another bet immediately to "win back" their losses.
            This behavior is known as "chasing losses" and is one of the most dangerous betting patterns.
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>Chasing losses typically leads to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Making larger bets than usual</li>
            <li>Taking on higher-risk bets with worse odds</li>
            <li>Making emotional rather than rational decisions</li>
            <li>Betting more frequently than planned</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Warning Sign
            </h4>
            <p className="text-sm mt-2">
              If you find yourself increasing your bet size after losses or betting on sports/teams you know little
              about just to "get back to even," you're chasing losses and should take a break.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: The Martingale System Failure</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    The Martingale system is a classic example of loss chasing. It suggests doubling your bet after each
                    loss, so when you eventually win, you recover all previous losses plus a small profit.
                  </p>
                  <p>
                    In 2015, a study of 565 online gamblers found that 56% had used the Martingale system. Among those
                    users:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>94% lost money in the long run</li>
                    <li>The average loss was 5.2 times their initial bankroll</li>
                    <li>Those who used the system longer lost more money</li>
                  </ul>
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 rounded-md">
                    <p className="font-medium">Why It Fails:</p>
                    <p>
                      Starting with a $10 bet, after just 8 consecutive losses, you would need to bet $2,560 to recover.
                      Most people run out of money or hit table limits before the system can work.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: "systems",
      title: "Betting Systems Don't Work",
      icon: BadgeInfo,
      description: "Why mathematical betting systems fail in the long run",
      content: (
        <div className="space-y-4">
          <p>
            Many bettors believe they can beat the bookmakers by using betting systems like the Martingale (doubling
            your bet after each loss) or other progressive betting strategies.
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>
            No betting system can overcome the mathematical edge that bookmakers build into their odds. All betting
            systems eventually fail because:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>They require infinite bankroll (which no one has)</li>
            <li>They don't change the underlying probability of winning</li>
            <li>Bookmakers impose betting limits that prevent system scaling</li>
            <li>The house edge ensures long-term losses</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Mathematical Fact
            </h4>
            <p className="text-sm mt-2">
              If a bookmaker offers odds that represent a 52.4% advantage to them (typical in sports betting with -110
              odds), no combination of bets can overcome this edge in the long run.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: The D'Alembert System</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    The D'Alembert system is considered "safer" than Martingale because it increases bets more gradually
                    after losses (by one unit instead of doubling).
                  </p>
                  <p>
                    A 2018 computer simulation tested the D'Alembert system on roulette with 10,000 players over 1,000
                    spins each:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>100% of simulated players lost money in the long run</li>
                    <li>The average player lost 30% of their bankroll</li>
                    <li>
                      Some players appeared to be winning after hundreds of spins, creating the illusion of success
                    </li>
                    <li>By spin 1,000, even the "luckiest" players had negative returns</li>
                  </ul>
                  <p className="italic mt-2">
                    The simulation demonstrated that temporary success creates the illusion that the system works, but
                    the house edge eventually catches up to everyone.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: "due",
      title: 'The "Due for a Win" Fallacy',
      icon: BadgeInfo,
      description: "Why losing streaks don't make wins more likely",
      content: (
        <div className="space-y-4">
          <p>
            Many bettors believe that if a team has lost several games in a row, they're "due" for a win. Similarly, if
            a roulette wheel has landed on black several times, some believe red is "due" to come up.
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>
            This is known as the "Gambler's Fallacy" - the mistaken belief that if something happens more frequently
            than normal during a given period, it will happen less frequently in the future (or vice versa).
          </p>
          <p className="mt-2">
            Random events don't "balance out" in the short term. Each event is independent of previous outcomes.
          </p>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Historical Example
            </h4>
            <p className="text-sm mt-2">
              In 1913 at the Monte Carlo Casino, the roulette ball fell on black 26 times in a row. Millions were lost
              as players kept betting on red, believing it was "due" to appear.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: Lottery Number Selection</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    A study of lottery players in multiple countries found that many avoid selecting numbers that came
                    up in recent drawings, believing they're less likely to appear again soon.
                  </p>
                  <p>Analysis of player behavior revealed:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Numbers that had recently won were selected 20-30% less frequently by players in the following
                      weeks
                    </li>
                    <li>Numbers that hadn't appeared for a long time were selected up to 25% more frequently</li>
                    <li>Players would pay premium prices for tickets with "overdue" numbers</li>
                  </ul>
                  <p className="mt-2">
                    This behavior creates an opportunity: if you select recently drawn numbers, you're more likely to
                    win unshared jackpots because fewer people choose those numbers.
                  </p>
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                    <p className="font-medium">The Math:</p>
                    <p>
                      In a fair lottery, each number combination has exactly the same probability of being drawn in
                      every drawing, regardless of past results.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: "near-miss",
      title: "The Near-Miss Effect",
      icon: Brain,
      description: "How close calls trick your brain into continuing to bet",
      content: (
        <div className="space-y-4">
          <p>
            A "near-miss" occurs when you almost win - like when two matching symbols appear on a slot machine with the
            third just missing, or when your team loses by a single point against the spread.
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>
            Near-misses trigger the same reward pathways in your brain as actual wins, creating the illusion that you're
            "getting closer" to winning. In reality:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A near-miss is still a complete loss</li>
            <li>Near-misses don't increase your chances of winning next time</li>
            <li>Gambling machines and games are specifically designed to produce frequent near-misses</li>
            <li>This psychological trick keeps people playing longer than they intended</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Brain Science
            </h4>
            <p className="text-sm mt-2">
              Brain imaging studies show that near-misses activate many of the same neural circuits as wins, despite
              being objective losses. This creates a false sense of progress and encourages continued betting.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: Slot Machine Design</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    Modern slot machines are programmed to produce near-misses at a rate far higher than would occur by
                    random chance.
                  </p>
                  <p>A 2014 analysis of slot machine programming revealed:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Near-misses occurred up to 12 times more frequently than statistical probability would predict
                    </li>
                    <li>
                      Players who experienced near-misses played 30% longer than those who experienced only clear losses
                    </li>
                    <li>The most effective near-miss rate was found to be around 30% of spins</li>
                    <li>
                      Players reported feeling "closer to winning" after near-misses despite no actual improvement in
                      odds
                    </li>
                  </ul>
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                    <p className="font-medium">Protection Strategy:</p>
                    <p>
                      When you experience a near-miss, consciously remind yourself: "This is a complete loss designed to
                      make me keep playing. The machine is working exactly as intended."
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      id: "sunk-cost",
      title: "The Sunk Cost Fallacy",
      icon: Clock,
      description: "Why 'I've already lost so much' leads to more losses",
      content: (
        <div className="space-y-4">
          <p>
            The sunk cost fallacy occurs when bettors continue to bet (or increase their bets) because they've already
            invested time and money, rather than because the bet itself is good.
          </p>

          <h4 className="text-lg font-medium mt-4">The Reality:</h4>
          <p>
            Money you've already lost is gone and should have no bearing on your current betting decisions. Each new bet
            should be evaluated on its own merits.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Previous losses are irrelevant to the probability of winning future bets</li>
            <li>Betting more to "make up for" past losses typically leads to even bigger losses</li>
            <li>The phrase "I've already put so much into this" is a warning sign you're falling for this fallacy</li>
          </ul>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <h4 className="flex items-center gap-2 font-medium">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Warning Sign
            </h4>
            <p className="text-sm mt-2">
              If you find yourself thinking "I can't quit now after losing so much," that's exactly when you should stop
              and take a break.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="case-study-1">
              <AccordionTrigger>Case Study: The World Series of Poker</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>
                    Professional poker players are trained to avoid the sunk cost fallacy, while amateurs frequently
                    fall victim to it.
                  </p>
                  <p>Analysis of World Series of Poker tournaments shows:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Amateur players who had already invested heavily in a pot were 42% more likely to call bets with
                      weak hands than professionals
                    </li>
                    <li>
                      Professionals focused only on their current hand odds and pot odds, regardless of previous
                      investments
                    </li>
                    <li>Amateurs frequently used phrases like "I'm pot committed" to justify poor decisions</li>
                    <li>
                      This difference in decision-making was one of the strongest predictors of tournament success
                    </li>
                  </ul>
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-md">
                    <p className="font-medium">Pro Tip:</p>
                    <p>
                      Before making any bet, ask yourself: "Would I make this same bet if I had just walked in the door
                      with fresh money?" If the answer is no, you're likely falling for the sunk cost fallacy.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">💡 Betting Risks Exposed</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Learn why common betting strategies don't work and how bookmakers maintain their edge over time.
      </p>

      <Alert className="mb-8 max-w-4xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Understanding these myths can save you money</AlertTitle>
        <AlertDescription>
          Bookmakers and casinos rely on these psychological biases to maintain their profits. Learning to recognize
          them is your first defense against costly betting mistakes.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center mb-6 max-w-4xl">
        <h2 className="text-2xl font-semibold">Common Betting Myths</h2>
        <Button asChild>
          <Link href="/betting-myths/quiz">
            Test Your Knowledge
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="ml-2">
          <Link href="/betting-visualizations">
            View Odds Visualizations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="hot-streak" className="max-w-4xl">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 h-auto gap-2 mx-auto w-full max-w-3xl">
          {myths.map((myth) => (
            <TabsTrigger key={myth.id} value={myth.id} className="py-3 h-auto text-xs md:text-sm">
              {myth.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {myths.map((myth) => (
          <TabsContent key={myth.id} value={myth.id} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <myth.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{myth.title}</CardTitle>
                    <CardDescription>{myth.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{myth.content}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">The House Always Wins: Understanding the Math</h2>
        <p className="text-muted-foreground mb-6">
          Bookmakers and casinos are businesses, not charities. They build a mathematical edge into every bet.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>The Bookmaker's Edge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                In a fair bet on a coin flip, you'd get 2.0 (even money) odds. But bookmakers typically offer:
              </p>
              <div className="grid grid-cols-2 gap-4 text-center mb-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">Heads: 1.91</p>
                  <p className="text-sm text-muted-foreground">(American: -110)</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">Tails: 1.91</p>
                  <p className="text-sm text-muted-foreground">(American: -110)</p>
                </div>
              </div>
              <p>
                This creates a 4.8% edge for the bookmaker. No betting system can overcome this built-in advantage over
                time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Most Bettors Lose</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Studies show that 97% of sports bettors lose money in the long run. This happens because:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>The mathematical edge works against them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Emotional decisions override rational thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Cognitive biases lead to poor betting choices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Chasing losses accelerates the rate of loss</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Expected Value Explained
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Expected Value (EV) is the mathematical concept that explains why betting systems fail. For any bet:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-center mb-2">
                  EV = (Probability of Winning × Amount Won) - (Probability of Losing × Amount Lost)
                </p>
              </div>
              <p>With a typical sports bet at -110 odds:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You bet $110 to win $100</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>True probability of winning: 50%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>EV = (0.5 × $100) - (0.5 × $110) = $50 - $55 = -$5</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                This means for every $110 bet, you'll lose $5 on average over time. No betting system can change this
                fundamental math.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                The Kelly Criterion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Professional gamblers use the Kelly Criterion to determine optimal bet sizing when they do have an edge:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-center mb-2">Optimal Bet % = (bp - q) / b</p>
                <p className="text-sm text-center">
                  Where: b = odds - 1, p = probability of winning, q = probability of losing
                </p>
              </div>
              <p>
                Even with a genuine edge, the Kelly Criterion typically recommends betting only a small percentage of
                your bankroll:
              </p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Example:</span> If you have a 55% chance of winning a bet with even
                  money odds (2.0), the Kelly Criterion recommends betting just 10% of your bankroll.
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                This explains why professional bettors are so conservative with their bankroll management, even when
                they have an edge.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Real-World Case Study: The MIT Blackjack Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The MIT Blackjack Team is often cited as proof that gambling systems can work. However, their success
                actually reinforces why most betting systems fail:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">What They Did:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>Used card counting to identify when the odds shifted in their favor</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>Only bet heavily when they had a mathematical edge</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>Used sophisticated team play to avoid detection</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>Treated it as a full-time job with extensive training</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Why It Worked:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>They found a rare situation where the house edge could be reversed</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>They used strict bankroll management (similar to Kelly Criterion)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>They only played when they had a positive expected value</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span>Casinos eventually changed rules to eliminate their edge</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg mt-2">
                <p className="font-medium mb-2">The Lesson:</p>
                <p className="text-sm">
                  The MIT team's success required finding a mathematical edge, extensive training, and disciplined
                  bankroll management. They weren't using a "system" to overcome a house edge - they were exploiting
                  specific situations where the edge temporarily shifted in their favor.
                </p>
                <p className="text-sm mt-2">
                  This is fundamentally different from betting systems that claim to overcome a persistent house edge
                  through bet sizing or patterns.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
