"use client"
import React, { createContext, useContext, useState } from 'react';

interface CourseModalContextType {
  isCourseModalOpen: boolean;
  setIsCourseModalOpen: (open: boolean) => void;
}

const CourseModalContext = createContext<CourseModalContextType | undefined>(undefined);

export function CourseModalProvider({ children }: { children: React.ReactNode }) {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <CourseModalContext.Provider value={{ isCourseModalOpen, setIsCourseModalOpen }}>
      {children}
    </CourseModalContext.Provider>
  );
}

export function useCourseModal() {
  const context = useContext(CourseModalContext);
  if (context === undefined) {
    throw new Error('useCourseModal must be used within a CourseModalProvider');
  }
  return context;
} 