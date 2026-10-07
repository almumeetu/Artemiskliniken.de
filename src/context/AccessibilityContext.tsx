import React, { createContext, useContext, useState, useEffect } from 'react';
import { TextSize } from '../types';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Text size classes
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
    
    // High contrast class
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Reduce motion
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [textSize, highContrast, reduceMotion]);

  const resetAccessibility = () => {
    setTextSize('normal');
    setHighContrast(false);
    setReduceMotion(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
