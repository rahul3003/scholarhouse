import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const useTheme = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setMode(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.classList.remove(mode);
    document.documentElement.classList.add(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return [theme, toggleTheme, mode];
};

export default useTheme;
