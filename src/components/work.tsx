/**
 * Selected work as scroll-stacking cards.
 * Motion adapted from "Scroll Stacking Cards" by kedhareswer on 21st.dev (tilt-stack-scroll):
 * each card slides up tilted and lands flat, while the cards beneath tip back, shrink and darken.
 * Tami's version frames the project screenshots inside each card and opens them in a lightbox.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";
import { Eyebrow, ease } from "./ui";

/* ---------- Pose maths (from the original component) ---------- */
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const pad2 = (n: number) => (n < 10 ? "0" : "") + n;

type Pose = { y: number; scale: number; rx: number; rz: number; shade: number; opacity: number };

/** Where card i sits when the scroll is at p (0 = first card, n-1 = last). y is a % of the card's height. */
function pose(p: number, i: number, reduced: boolean): Pose {
  const enter = i === 0 ? 1 : clamp(p - (i - 1), 0, 1);
  const depth = clamp(p - i, 0, 3);
  if (reduced) return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: enter >= 1 ? 1 : enter };
  const e = easeOut(enter);
  return {
    y: (1 - e) * 130 - depth * 3.2,
    scale: (1 - depth * 0.07) * (0.9 + 0.1 * e),
    rx: (1 - e) * 22 - depth * 9,
    rz: (1 - e) * (i % 2 ? 5 : -5),
    shade: Math.min(depth, 2) * 0.34,
    opacity: depth > 2.6 ? clamp((3 - depth) / 0.4, 0, 1) : 1,
  };
}

const toTransform = (q: Pose) =>
  `translate3d(0,${q.y.toFixed(3)}%,0) perspective(1400px) rotateX(${q.rx.toFixed(3)}deg) rotateZ(${q.rz.toFixed(3)}deg) scale(${q.scale.toFixed(4)})`;

/* Each card's accent: chip dots, button and glow */
const accents: Record<string, string> = {
  defamous: "#ff4d12",
  sumptuous: "#9cc3ff",
  "party-tickets": "#ff7a35",
};

/* ---------- Screenshot frames ---------- */
type Img = Project["images"][number];

function BrowserFrame({ img, label, onOpen, className }: { img: Img; label: string; onOpen: () => void; className?: string }) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Enlarge: ${img.alt}`}
      className={cn(
        "group/shot block w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0c] text-left shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] transition-transform duration-500 hover:-translate-y-1",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[11px] text-white/45">{label}</span>
      </span>
      <span className="block aspect-[16/10] overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.03]"
        />
      </span>
    </button>
  );
}

function PhoneFrame({ img, onOpen, className }: { img: Img; onOpen: () => void; className?: string }) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Enlarge: ${img.alt}`}
      className={cn(
        "group/shot block aspect-[1/2] overflow-hidden rounded-[26px] border-[5px] border-[#05070d] bg-[#05070d] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)] ring-1 ring-white/15 transition-transform duration-500 hover:-translate-y-1",
        className,
      )}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        draggable={false}
        className="h-full w-full rounded-[21px] object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.03]"
      />
    </button>
  );
}

function Media({ p, open }: { p: Project; open: (i: number) => void }) {
  if (p.id === "sumptuous") {
    return (
      <div className="flex h-full items-center justify-center gap-3 sm:gap-5">
        <PhoneFrame img={p.images[0]} onOpen={() => open(0)} className="h-[92%]" />
        <PhoneFrame img={p.images[1]} onOpen={() => open(1)} className="h-[92%] translate-y-[5%]" />
      </div>
    );
  }
  const label = p.id === "party-tickets" ? "n8n · Telegram Lead Capture Bot" : p.name;
  return (
    <div className="flex h-full items-center">
      <BrowserFrame img={p.images[0]} label={label} onOpen={() => open(0)} />
    </div>
  );
}

/* ---------- Lightbox ---------- */
type Open = { project: Project; index: number } | null;

