import React from 'react';
import { Icon, IconProps } from './Icon';

export const DocumentIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
      />
    </Icon>
  );
};
