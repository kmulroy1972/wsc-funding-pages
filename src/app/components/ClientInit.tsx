'use client';
import { useEffect } from 'react';

export default function ClientInit() {
  useEffect(() => {
    // Add the class after mount
    document.body.classList.add('clickup-chrome-ext_installed');
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('clickup-chrome-ext_installed');
    };
  }, []);

  return null;
} 