import React from 'react';
import { Button } from '../atoms';
import { ChevronLeftIcon, ChevronRightIcon } from '../atoms/icons';

interface QuestionNavigationProps {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  isFirstQuestion,
  isLastQuestion,
  hasAnswer,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`px-6 py-2 ${isFirstQuestion ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
        aria-label="Previous question"
      >
        <div className="flex items-center space-x-2">
          <ChevronLeftIcon className="w-5 h-5 text-gray-900 dark:text-white" />
          <span>Previous</span>
        </div>
      </Button>
      <Button
        variant="primary"
        onClick={onNext}
        disabled={!hasAnswer}
        className={`px-6 py-2 ${!hasAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={isLastQuestion ? 'Submit answers' : 'Next question'}
      >
        <div className="flex items-center space-x-2">
          <span>{isLastQuestion ? 'Submit' : 'Next'}</span>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </Button>
    </div>
  );
};
