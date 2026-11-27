import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark";

const KEY = "tami-theme";
const listeners = new Set<() => void>();

function read(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

let fadeTimer = 0;

export function setTheme(t: Theme) {
  const root = document.documentElement;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("theme-fade");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => root.classList.remove("theme-fade"), 450);
  }
  root.setAttribute("data-theme", t);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#0b0b0c" : "#f3f1ec");
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* private mode or blocked storage: the theme still applies for this visit */
  }
  listeners.forEach((l) => l());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => "light",
  );
}

/** A round sun/moon switch. Every copy on the page stays in sync. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-ink/25 text-ink transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-ink active:scale-95",
        className,
      )}
    >
      <Sun
        size={18}
        className={cn("absolute transition-all duration-500", dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")}
      />
      <Moon
        size={17}
        className={cn("absolute transition-all duration-500", dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")}
      />
    </button>
  );
}
