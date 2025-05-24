import React, { useState, useEffect } from 'react';
import { BUTTON_BASE_STYLES, BUTTON_VARIANT_STYLES, ButtonVariant } from '../../constants/button';

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  useEffect(() => {
    const timeouts = ripples.map((ripple) =>
      setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, 800)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [ripples]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { x, y, id: Date.now() }]);

    if (onClick) {
      onClick(e);
    }
  };

  // Using extracted constants from button.ts

  const widthStyles = fullWidth ? 'w-full' : '';

  const buttonClasses = `${BUTTON_BASE_STYLES} ${BUTTON_VARIANT_STYLES[variant]} ${widthStyles} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {children}
    </button>
  );
};