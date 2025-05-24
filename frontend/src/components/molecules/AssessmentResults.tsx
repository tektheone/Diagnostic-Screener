import React from 'react';
import { AssessmentResult } from '../../interfaces/screener';
import { Button } from '../atoms';
import { CheckIcon, DocumentIcon, ClipboardIcon, ExternalLinkIcon, RefreshIcon } from '../atoms/icons';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onReset: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ result, onReset }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 transition-colors">
      <div className="flex items-center mb-6">
        <div className="rounded-full bg-green-100 p-3 mr-4">
          <CheckIcon className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended Assessments</h3>
      </div>
      <div className="space-y-4">
        {result.results.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
            <DocumentIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">No assessments recommended</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on your responses, no additional assessments are needed at this time.</p>
          </div>
        ) : (
          result.results.map((assessment, index) => (
            <a
              key={assessment}
              href="https://www.blueprint.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={`Begin ${assessment} assessment`}
            >
              <Button
                variant="secondary"
                fullWidth
                className="p-4 bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-300 animate-scaleIn group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ClipboardIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {assessment}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">Click to begin a assessment</p>
                      <ExternalLinkIcon className="w-4 h-4 ml-2 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </Button>
            </a>
          ))
        )}
      </div>
      <div className="mt-12 border-t pt-8">
        <Button
          variant="primary"
          onClick={onReset}
          className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 animate-bounce-in"
        >
          <div className="flex items-center justify-center space-x-2">
            <RefreshIcon className="w-5 h-5" />
            <span>Start New Screening</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
