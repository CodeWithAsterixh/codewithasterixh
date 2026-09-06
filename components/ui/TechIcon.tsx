'use client';

import React from 'react';
import StackIcon from 'tech-stack-icons';
import { STACK_ICON_MAP, renderCustomTechSvg } from './techIconMap';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  variant?: 'light' | 'dark' | 'grayscale';
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = 'w-5 h-5',
  size,
  variant,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const iconKey = name.toLowerCase().trim();
  const stackIconName = STACK_ICON_MAP[iconKey];
  const style = size ? { width: size, height: size } : undefined;

  if (stackIconName) {
    return (
      <figure
        role="img"
        aria-label={`${name} icon`}
        suppressHydrationWarning
        className={`inline-flex items-center justify-center shrink-0 ${className}`}
        style={style}
      >
        {mounted ? (
          <StackIcon name={stackIconName} variant={variant} className="w-full h-full object-contain" />
        ) : (
          <span className="w-full h-full inline-block" />
        )}
      </figure>
    );
  }

  return renderCustomTechSvg(iconKey, className, style);
};
