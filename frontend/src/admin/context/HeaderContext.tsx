import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  title: string;
  subtitle: string;
  setHeader: (title: string, subtitle: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('Overview');
  const [subtitle, setSubtitle] = useState('Monitor your platform activity and performance');

  const setHeader = (newTitle: string, newSubtitle: string) => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  };

  return (
    <HeaderContext.Provider value={{ title, subtitle, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider');
  }
  return context;
};
