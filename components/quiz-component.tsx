"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QuizQuestion {
  id: number
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    explanation: string
  }[]
}

interface QuizComponentProps {
  title: string
  description: string
  questions: QuizQuestion[]
}

export default function QuizComponent({ title, description, questions }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (optionId: string) => {
    if (!hasAnswered) {
      setSelectedOption(optionId)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedOption || hasAnswered) return

    const isCorrect = currentQuestion.options.find((option) => option.id === selectedOption)?.isCorrect || false

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnswers({ ...answers, [currentQuestion.id]: selectedOption })
    setHasAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setHasAnswered(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setHasAnswered(false)
    setScore(0)
    setQuizCompleted(false)
    setAnswers({})
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "Excellent! You have a strong understanding of betting myths."
    if (percentage >= 70) return "Good job! You understand most betting myths, but there's still room to learn."
    if (percentage >= 50) return "You have a basic understanding of betting myths, but should review the material."
    return "You might want to review the betting myths section to improve your understanding."
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>
                  Score: {score}/{currentQuestionIndex + (hasAnswered ? 1 : 0)}
                </span>
              </div>
              <Progress value={((currentQuestionIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100} />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              <RadioGroup value={selectedOption || ""} className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.id
                  const showCorrect = hasAnswered && option.isCorrect
                  const showIncorrect = hasAnswered && isSelected && !option.isCorrect

                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex items-start space-x-2 rounded-md border p-3 cursor-pointer transition-colors",
                        isSelected && !hasAnswered && "border-primary bg-primary/5",
                        showCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20",
                        showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950/20",
                      )}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} disabled={hasAnswered} className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor={option.id}
                          className={cn(
                            "flex justify-between font-normal",
                            showCorrect && "text-green-600 dark:text-green-400",
                            showIncorrect && "text-red-600 dark:text-red-400",
                          )}
                        >
                          <span>{option.text}</span>
                          {hasAnswered && (
                            <span>
                              {option.isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                              ) : isSelected ? (
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                              ) : null}
                            </span>
                          )}
                        </Label>
                        {hasAnswered && ((isSelected && !option.isCorrect) || option.isCorrect) && (
                          <p className="text-sm mt-2 text-muted-foreground">{option.explanation}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-lg mb-4">
              Your score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
            <p className="mb-6 text-muted-foreground">{getScoreMessage()}</p>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id]
                const correctAnswer = question.options.find((o) => o.isCorrect)
                const isCorrect = question.options.find((o) => o.id === userAnswer)?.isCorrect

                return (
                  <div key={question.id} className="text-left p-4 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          Question {index + 1}: {question.question}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="text-muted-foreground">Your answer: </span>
                          <span
                            className={
                              isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            }
                          >
                            {question.options.find((o) => o.id === userAnswer)?.text || "No answer"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mt-1">
                            <span className="text-muted-foreground">Correct answer: </span>
                            <span className="text-green-600 dark:text-green-400">{correctAnswer?.text}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!quizCompleted ? (
          <>
            {hasAnswered ? (
              <Button onClick={handleNextQuestion} className="ml-auto">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            ) : (
              <Button onClick={handleSubmitAnswer} disabled={!selectedOption} className="ml-auto">
                Submit Answer
              </Button>
            )}
          </>
        ) : (
          <Button onClick={resetQuiz} className="mx-auto" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
