"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, QuestionAnswer } from "@/types/quiz";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TypographyH3 } from "@/components/ui/custom/typography-h3";

interface StartQuizProps {
    questions: Question[];
    onComplete: (answers: QuestionAnswer[]) => void;
}

type AnswerMap = Record<QuestionAnswer['question'], QuestionAnswer['answer']>;

export default function StartQuiz({ questions, onComplete }: StartQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allAnswers, setAllAnswers] = useState<AnswerMap>({});

    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex / questions.length) * 100;
    const isLastQuestion = currentIndex === questions.length - 1;
    const currentAnswer = allAnswers[currentQuestion.question] || (currentQuestion.type === "multi-select" ? [] : "");

    const updateAnswer = (answer: string | string[]) => {
        setAllAnswers(prev => ({
            ...prev,
            [currentQuestion.question]: answer
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // Convert to final format and complete
            const finalAnswers = questions.map(q => ({
                question: q.question,
                answer: allAnswers[q.question] || ""
            }));
            onComplete(finalAnswers);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const isValid = () => {
        if (currentQuestion.type === "text") {
            return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
        }
        if (currentQuestion.type === "select") {
            return typeof currentAnswer === "string" && currentAnswer.length > 0;
        }
        if (currentQuestion.type === "multi-select") {
            return Array.isArray(currentAnswer) && currentAnswer.length > 0;
        }
        return false;
    };

    const renderInput = () => {
        if (currentQuestion.type === "text") {
            return (
                <div className="space-y-2">
                    <Label htmlFor={currentQuestion.question}>Write answer</Label>
                    <Input
                        id={currentQuestion.question}
                        value={currentAnswer as string}
                        onChange={(e) => updateAnswer(e.target.value)}
                        placeholder="Type your answer..."
                    />
                </div>
            );
        }

        if (currentQuestion.type === "select") {
            return (
                <div className="space-y-3">
                    <Label>Choose one:</Label>
                    <RadioGroup
                        value={currentAnswer as string}
                        onValueChange={updateAnswer}
                    >
                        {currentQuestion.answers.map((answer, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <RadioGroupItem value={answer} id={`option-${i}`} />
                                <Label htmlFor={`option-${i}`} className="cursor-pointer">
                                    {answer}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            );
        }

        if (currentQuestion.type === "multi-select") {
            return (
                <div className="space-y-3">
                    <Label>Choose all that apply:</Label>
                    {currentQuestion.answers.map((answer, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Checkbox
                                checked={(currentAnswer as string[]).includes(answer)}
                                onCheckedChange={(checked) => {
                                    const current = currentAnswer as string[];
                                    updateAnswer(
                                        checked
                                            ? [...current, answer]
                                            : current.filter(a => a !== answer)
                                    );
                                }}
                            />
                            <Label className="cursor-pointer">{answer}</Label>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Question {currentIndex + 1} of {questions.length}</span>
                </div>
                <Progress value={progress} className="w-full" />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <TypographyH3>{currentQuestion.question}</TypographyH3>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {renderInput()}
                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={!isValid()}
                        >
                            {isLastQuestion ? "Generate Course" : "Next"}
                            {isLastQuestion ? "" : <ArrowRight className="h-4 w-4" />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
