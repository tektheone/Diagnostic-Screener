import React from 'react';
import { Icon, IconProps } from './Icon';

export const ClipboardIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
      />
    </Icon>
  );
};