function Lightbox({ state, close, step }: { state: Open; close: () => void; step: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!state) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close, step]);

  const img = state?.project.images[state.index];
  const many = (state?.project.images.length ?? 0) > 1;
  const ctl = "absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20";

  return (
    <AnimatePresence>
      {state && img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${state.project.name}, image ${state.index + 1} of ${state.project.images.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#05070d]/90 p-4 backdrop-blur-xl"
        >
          <motion.img
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
            src={img.src}
            alt={img.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button ref={closeRef} onClick={close} aria-label="Close" className={cn(ctl, "right-4 top-4")}>
            <X size={20} />
          </button>
          {many && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className={cn(ctl, "left-3 top-1/2 -translate-y-1/2")}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className={cn(ctl, "right-3 top-1/2 -translate-y-1/2")}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- The section ---------- */
const heading = "Real systems, running live.";

export function Work() {
  const [state, setState] = useState<Open>(null);
  const close = useCallback(() => setState(null), []);
  const step = useCallback(
    (d: number) =>
      setState((s) => (s ? { ...s, index: (s.index + d + s.project.images.length) % s.project.images.length } : s)),
    [],
  );

  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const count = useRef<HTMLElement>(null);
  const rail = useRef<HTMLElement>(null);
  const n = projects.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;
    let last = -1;
    let p = 0;

    const paint = () => {
      for (let i = 0; i < n; i++) {
        const el = cards.current[i];
        if (!el) continue;
        const q = pose(p, i, reduced);
        el.style.transform = toTransform(q);
        el.style.opacity = String(q.opacity);
        const sh = shades.current[i];
        if (sh) sh.style.opacity = String(q.shade);
        // Only the card on top takes clicks and keyboard focus
        const onTop = Math.round(p) === i;
        el.inert = !onTop;
      }
      const idx = Math.round(p);
      if (idx !== last && count.current) {
        last = idx;
        count.current.textContent = pad2(idx + 1);
      }
      if (rail.current) rail.current.style.transform = `scaleX(${(n > 1 ? p / (n - 1) : 1).toFixed(4)})`;
    };

    const trigger = ScrollTrigger.create({
      trigger: track.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        p = self.progress * Math.max(n - 1, 0);
        paint();
      },
    });
    paint();

    // Layout above can still shift (fonts, images), so measure again once everything has loaded
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    const onMotion = () => {
      reduced = mq.matches;
      paint();
    };
    mq.addEventListener("change", onMotion);
    return () => {
      mq.removeEventListener("change", onMotion);
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, [n]);

  return (
    <div id="work" ref={track} className="relative" style={{ height: `calc(100svh * ${n})` }}>
      <section
        aria-roledescription="carousel"
        aria-label="Selected work"
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pb-6 pt-24 sm:px-6 sm:pb-8 lg:px-10 lg:pt-28"
      >
        <header className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow index="02">Selected work</Eyebrow>
            <h2 className="text-[2.3rem] font-extrabold text-ink sm:text-5xl lg:text-[3.6rem]">
              {heading.split(" ").map((w, i) => (
                <span key={i} className="-mx-1 inline-block overflow-hidden px-1 pb-2 align-bottom">
                  <motion.span
                    className={cn("inline-block", i >= 2 && "font-script text-grad text-[1.05em] font-normal tracking-normal")}
                    initial={{ y: "110%", rotate: 4, opacity: 0 }}
                    whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.06 }}
                  >
                    {w}
                  </motion.span>
                  {" "}
                </span>
              ))}
            </h2>
          </div>
          <div aria-hidden className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-muted">
            <b ref={count} className="text-[22px] font-medium tracking-normal text-ink">
              01
            </b>
            / {pad2(n)}
            <span className="h-0.5 w-24 overflow-hidden rounded-full bg-ink/15">
              <i ref={rail} className="block h-full w-full origin-left scale-x-0 bg-accent" />
            </span>
          </div>
        </header>

        <div className="relative mx-auto mt-6 w-full max-w-[1440px] min-h-0 flex-1 sm:mt-8">
          {projects.map((p, i) => {
            const accent = accents[p.id] ?? "#ff4d12";
            return (
              <article
                key={p.id}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                aria-roledescription="slide"
                aria-label={`${pad2(i + 1)} of ${pad2(n)}: ${p.name}`}
                style={{ zIndex: i + 1, ["--accent" as string]: accent }}
                className="absolute inset-0 origin-top overflow-hidden rounded-[24px] bg-[#111113] ring-1 ring-white/10 text-[#f2f2f0] shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_50px_90px_-40px_rgb(8_10_20/0.55),0_18px_40px_-20px_rgb(8_10_20/0.45)] [backface-visibility:hidden] [will-change:transform] sm:rounded-[30px]"
              >
                {/* lit ground: a glow in the card's accent and a faint grid */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(60% 70% at 78% 45%, color-mix(in srgb, ${accent} 22%, transparent), transparent 70%), linear-gradient(135deg, #18181b 0%, #0b0b0c 100%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:56px_56px]"
                />

                <div className="relative grid h-full grid-rows-[minmax(0,0.95fr)_auto] gap-5 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-1 lg:gap-12 lg:p-12">
                  {/* copy */}
                  <div className="order-2 flex min-h-0 flex-col justify-between gap-6 lg:order-1">
                    <div className="hidden items-start justify-between gap-4 lg:flex">
                      <span className="font-display text-[clamp(56px,7vw,104px)] font-black leading-[0.8] tracking-[-0.04em] text-white/90">
                        {pad2(i + 1)}
                      </span>
                      <span className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur">
                        {p.kind}
                      </span>
                    </div>
                    <div>
                      <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] lg:hidden">
                        {pad2(i + 1)} · {p.kind}
                      </span>
                      <h3 className="text-[clamp(30px,4.4vw,60px)] font-black uppercase leading-[0.92] tracking-[-0.035em]">
                        {p.name}
                      </h3>
                      <p className="mt-3 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-white/75 sm:mt-4 sm:text-base">
                        {p.summary}
                      </p>
                      <ul className="mt-4 hidden max-w-xl space-y-2 text-sm leading-relaxed text-white/65 [@media(min-width:1024px)_and_(min-height:840px)]:block">
                        {p.details.map((d) => (
                          <li key={d} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-xs font-medium"
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setState({ project: p, index: 0 })}
                        className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full px-5 text-sm font-semibold text-[#0b0b0d] shadow-[0_1px_0_rgb(255_255_255/0.6)_inset] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: accent, boxShadow: `0 10px 24px -10px ${accent}` }}
                      >
                        <Images size={16} />
                        View {p.images.length > 1 ? `${p.images.length} screens` : "screenshot"}
                      </button>
                    </div>
                  </div>

                  {/* screenshots */}
                  <div className="order-1 min-h-0 lg:order-2">
                    <Media p={p} open={(index) => setState({ project: p, index })} />
                  </div>
                </div>

                {/* darkens the card as later cards land on it */}
                <div
                  ref={(el) => {
                    shades.current[i] = el;
                  }}
                  className="pointer-events-none absolute inset-0 z-10 bg-[#05060a] opacity-0"
                />
              </article>
            );
          })}
        </div>
      </section>

      <Lightbox state={state} close={close} step={step} />
    </div>
  );
}
