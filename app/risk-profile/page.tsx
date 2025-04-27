"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight } from "lucide-react"

export default function RiskProfile() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: "How often do you typically place bets?",
      options: [
        { value: "1", label: "Daily or multiple times per week" },
        { value: "2", label: "Once a week" },
        { value: "3", label: "A few times a month" },
        { value: "4", label: "Rarely (a few times a year)" },
      ],
    },
    {
      question: "What percentage of your monthly income do you spend on betting?",
      options: [
        { value: "1", label: "More than 10%" },
        { value: "2", label: "5-10%" },
        { value: "3", label: "1-5%" },
        { value: "4", label: "Less than 1%" },
      ],
    },
    {
      question: "How do you feel when you lose a bet?",
      options: [
        { value: "1", label: "Very upset, it affects my mood for days" },
        { value: "2", label: "Disappointed and immediately want to win it back" },
        { value: "3", label: "Slightly disappointed but I move on quickly" },
        { value: "4", label: "I see it as part of the entertainment cost" },
      ],
    },
    {
      question: "Do you keep track of your betting wins and losses?",
      options: [
        { value: "4", label: "Yes, I track everything meticulously" },
        { value: "3", label: "I have a general idea of my overall performance" },
        { value: "2", label: "I remember my big wins but not my losses" },
        { value: "1", label: "I don't track my betting history at all" },
      ],
    },
    {
      question: "Have you ever borrowed money or used credit to place bets?",
      options: [
        { value: "1", label: "Yes, frequently" },
        { value: "2", label: "Yes, occasionally" },
        { value: "3", label: "Yes, but only once or twice" },
        { value: "4", label: "No, never" },
      ],
    },
  ]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateRiskScore = () => {
    let total = 0
    Object.values(answers).forEach((value) => {
      total += Number.parseInt(value)
    })
    return total
  }

  const getRiskProfile = (score: number) => {
    const maxScore = questions.length * 4
    const percentage = (score / maxScore) * 100

    if (percentage >= 80)
      return {
        level: "Low Risk",
        color: "bg-green-500",
        description:
          "Your betting habits appear to be healthy and controlled. You're likely betting for entertainment and within your means.",
        advice:
          "Continue to bet responsibly and maintain your disciplined approach. Consider setting aside your winnings in a separate account.",
      }
    else if (percentage >= 60)
      return {
        level: "Moderate Risk",
        color: "bg-yellow-500",
        description:
          "Your betting is generally controlled, but there may be some areas where you could improve your habits.",
        advice:
          "Consider setting stricter limits on your betting frequency or amounts. Track your betting more carefully to maintain awareness.",
      }
    else if (percentage >= 40)
      return {
        level: "Medium-High Risk",
        color: "bg-orange-500",
        description: "Your betting habits show some concerning patterns that could lead to problems if not addressed.",
        advice:
          "Take a break from betting to reassess your habits. Set up strict deposit limits and consider talking to someone about your betting.",
      }
    else
      return {
        level: "High Risk",
        color: "bg-red-500",
        description: "Your betting patterns suggest you may be developing or already have a gambling problem.",
        advice:
          "We strongly recommend seeking help from a gambling addiction specialist. Consider self-exclusion from betting platforms.",
      }
  }

  const riskScore = calculateRiskScore()
  const riskProfile = getRiskProfile(riskScore)
  const maxScore = questions.length * 4
  const scorePercentage = (riskScore / maxScore) * 100

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">📊 Risk Profile Assessment</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Answer a few questions about your betting habits to understand your risk profile and get personalized advice.
      </p>

      {!showResults ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
            <CardDescription>{questions[currentQuestion].question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer} className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentQuestion]} className="gap-2">
              {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your Betting Risk Profile</CardTitle>
            <CardDescription>Based on your answers, we've assessed your betting risk level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>High Risk</span>
                <span>Low Risk</span>
              </div>
              <Progress value={scorePercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Problematic</span>
                <span>Concerning</span>
                <span>Moderate</span>
                <span>Healthy</span>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full ${riskProfile.color}`}></div>
                <h3 className="font-semibold">{riskProfile.level}</h3>
              </div>
              <p className="text-sm mb-4">{riskProfile.description}</p>
              <div className="flex items-start gap-2 text-sm bg-muted p-3 rounded">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p>{riskProfile.advice}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">What This Means</h3>
              <p className="text-sm text-muted-foreground">
                This assessment is based on common risk factors associated with problem gambling. It's not a clinical
                diagnosis, but it can help you understand your betting habits better.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Next Steps</h3>
              <ul className="text-sm space-y-1">
                <li>• Review your betting history and set clear limits</li>
                <li>• Consider using BetWise's Loss Simulator to see the long-term impact</li>
                <li>• Try the SmartPlay mode to practice responsible betting</li>
                {scorePercentage < 60 && (
                  <li className="text-red-500 dark:text-red-400">
                    • Consider speaking with a gambling addiction specialist
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowResults(false)
                setCurrentQuestion(0)
                setAnswers({})
              }}
              className="w-full"
            >
              Retake Assessment
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
