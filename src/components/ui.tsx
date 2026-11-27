import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- Buttons ---------- */
type Variant = "primary" | "glass";
const btnBase =
  "group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-[15px] font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-300 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-grad glow text-on-accent hover:brightness-110",
  glass: "glass text-ink hover:border-ink/25",
};

function Inner({ children }: { children: ReactNode }) {
  return <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>(
  ({ variant = "primary", className, children, ...rest }, ref) => (
    <button ref={ref} className={cn(btnBase, variants[variant], className)} {...rest}>
      <Inner>{children}</Inner>
    </button>
  ),
);
Button.displayName = "Button";

export function LinkButton({
  variant = "primary",
  className,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a className={cn(btnBase, variants[variant], className)} {...rest}>
      <Inner>{children}</Inner>
    </a>
  );
}

/* ---------- Glass card with pointer light ---------- */
export function trackPointer(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function GlassCard({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div onMouseMove={trackPointer} className={cn("glass spotlight rounded-[24px]", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * The one cursive touch in a heading: a word or two in the orange script, set a little larger so its
 * lowercase matches the bold capitals around it. Kept short on purpose, so titles stay easy to read.
 */
export function Flourish({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-script text-grad text-[1.05em] font-normal leading-none tracking-normal", className)}>
      {children}
    </span>
  );
}

/* ---------- Section heading ---------- */
export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-spark" />
      {index && <span className="text-accent">{index}</span>}
      <span className="text-ink/30">/</span>
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  intro,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="text-[2.5rem] font-extrabold text-ink sm:text-5xl lg:text-[3.9rem]"
      >
        {title} {accent && <Flourish>{accent}</Flourish>}
      </motion.h2>
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}

export function Section({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn("relative px-4 py-24 sm:px-6 sm:py-32 lg:px-10", className)}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping-soft" />
      <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

/** The small accent dot that ends links and buttons, matching the hero's Contact button. It swells on hover. */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "h-2.5 w-2.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150",
        className,
      )}
    />
  );
}
