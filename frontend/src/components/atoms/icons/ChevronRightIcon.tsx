import React from 'react';
import { Icon, IconProps } from './Icon';

export const ChevronRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </Icon>
  );
};
