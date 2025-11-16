'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

const DarkModeTest = () => {
  const { theme } = useApp();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-64">
      <div className="text-xs font-mono p-2 bg-white border border-gray-300 rounded">
        <div>Theme: {theme}</div>
        <div>HTML class: {document.documentElement.className}</div>
        <div>Body class: {document.body.className}</div>
      </div>
      
      <div className="p-3 text-white rounded transition-colors duration-300 bg-red-500 dark:bg-green-500">
        Should be: {theme === 'dark' ? 'GREEN' : 'RED'}
      </div>
      
      <div 
        className="p-3 text-white rounded transition-colors duration-300"
        style={{
          backgroundColor: theme === 'dark' ? '#10b981' : '#ef4444'
        }}
      >
        JS Style: {theme === 'dark' ? 'GREEN' : 'RED'}
      </div>
    </div>
  );
};

export default DarkModeTest;
