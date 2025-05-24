import React, { useMemo } from 'react';
import { Question, AnswerOption, Answer } from '../../interfaces/screener';
import { Radio } from '../atoms';

interface QuestionFormProps {
  currentQuestion: Question;
  answerOptions: AnswerOption[];
  currentAnswer?: Answer;
  onAnswer: (answer: AnswerOption) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  currentQuestion,
  answerOptions,
  currentAnswer,
  onAnswer
}) => {
  // Memoize the answer options to prevent unnecessary re-renders
  const memoizedAnswerOptions = useMemo(() => {
    return answerOptions;
  }, [answerOptions]);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 transition-colors">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        {currentQuestion.title}
      </h2>
      <div className="space-y-4" role="radiogroup" aria-labelledby={`question-${currentQuestion.question_id}`}>
        {memoizedAnswerOptions.map((option: AnswerOption) => (
          <div
            key={option.value}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer animate-fadeIn"
            onClick={() => onAnswer(option)}
          >
            <Radio
              label={option.title}
              checked={currentAnswer?.value === option.value}
              onChange={() => onAnswer(option)}
              id={`option-${option.value}`}
              name={`question-${currentQuestion.question_id}`}
              aria-checked={currentAnswer?.value === option.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
