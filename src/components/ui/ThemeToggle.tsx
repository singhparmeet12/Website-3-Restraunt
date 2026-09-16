"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 border border-border-theme flex items-center justify-center opacity-40 ${className}`}>
        <span className="w-4 h-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to warm cream mode" : "Switch to moody dark mode"}
      className={`relative w-9 h-9 border border-border-theme hover:border-ember text-foreground/80 hover:text-ember transition-colors duration-200 flex items-center justify-center group ${className}`}
      title={isDark ? "Light mode (Warm Cream)" : "Dark mode (Moody Charcoal)"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-gold-light" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-ember" />
      )}
    </button>
  );
}
