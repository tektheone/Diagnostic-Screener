import React from 'react';
import { Icon, IconProps } from './Icon';

export const ExternalLinkIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
      />
    </Icon>
  );
};
