/**
 * Client reviews as staggered cards.
 * Adapted from "Stagger Testimonials" by vaib215 on 21st.dev: the cards sit in a row with a cut corner, the one in
 * the middle lifts and fills with the accent colour, and clicking a card (or the buttons) brings it to the middle.
 * Tami's version uses initials instead of stock photos, taller cards for longer reviews, and shows what was built.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, type Review } from "@/data/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui";

const CUT = 44; // size of the cut corner, px
const DIAGONAL = Math.SQRT2 * CUT;

type Item = Review & { key: number };

// "Mr. Adugbe" → "A", "ShinaCreates" → "S"
const initial = (name: string) => name.replace(/^(Mr|Mrs|Ms|Miss|Dr)\.?\s+/i, "").charAt(0).toUpperCase();

function ReviewCard({
  item,
  position,
  size,
  onSelect,
}: {
  item: Item;
  position: number;
  size: { w: number; h: number };
  onSelect: (steps: number) => void;
}) {
  const center = position === 0;
  const far = Math.abs(position) > 2;

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (center) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(position);
    }
  };

  return (
    <article
      role={center ? undefined : "button"}
      tabIndex={center || far ? -1 : 0}
      aria-label={center ? undefined : `Show the review from ${item.name}`}
      aria-hidden={far || undefined}
      onClick={() => !center && onSelect(position)}
      onKeyDown={onKey}
      className={cn(
        "absolute left-1/2 top-1/2 flex flex-col border-2 p-6 transition-all duration-500 ease-in-out sm:p-8",
        center
          ? "z-10 border-accent bg-accent text-on-accent"
          : "z-0 cursor-pointer border-ink/15 bg-card text-ink hover:border-accent/60",
        far && "pointer-events-none opacity-0",
      )}
      style={{
        width: size.w,
        height: size.h,
        clipPath: `polygon(${CUT}px 0%, calc(100% - ${CUT}px) 0%, 100% ${CUT}px, 100% 100%, calc(100% - ${CUT}px) 100%, ${CUT}px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translateX(${(size.w / 1.45) * position}px) translateY(${
          center ? -40 : position % 2 ? 18 : -12
        }px) rotate(${center ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: center ? "0px 8px 0px 4px color-mix(in srgb, var(--color-ink) 14%, transparent)" : "none",
      }}
    >
      {/* the line across the cut corner */}
      <span
        aria-hidden
        className={cn("absolute block origin-top-right rotate-45", center ? "bg-on-accent/25" : "bg-ink/15")}
        style={{ right: -2, top: CUT - 2, width: DIAGONAL, height: 2 }}
      />

      <span
        aria-hidden
        className={cn(
          "mb-5 grid h-14 w-12 shrink-0 place-items-center font-script text-2xl",
          center ? "bg-on-accent text-accent" : "bg-accent-tint text-accent",
        )}
        style={{ boxShadow: "3px 3px 0px var(--color-page)" }}
      >
        {initial(item.name)}
      </span>

      <blockquote className={cn("text-[15px] font-medium leading-relaxed sm:text-base", !center && "text-ink/85")}>
        “{item.quote}”
      </blockquote>

      <footer className="mt-auto pt-5">
        <p className="font-display text-lg font-bold tracking-[-0.02em]">{item.name}</p>
        <p className={cn("text-sm", center ? "text-on-accent/75" : "text-muted")}>{item.role}</p>
        <p
          className={cn(
            "mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em]",
            center ? "bg-on-accent/10" : "bg-ink/[0.06] text-ink/75",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", center ? "bg-on-accent" : "bg-spark")} />
          {item.service}
        </p>
      </footer>
    </article>
  );
}

export function Reviews() {
  const [size, setSize] = useState({ w: 380, h: 480 });
  // Start rotated so the first review in the list sits in the middle
  const [list, setList] = useState<Item[]>(() => {
    const items = reviews.map((r, i) => ({ ...r, key: i }));
    const mid = items.length % 2 ? (items.length + 1) / 2 : items.length / 2;
    return [...items.slice(items.length - mid), ...items.slice(0, items.length - mid)];
  });
  const keyRef = useRef(reviews.length);

  // Rotate the row so the chosen card lands in the middle; a card that wraps round gets a new key so it
  // re-enters from the far side instead of sliding across the whole row
  const move = useCallback((steps: number) => {
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift();
          if (item) next.push({ ...item, key: keyRef.current++ });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop();
          if (item) next.unshift({ ...item, key: keyRef.current++ });
        }
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSize(w >= 640 ? { w: 380, h: 480 } : { w: Math.min(310, w - 48), h: 500 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const half = list.length % 2 ? (list.length + 1) / 2 : list.length / 2;
  const centerItem = list[half];

  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="Reviews"
          title="Don't just take my word for it"
          intro="Here's what business owners have to say about working with me"
        />
      </div>

      <div
        className="relative mt-10 w-full overflow-hidden"
        style={{ height: size.h + 170 }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        {list.map((item, index) => (
          <ReviewCard key={item.key} item={item} position={index - half} size={size} onSelect={move} />
        ))}

        <p className="sr-only" aria-live="polite">
          {centerItem ? `Review from ${centerItem.name}, ${centerItem.role}` : ""}
        </p>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {[
            { dir: -1, label: "Previous review", Icon: ChevronLeft },
            { dir: 1, label: "Next review", Icon: ChevronRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={label}
              onClick={() => move(dir)}
              aria-label={label}
              className="grid h-14 w-14 place-items-center border-2 border-ink/15 bg-page text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent active:scale-95"
            >
              <Icon size={22} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
