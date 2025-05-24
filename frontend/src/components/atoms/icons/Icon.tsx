import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      {props.children}
    </svg>
  );
};
