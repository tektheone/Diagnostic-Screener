import React from 'react';
import { Icon, IconProps } from './Icon';

export const SystemIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </Icon>
  );
};
