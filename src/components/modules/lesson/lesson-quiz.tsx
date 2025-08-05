"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { TypographyH3 } from "@/components/ui/custom/typography-h3";
import { Lesson } from "@/generated/prisma";

// Updated to match your actual type
export type LessonQuizType = {
    id: string;
    question: string;
    options: string[];
    userAnswerIdx: number;
    correctAnswerIdx: number;
}[];

interface QuizResult {
    id: string;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    userAnswerIdx: number;
    correctAnswerIdx: number;
}

type UserAnswers = Record<string, number>; // questionId -> selectedOptionIndex

export default function LessonQuiz({
    lesson,
    onSubmit,
}: {
    lesson: Lesson;
    onSubmit: (answers: UserAnswers) => void
}) {
    const { quiz, completed } = lesson;


    const [isSubmitted, setIsSubmitted] = useState(() => completed);
    const [results, setResults] = useState<QuizResult[]>(() => getResultsInitialValue());
    const [userAnswers, setUserAnswers] = useState<UserAnswers>(() => getUserAnswersInitialValue());


    function getUserAnswersInitialValue() {
        return !completed ? {} : Object.fromEntries(
            quiz.map(({ id, userAnswerIdx }) => [id, userAnswerIdx])
        );
    }

    function getResultsInitialValue() {
        return !completed ? [] : quiz.map((question) => {
            const selectedOptionIndex = question.userAnswerIdx;
            const selectedAnswer = selectedOptionIndex !== undefined
                ? question.options[selectedOptionIndex]
                : "";
            const correctAnswer = question.options[question.correctAnswerIdx];
            const isCorrect = selectedOptionIndex === question.correctAnswerIdx;

            return {
                id: question.id,
                question: question.question,
                selectedAnswer,
                correctAnswer,
                isCorrect,
                userAnswerIdx: selectedOptionIndex ?? -1,
                correctAnswerIdx: question.correctAnswerIdx
            };
        });
    }




    const updateAnswer = (questionId: string, optionIndex: number) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = () => {
        prepareResults(userAnswers);
        onSubmit(userAnswers);
    }

    function prepareResults(userAnswers: UserAnswers) {
        // Calculate results
        const quizResults = quiz.map((question) => {
            const selectedOptionIndex = userAnswers[question.id];
            const selectedAnswer = selectedOptionIndex !== undefined
                ? question.options[selectedOptionIndex]
                : "";
            const correctAnswer = question.options[question.correctAnswerIdx];
            const isCorrect = selectedOptionIndex === question.correctAnswerIdx;

            return {
                id: question.id,
                question: question.question,
                selectedAnswer,
                correctAnswer,
                isCorrect,
                userAnswerIdx: selectedOptionIndex ?? -1,
                correctAnswerIdx: question.correctAnswerIdx
            };
        });

        setResults(quizResults);
        setIsSubmitted(true);
    }

    const isAllAnswered = () => {
        return quiz.every((question) => userAnswers[question.id] !== undefined);
    };

    const getQuestionStatus = (questionId: string) => {
        if (!isSubmitted) return null;
        const result = results.find(r => r.id === questionId);
        return result?.isCorrect ? "correct" : "incorrect";
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <TypographyH3>Lesson Quiz</TypographyH3>
                <p className="text-muted-foreground">
                    Answer all {quiz.length} questions to test your understanding
                </p>
            </div>

            {/* All Questions */}
            <div className="space-y-6">
                {quiz.map((question, questionIndex) => {
                    const selectedAnswer = userAnswers[question.id];
                    const status = getQuestionStatus(question.id);

                    return (
                        <Card key={question.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">
                                        {questionIndex + 1}. {question.question}
                                    </CardTitle>
                                    {status && (
                                        <div className="flex-shrink-0">
                                            {status === "correct" ? (
                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <XCircle className="h-6 w-6 text-red-600" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={selectedAnswer?.toString()}
                                    onValueChange={(value) => updateAnswer(question.id, parseInt(value))}
                                    disabled={isSubmitted}
                                >
                                    {question.options.map((option, optionIndex) => {
                                        const isSelected = selectedAnswer === optionIndex;
                                        const isCorrect = optionIndex === question.correctAnswerIdx;

                                        let optionClassName = "flex items-center space-x-2 p-3 rounded-lg border transition-colors";

                                        // Only highlight individual answer options, not the entire card
                                        if (isSubmitted) {
                                            if (isCorrect) {
                                                // Highlight correct answer in green
                                                optionClassName += " bg-green-100 border-green-300";
                                            } else if (isSelected && !isCorrect) {
                                                // Highlight wrong selected answer in red
                                                optionClassName += " bg-red-100 border-red-300";
                                            } else {
                                                // Normal styling for other options
                                                optionClassName += " border-gray-200";
                                            }
                                        } else if (isSelected) {
                                            optionClassName += " bg-blue-50 border-blue-300";
                                        } else {
                                            optionClassName += " hover:bg-gray-50 border-gray-200";
                                        }

                                        return (
                                            <div key={optionIndex} className={optionClassName}>
                                                <RadioGroupItem
                                                    value={optionIndex.toString()}
                                                    id={`${question.id}-option-${optionIndex}`}
                                                    disabled={isSubmitted}
                                                />
                                                <Label
                                                    htmlFor={`${question.id}-option-${optionIndex}`}
                                                    className={`flex-1 font-normal ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                                                >
                                                    {option}
                                                </Label>
                                                {/* Show icons after submission */}
                                                {isSubmitted && (
                                                    <>
                                                        {isCorrect && (
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        )}
                                                        {isSelected && !isCorrect && (
                                                            <XCircle className="h-4 w-4 text-red-600" />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Submit Button */}
            {!isSubmitted && (
                <div className="flex justify-center">
                    <Button
                        onClick={handleSubmit}
                        disabled={!isAllAnswered()}
                        size="lg"
                        className="min-w-[200px]"
                    >
                        Submit Quiz
                    </Button>
                </div>
            )}

            {/* Results Summary */}
            {isSubmitted && (
                <Card className="bg-gray-50">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <TypographyH3>Quiz Results</TypographyH3>
                            <p className="text-2xl font-bold">
                                {results.filter(r => r.isCorrect).length} / {quiz.length}
                            </p>
                            <p className="text-muted-foreground">
                                {Math.round((results.filter(r => r.isCorrect).length / quiz.length) * 100)}% correct
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
