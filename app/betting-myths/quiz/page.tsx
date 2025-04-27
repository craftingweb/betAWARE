"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuizComponent, { type QuizQuestion } from "@/components/quiz-component"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BettingMythsQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState("basic")

  const basicQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "If you've won 5 bets in a row, what happens to your probability of winning the next bet?",
      options: [
        {
          id: "a",
          text: "It increases because you're on a hot streak",
          isCorrect: false,
          explanation:
            "This is the Hot Streak Fallacy. Each bet is an independent event, and previous outcomes don't affect future probabilities.",
        },
        {
          id: "b",
          text: "It decreases because you're due for a loss",
          isCorrect: false,
          explanation:
            "This is the Gambler's Fallacy. Just as winning streaks don't increase your chances, you're not 'due' for a loss either.",
        },
        {
          id: "c",
          text: "It stays exactly the same",
          isCorrect: true,
          explanation:
            "Correct! Each bet is an independent event. Previous outcomes have no effect on future probabilities.",
        },
        {
          id: "d",
          text: "It depends on the type of bet",
          isCorrect: false,
          explanation:
            "While different bets have different probabilities, the principle of independence applies to all random events in gambling.",
        },
      ],
    },
    {
      id: 2,
      question: "What is the main reason why chasing losses is dangerous?",
      options: [
        {
          id: "a",
          text: "It often leads to making larger, riskier bets than planned",
          isCorrect: true,
          explanation:
            "Correct! Chasing losses typically leads to increasing bet sizes and taking on higher-risk bets with worse odds, creating a dangerous cycle.",
        },
        {
          id: "b",
          text: "It's unlucky to bet after a loss",
          isCorrect: false,
          explanation:
            "There's no such thing as 'luck' in a mathematical sense. The danger comes from the behavioral changes that occur when chasing losses.",
        },
        {
          id: "c",
          text: "Bookmakers can tell when you're chasing losses",
          isCorrect: false,
          explanation:
            "While bookmakers benefit from this behavior, the danger is in how it affects your decision-making, not in bookmakers identifying it.",
        },
        {
          id: "d",
          text: "It takes too much time to recover losses",
          isCorrect: false,
          explanation:
            "The time factor isn't the main issue - it's the escalation of risk and poor decision-making that makes chasing losses dangerous.",
        },
      ],
    },
    {
      id: 3,
      question: "Why do betting systems like the Martingale (doubling after each loss) ultimately fail?",
      options: [
        {
          id: "a",
          text: "They're too complicated for most people to follow correctly",
          isCorrect: false,
          explanation:
            "Most betting systems are actually quite simple to follow. The problem is in their mathematical foundation, not their complexity.",
        },
        {
          id: "b",
          text: "They require an infinite bankroll and have no betting limits",
          isCorrect: true,
          explanation:
            "Correct! Systems like Martingale require an infinite bankroll to guarantee success. In reality, everyone has limited funds and casinos have betting limits.",
        },
        {
          id: "c",
          text: "They only work in certain games",
          isCorrect: false,
          explanation:
            "These systems fail mathematically in all games with a house edge, regardless of the specific game rules.",
        },
        {
          id: "d",
          text: "They're illegal in most casinos",
          isCorrect: false,
          explanation:
            "Betting systems aren't illegal - casinos are happy to let you use them because they know they don't work in the long run.",
        },
      ],
    },
    {
      id: 4,
      question: "What is the 'Gambler's Fallacy'?",
      options: [
        {
          id: "a",
          text: "The belief that gambling always leads to addiction",
          isCorrect: false,
          explanation:
            "While gambling can lead to addiction for some, the Gambler's Fallacy refers specifically to a mistaken belief about probability.",
        },
        {
          id: "b",
          text: "The belief that you can predict the outcome of random events",
          isCorrect: false,
          explanation:
            "While this is a related misconception, the Gambler's Fallacy specifically refers to the belief that past outcomes affect future probabilities.",
        },
        {
          id: "c",
          text: "The belief that if something happens more frequently than normal, it will happen less frequently in the future",
          isCorrect: true,
          explanation:
            "Correct! The Gambler's Fallacy is the mistaken belief that if something happens more (or less) frequently than normal, it will happen less (or more) frequently in the future.",
        },
        {
          id: "d",
          text: "The belief that casinos manipulate games to ensure players lose",
          isCorrect: false,
          explanation:
            "While casinos do have a mathematical edge, they don't need to manipulate individual outcomes - the Gambler's Fallacy is about misunderstanding randomness.",
        },
      ],
    },
    {
      id: 5,
      question: "Why do most sports bettors overestimate their abilities?",
      options: [
        {
          id: "a",
          text: "They don't understand the sport well enough",
          isCorrect: false,
          explanation:
            "Many bettors understand their sport very well, but this doesn't translate to betting success because bookmakers also have this knowledge.",
        },
        {
          id: "b",
          text: "They remember their wins more vividly than their losses",
          isCorrect: true,
          explanation:
            "Correct! This is called 'selective memory' or 'availability bias' - people tend to remember their wins more clearly than their losses, creating an illusion of success.",
        },
        {
          id: "c",
          text: "They don't bet on enough games to be successful",
          isCorrect: false,
          explanation:
            "Betting on more games doesn't improve your edge - in fact, it often exposes you to more situations where the house edge works against you.",
        },
        {
          id: "d",
          text: "They don't use complex enough betting strategies",
          isCorrect: false,
          explanation:
            "Complex strategies don't overcome the fundamental mathematics of betting. The house edge persists regardless of strategy complexity.",
        },
      ],
    },
  ]

  const advancedQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is a 'near-miss' in gambling psychology?",
      options: [
        {
          id: "a",
          text: "When you almost place a bet but decide not to",
          isCorrect: false,
          explanation:
            "A near-miss refers to outcomes that appear close to winning but are actually losses, not decisions about whether to bet.",
        },
        {
          id: "b",
          text: "When you win but get less than expected",
          isCorrect: false,
          explanation: "A near-miss is specifically about losing, not winning a smaller amount than expected.",
        },
        {
          id: "c",
          text: "When the outcome appears close to a win but is actually a loss",
          isCorrect: true,
          explanation:
            "Correct! A near-miss occurs when you almost win (like getting 2 out of 3 matching symbols on a slot machine). These trigger reward pathways in the brain similar to actual wins.",
        },
        {
          id: "d",
          text: "When you bet on the wrong team by mistake",
          isCorrect: false,
          explanation:
            "This would be a mistake in placing your bet, not a near-miss as defined in gambling psychology.",
        },
      ],
    },
    {
      id: 2,
      question: "What is the 'house edge' in gambling?",
      options: [
        {
          id: "a",
          text: "The physical location where the casino manager sits",
          isCorrect: false,
          explanation: "The house edge is a mathematical concept, not a physical location in the casino.",
        },
        {
          id: "b",
          text: "The mathematical advantage the casino has over players",
          isCorrect: true,
          explanation:
            "Correct! The house edge is the built-in mathematical advantage that ensures the casino will win over the long run. It's expressed as a percentage of each bet that the casino expects to keep.",
        },
        {
          id: "c",
          text: "The minimum amount you need to bet",
          isCorrect: false,
          explanation:
            "The minimum bet requirement is separate from the house edge, which refers to the casino's mathematical advantage.",
        },
        {
          id: "d",
          text: "The maximum amount the casino can lose in a day",
          isCorrect: false,
          explanation:
            "Casinos don't have a fixed maximum loss amount - the house edge ensures they'll be profitable over time despite short-term fluctuations.",
        },
      ],
    },
    {
      id: 3,
      question: "What is the 'sunk cost fallacy' in betting?",
      options: [
        {
          id: "a",
          text: "When you bet more because you've already invested time and money",
          isCorrect: true,
          explanation:
            "Correct! The sunk cost fallacy occurs when you continue betting (or increase your bets) because of how much you've already invested, rather than evaluating each new bet on its own merits.",
        },
        {
          id: "b",
          text: "When you lose money on a bet that seemed certain",
          isCorrect: false,
          explanation:
            "This describes disappointment from an unexpected loss, not the sunk cost fallacy which is about decision-making based on past investments.",
        },
        {
          id: "c",
          text: "When the odds are set too low to make a profit",
          isCorrect: false,
          explanation:
            "This would describe poor value in betting odds, not the sunk cost fallacy which is about how past investments affect current decisions.",
        },
        {
          id: "d",
          text: "When you have to pay fees to withdraw your winnings",
          isCorrect: false,
          explanation:
            "Withdrawal fees are a separate concept from the sunk cost fallacy, which is about decision-making psychology.",
        },
      ],
    },
    {
      id: 4,
      question: "In the favorite-longshot bias, which type of bet typically offers worse value?",
      options: [
        {
          id: "a",
          text: "Bets on favorites (lower odds)",
          isCorrect: false,
          explanation:
            "While favorites may sometimes be overvalued, the favorite-longshot bias shows that longshots typically offer worse value.",
        },
        {
          id: "b",
          text: "Bets on longshots (higher odds)",
          isCorrect: true,
          explanation:
            "Correct! The favorite-longshot bias shows that bets on longshots (underdogs with high odds) typically offer worse value, with the house edge often being much larger on these bets.",
        },
        {
          id: "c",
          text: "All bets offer equal value",
          isCorrect: false,
          explanation:
            "Different bets offer different values, with the favorite-longshot bias showing a systematic pattern in how odds are priced.",
        },
        {
          id: "d",
          text: "It depends entirely on the sport",
          isCorrect: false,
          explanation:
            "While there are variations across sports, the favorite-longshot bias has been documented across many different types of betting markets.",
        },
      ],
    },
    {
      id: 5,
      question: "What is 'expected value' (EV) in betting?",
      options: [
        {
          id: "a",
          text: "The amount you expect to win on a bet",
          isCorrect: false,
          explanation:
            "Expected value isn't just about potential winnings - it accounts for both winning and losing possibilities.",
        },
        {
          id: "b",
          text: "The average amount you'll win or lose per bet over the long run",
          isCorrect: true,
          explanation:
            "Correct! Expected value (EV) is the average amount you can expect to win or lose per bet if you placed the same bet many times. It's calculated by multiplying potential outcomes by their probabilities.",
        },
        {
          id: "c",
          text: "The minimum amount you should bet to make a profit",
          isCorrect: false,
          explanation:
            "Expected value doesn't tell you how much to bet - it tells you whether a bet has positive or negative value regardless of bet size.",
        },
        {
          id: "d",
          text: "The maximum amount you could win on a bet",
          isCorrect: false,
          explanation:
            "The maximum win is just one component of expected value, which also accounts for the probability of winning and losing outcomes.",
        },
      ],
    },
    {
      id: 6,
      question: "What does the Kelly Criterion help bettors determine?",
      options: [
        {
          id: "a",
          text: "Which teams are most likely to win",
          isCorrect: false,
          explanation:
            "The Kelly Criterion doesn't predict winners - it helps with bankroll management assuming you already have an edge.",
        },
        {
          id: "b",
          text: "The optimal amount to bet when you have an edge",
          isCorrect: true,
          explanation:
            "Correct! The Kelly Criterion is a formula that helps determine the optimal bet size as a percentage of your bankroll when you have a positive expected value.",
        },
        {
          id: "c",
          text: "Which betting markets offer the best odds",
          isCorrect: false,
          explanation:
            "The Kelly Criterion doesn't compare different betting markets - it helps optimize bet sizing within a market where you have an edge.",
        },
        {
          id: "d",
          text: "When to stop betting for the day",
          isCorrect: false,
          explanation: "The Kelly Criterion is about bet sizing, not about timing your betting sessions.",
        },
      ],
    },
    {
      id: 7,
      question: "What is 'availability bias' in betting?",
      options: [
        {
          id: "a",
          text: "Only betting when you have money available",
          isCorrect: false,
          explanation:
            "Availability bias refers to a cognitive bias about information processing, not about when you have funds available.",
        },
        {
          id: "b",
          text: "Giving too much weight to outcomes that are recent or memorable",
          isCorrect: true,
          explanation:
            "Correct! Availability bias is when bettors overvalue outcomes that come easily to mind (recent, dramatic, or emotionally significant) while undervaluing statistical probabilities.",
        },
        {
          id: "c",
          text: "Only betting on games that are available to watch live",
          isCorrect: false,
          explanation: "This would be a betting preference, not the cognitive bias known as availability bias.",
        },
        {
          id: "d",
          text: "Betting only when certain betting markets are available",
          isCorrect: false,
          explanation:
            "Availability bias refers to how we process information in our minds, not the availability of betting markets.",
        },
      ],
    },
  ]

  const expertQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the mathematical reason why a betting system can't overcome a negative expected value?",
      options: [
        {
          id: "a",
          text: "The Law of Large Numbers",
          isCorrect: true,
          explanation:
            "Correct! The Law of Large Numbers states that as a sample size increases, results will converge to the expected value. No betting pattern can overcome this mathematical reality.",
        },
        {
          id: "b",
          text: "The Pythagorean Theorem",
          isCorrect: false,
          explanation:
            "The Pythagorean Theorem relates to right triangles in geometry and has no relevance to betting systems or probability.",
        },
        {
          id: "c",
          text: "Schrödinger's Equation",
          isCorrect: false,
          explanation: "Schrödinger's Equation is from quantum physics and has no application to gambling mathematics.",
        },
        {
          id: "d",
          text: "The Fibonacci Sequence",
          isCorrect: false,
          explanation:
            "While some betting systems use the Fibonacci sequence to determine bet sizes, it's not the mathematical reason why systems fail.",
        },
      ],
    },
    {
      id: 2,
      question: "In a typical sports bet with -110 odds on both sides, what is the house edge?",
      options: [
        {
          id: "a",
          text: "10%",
          isCorrect: false,
          explanation:
            "This is too high. The calculation for house edge with -110 odds is more complex than simply taking the 10 from -110.",
        },
        {
          id: "b",
          text: "4.76%",
          isCorrect: true,
          explanation:
            "Correct! With -110 odds on both sides, you bet $110 to win $100. The implied probability is 52.38% for each side (totaling 104.76%), giving the house a 4.76% edge.",
        },
        {
          id: "c",
          text: "50%",
          isCorrect: false,
          explanation:
            "This would mean the house keeps half of all money bet, which is far too high. The actual edge is much smaller.",
        },
        {
          id: "d",
          text: "2.38%",
          isCorrect: false,
          explanation:
            "This is half of the actual edge. The full calculation must account for the overround on both sides of the bet.",
        },
      ],
    },
    {
      id: 3,
      question: "What cognitive bias explains why people continue playing after near-misses?",
      options: [
        {
          id: "a",
          text: "Confirmation bias",
          isCorrect: false,
          explanation:
            "Confirmation bias involves favoring information that confirms existing beliefs, which is different from the near-miss effect.",
        },
        {
          id: "b",
          text: "Anchoring bias",
          isCorrect: false,
          explanation:
            "Anchoring bias involves relying too heavily on the first piece of information encountered, which doesn't explain reactions to near-misses.",
        },
        {
          id: "c",
          text: "Reward prediction error",
          isCorrect: true,
          explanation:
            "Correct! Near-misses trigger a reward prediction error in the brain, activating dopamine pathways similar to wins despite being losses, creating an illusion of progress.",
        },
        {
          id: "d",
          text: "Dunning-Kruger effect",
          isCorrect: false,
          explanation:
            "The Dunning-Kruger effect relates to overestimating one's abilities, not to how near-misses affect gambling behavior.",
        },
      ],
    },
    {
      id: 4,
      question: "If a bet has a positive expected value of +5%, what does the Kelly Criterion typically recommend?",
      options: [
        {
          id: "a",
          text: "Bet 5% of your bankroll",
          isCorrect: true,
          explanation:
            "Correct! The Kelly Criterion typically recommends betting a percentage of your bankroll equal to your edge. With a 5% edge, you would bet 5% of your bankroll.",
        },
        {
          id: "b",
          text: "Bet 50% of your bankroll",
          isCorrect: false,
          explanation:
            "This would be far too aggressive. The Kelly Criterion is more conservative and would never recommend risking half your bankroll on a single bet with a small edge.",
        },
        {
          id: "c",
          text: "Bet 100% of your bankroll",
          isCorrect: false,
          explanation:
            "The Kelly Criterion never recommends betting your entire bankroll, as this would risk ruin even with a positive expected value.",
        },
        {
          id: "d",
          text: "Bet a fixed amount regardless of bankroll",
          isCorrect: false,
          explanation:
            "The Kelly Criterion specifically recommends betting a percentage of your bankroll, not a fixed amount, to optimize growth while managing risk.",
        },
      ],
    },
    {
      id: 5,
      question: "What is 'regression to the mean' and how does it affect betting?",
      options: [
        {
          id: "a",
          text: "It's when betting returns become more average over time",
          isCorrect: false,
          explanation: "This is partially correct but doesn't capture the statistical principle accurately.",
        },
        {
          id: "b",
          text: "It's the statistical tendency for extreme performances to be followed by more average ones",
          isCorrect: true,
          explanation:
            "Correct! Regression to the mean is the statistical phenomenon where unusual or extreme measurements tend to be followed by measurements closer to the average. This explains why teams with exceptional performances often perform more averagely in subsequent games.",
        },
        {
          id: "c",
          text: "It's when you lose money and have to bet less next time",
          isCorrect: false,
          explanation:
            "This describes decreasing your bet size after losses, not the statistical principle of regression to the mean.",
        },
        {
          id: "d",
          text: "It's a betting system where you increase bets after losses",
          isCorrect: false,
          explanation:
            "This describes a negative progression betting system like Martingale, not regression to the mean, which is a statistical concept.",
        },
      ],
    },
    {
      id: 6,
      question: "What is 'closing line value' and why do professional bettors consider it important?",
      options: [
        {
          id: "a",
          text: "It's the final score of a game compared to the point spread",
          isCorrect: false,
          explanation:
            "This describes the outcome against the spread, not closing line value, which compares the odds you got to the final odds.",
        },
        {
          id: "b",
          text: "It's the difference between the odds you got and the final odds before the event starts",
          isCorrect: true,
          explanation:
            "Correct! Closing line value (CLV) measures whether you got better odds than were available just before the event started. Consistently beating the closing line is considered a strong indicator of long-term profitability.",
        },
        {
          id: "c",
          text: "It's the amount of money wagered in the final minutes before a game",
          isCorrect: false,
          explanation: "This describes late betting volume, not closing line value, which compares odds movements.",
        },
        {
          id: "d",
          text: "It's the commission charged by bookmakers on winning bets",
          isCorrect: false,
          explanation: "This describes vigorish or juice, not closing line value, which is about odds movement.",
        },
      ],
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/betting-myths">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Betting Myths
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Test Your Knowledge: Betting Risks</h1>
      </div>

      <p className="text-muted-foreground mb-8 max-w-3xl">
        Take these quizzes to test your understanding of betting risks and common fallacies. Each quiz has different
        difficulty levels to challenge your knowledge.
      </p>

      <Tabs value={selectedQuiz} onValueChange={setSelectedQuiz} className="max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Quiz</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Quiz</TabsTrigger>
          <TabsTrigger value="expert">Expert Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="mt-6">
          <QuizComponent
            title="Basic Betting Myths Quiz"
            description="Test your understanding of the most common betting fallacies"
            questions={basicQuestions}
          />
        </TabsContent>
        <TabsContent value="advanced" className="mt-6">
          <QuizComponent
            title="Advanced Betting Myths Quiz"
            description="Challenge yourself with more complex concepts about betting psychology and mathematics"
            questions={advancedQuestions}
          />
        </TabsContent>
        <TabsContent value="expert" className="mt-6">
          <QuizComponent
            title="Expert Betting Myths Quiz"
            description="Test your deep understanding of the mathematics and psychology behind betting"
            questions={expertQuestions}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
