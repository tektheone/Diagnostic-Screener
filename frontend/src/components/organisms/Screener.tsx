import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Answer, Question, AnswerOption, AssessmentResult } from '../../interfaces/screener';
import { screenerService } from '../../services/screenerService';
import { AssessmentResults, QuestionForm, QuestionNavigation } from '../molecules';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-40 animate-pulse">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      <div>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
          Progress
        </span>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold inline-block text-blue-600">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
      <div
        style={{ width: `${progress}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
      ></div>
    </div>
  </div>
);

const Screener: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isRestarting, setIsRestarting] = useState(false);

  const { data: screener, isLoading, error } = useQuery({
    queryKey: ['screener'],
    queryFn: () => screenerService.getScreener()
  });

  const { data: result, mutate, reset: resetMutation } = useMutation({
    mutationFn: (answers: Answer[]) => screenerService.submitScreener(answers),
    onSuccess: (data: AssessmentResult) => {
      // Assessment completed successfully
    }
  });

  // Initialize answers with first option for each question
  const initializeAnswers = useCallback((questions: Question[], options: AnswerOption[]) => {
    const initialAnswers = questions.map(question => ({
      question_id: question.question_id,
      value: options[0].value // Use first option for each question
    }));
    setAnswers(initialAnswers);
  }, []);

  useEffect(() => {
    if (screener?.content?.sections?.[0]) {
      const { questions, answers: options } = screener.content.sections[0];
      if (questions && options && answers.length === 0) {
        initializeAnswers(questions, options);
      }
    }
  }, [screener, answers.length, initializeAnswers]);

  // Prepare derived values that might be needed
  const questionsData = screener?.content?.sections?.[0]?.questions || [];
  const currentQuestionData = questionsData[currentQuestionIndex] || null;
  
  // Memoize derived values to prevent unnecessary re-renders
  const currentAnswer = useMemo(() => {
    if (!currentQuestionData) return undefined;
    return answers.find(a => a.question_id === currentQuestionData.question_id);
  }, [answers, currentQuestionData]);
  
  const isFirstQuestion = useMemo(() => currentQuestionIndex === 0, [currentQuestionIndex]);
  const isLastQuestion = useMemo(() => currentQuestionIndex === questionsData.length - 1, [currentQuestionIndex, questionsData]);
  
  // Calculate progress only if we have questions
  const progress = questionsData.length > 0 ? ((currentQuestionIndex + 1) / questionsData.length) * 100 : 0;

  // Handle loading and error states
  if (isLoading || isRestarting) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-red-500">Error loading screener. Please try again later.</div>;
  if (!screener) return null;
  if (!screener?.content?.sections?.[0]) return null;

  const { questions, answers: answerOptions } = screener.content.sections[0];
  const currentQuestion = questions[currentQuestionIndex];

  // Reset the screener to start over
  const resetScreener = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsRestarting(true);
    resetMutation();
    setTimeout(() => setIsRestarting(false), 300);
  };

  // Handle user selecting an answer
  const handleAnswer = (answer: AnswerOption) => {
    if (!screener) return;
    const newAnswer: Answer = {
      question_id: currentQuestion.question_id,
      value: answer.value,
    };

    // Update or add the answer for current question
    const existingAnswerIndex = answers.findIndex(a => a.question_id === currentQuestion.question_id);
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      mutate(answers);
    }
  };

  // Render results if assessment is complete
  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6 animate-slideIn dark:bg-gray-900 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Assessment Complete</h2>
        </div>
        <AssessmentResults result={result} onReset={resetScreener} />
      </div>
    );
  }

  // Render the question form
  return (
    <div className="max-w-2xl mx-auto p-6 animate-fadeIn transition-colors">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 dark:text-white">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{screener.content.display_name}</h1>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <QuestionForm
        currentQuestion={currentQuestion}
        answerOptions={answerOptions}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
      />

      <div className="mt-6">
        <QuestionNavigation
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          hasAnswer={!!currentAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default Screener;