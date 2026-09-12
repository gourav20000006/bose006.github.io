import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false, className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        id="theme-toggle-compact-btn"
        onClick={toggleTheme}
        className={`p-1.5 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-pointer flex items-center justify-center ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#2563eb]" />
        )}
      </button>
    );
  }

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] transition-all cursor-pointer font-mono-custom text-[10px] group ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="flex items-center gap-1.5">
        {isDark ? (
          <Sun className="w-3 h-3 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-3 h-3 text-[#2563eb] group-hover:-rotate-12 transition-transform" />
        )}
        <span className="text-[var(--ink)] font-bold uppercase tracking-wider text-[10px]">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>

      <span className="text-[9px] text-[var(--accent)] uppercase font-semibold tracking-wider">
        [ {isDark ? 'Light' : 'Dark'} ]
      </span>
    </button>
  );
};
