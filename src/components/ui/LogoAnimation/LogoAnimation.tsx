'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoIcon } from '@/components/icons/LogoIcon';
import styles from './LogoAnimation.module.scss';

interface LogoAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  autoPlay?: boolean;
  delay?: number;
  onAnimationComplete?: () => void;
}

export default function LogoAnimation({
  className = '',
  size = 'md',
  autoPlay = true,
  delay = 0,
  onAnimationComplete
}: LogoAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        onAnimationComplete?.();
      }, 3200); // 3.2 segundos para la animación de construcción
      
    }, delay);
  };

  useEffect(() => {
    if (autoPlay) {
      startAnimation();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoPlay, delay]);

  const handleClick = () => {
    if (!autoPlay) {
      setIsAnimating(false);
      setTimeout(() => startAnimation(), 50);
    }
  };

  const sizeClasses = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large
  };

  return (
    <div 
      ref={logoRef}
      className={`${styles.logoContainer} ${sizeClasses[size]} ${className} ${isAnimating ? styles.animate : ''}`}
      onClick={handleClick}
    >
      <div className={styles.logoMain}>
        <LogoIcon />
      </div>
    </div>
  );
}
