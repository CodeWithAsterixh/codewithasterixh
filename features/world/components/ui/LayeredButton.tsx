'use client';

import React from 'react';
import { Icon as PhosphorIcon } from '@phosphor-icons/react';

export type LayeredButtonVariant = 'primary' | 'secondary' | 'mint' | 'cyan' | 'amber' | 'slate' | 'danger';

interface LayeredButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LayeredButtonVariant;
  icon?: PhosphorIcon;
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  active?: boolean;
}

export const LayeredButton: React.FC<LayeredButtonProps> = ({
  variant = 'primary',
  icon: Icon,
  iconWeight = 'duotone',
  children,
  size = 'md',
  className = '',
  disabled,
  active,
  ...props
}) => {
  // Use button2 (Cyan Ice Crystal) for active/primary and button1 (Purple Slate Stone) for secondary/slate
  const isCyan = variant === 'primary' || variant === 'cyan' || variant === 'mint' || active;
  const bgImage = isCyan ? '/btns/button2_tight.png' : '/btns/button1_tight.png';
  const textColor = isCyan ? 'text-[#062c3f]' : 'text-[#f5edf9]';

  const sizeClasses = {
    sm: 'px-3.5 py-1 text-[11px] gap-1.5 min-h-[30px]',
    md: 'px-5 py-2 text-xs gap-2 min-h-[38px]',
    lg: 'px-6 py-2.5 text-sm gap-2.5 min-h-[46px]',
  }[size];

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 17,
  }[size];

  return (
    <button
      disabled={disabled}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
      className={`
        relative inline-flex items-center justify-center font-extrabold tracking-wide
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]
        transition-all duration-75 select-none cursor-pointer
        hover:brightness-110 active:translate-y-0.5 active:brightness-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0
        ${textColor} ${sizeClasses} ${className}
      `}
      {...props}
    >
      {Icon && (
        <span className="inline-flex items-center justify-center flex-shrink-0">
          <Icon size={iconSizes} weight={iconWeight} />
        </span>
      )}
      <span className="font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">{children}</span>
    </button>
  );
};
