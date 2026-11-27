import type { JSX } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, ShoppingBag } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiAirtable,
  SiGmail,
  SiGooglesheets,
  SiHtml5,
  SiN8N,
  SiNotion,
  SiReact,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiWhatsapp,
  SiZapier,
} from "react-icons/si";
import { services, type ServiceId } from "@/data/site";
import { requestQuote } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Dot, GlassCard, Section, SectionHeading, ease } from "./ui";

/* ---------- Tools marquee ---------- */
const tools: { name: string; Icon: IconType; color: string }[] = [
  { name: "n8n", Icon: SiN8N, color: "#EA4B71" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4F00" },
  { name: "Telegram", Icon: SiTelegram, color: "#26A5E4" },
  { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
  { name: "Google Sheets", Icon: SiGooglesheets, color: "#34A853" },
  { name: "Gmail", Icon: SiGmail, color: "#EA4335" },
  { name: "React", Icon: SiReact, color: "#149ECA" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "Airtable", Icon: SiAirtable, color: "#18BFFF" },
  { name: "Notion", Icon: SiNotion, color: "#0e1220" },
];

export function ToolsMarquee() {
  const row = [...tools, ...tools];
  return (
    <div className="relative border-y border-ink/10 bg-band py-5">
      <p className="sr-only">Tools I work with: {tools.map((t) => t.name).join(", ")}</p>
      <div aria-hidden className="fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white">
                <t.Icon size={18} style={{ color: t.color }} />
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-tight text-band-fg">{t.name}</span>
              <span className="ml-6 h-1.5 w-1.5 rounded-full bg-spark" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Card visuals ---------- */
const nodeBox = "absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center border border-ink/10 bg-surface shadow-sm";

function AutomationVisual() {
  // Everything is placed in one 320x140 coordinate box, so lines always meet their nodes.
  const lanes = [
    { y: 24, Icon: SiTelegram, color: "#26A5E4" },
    { y: 70, Icon: SiGooglesheets, color: "#34A853" },
    { y: 116, Icon: SiGmail, color: "#EA4335" },
  ];
  const at = (x: number, y: number) => ({ left: `${(x / 320) * 100}%`, top: `${(y / 140) * 100}%` });
  return (
    <div className="relative mx-auto aspect-[320/140] w-full max-w-[420px]">
      <svg viewBox="0 0 320 140" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <path d="M40 70 H138" stroke="rgb(14 18 32 / 0.12)" strokeWidth="1.5" />
        <path d="M40 70 H138" strokeWidth="2" className="flow stroke-spark" />
        {lanes.map((l) => (
          <g key={l.y}>
            <path d={`M182 70 C 225 70, 230 ${l.y}, 274 ${l.y}`} stroke="rgb(14 18 32 / 0.12)" strokeWidth="1.5" />
            <path d={`M182 70 C 225 70, 230 ${l.y}, 274 ${l.y}`} strokeWidth="2" className="flow stroke-accent" />
          </g>
        ))}
      </svg>
      <div style={at(26, 70)} className={cn(nodeBox, "h-11 w-11 rounded-xl")}>
        <SiWhatsapp size={18} className="text-[#25D366]" />
      </div>
      <div
        style={at(160, 70)}
        className="absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-band shadow-[0_10px_30px_-8px_rgb(234_75_113/0.6)]"
      >
        <SiN8N size={24} className="text-[#EA4B71]" />
      </div>
      {lanes.map(({ y, Icon, color }) => (
        <div key={y} style={at(290, y)} className={cn(nodeBox, "h-9 w-9 rounded-lg")}>
          <Icon size={15} style={{ color }} />
        </div>
      ))}
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="relative mx-auto h-[150px] w-full max-w-[420px]">
      <div className="absolute inset-x-[4%] bottom-0 top-0 overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-ink/[0.07] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-3.5 flex-1 rounded-full bg-page px-2 font-mono text-[8px] leading-[14px] text-faint">
            yourbrand.com
          </span>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3">
          <div className="space-y-2">
            <div className="h-3 w-[90%] rounded bg-ink/80" />
            <div className="h-3 w-[70%] rounded bg-ink/80" />
            <div className="h-1.5 w-full rounded bg-ink/15" />
            <div className="h-1.5 w-[85%] rounded bg-ink/15" />
            <div className="mt-3 h-5 w-20 rounded-full bg-accent" />
          </div>
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-accent to-spark">
            <motion.div
              aria-hidden
              className="absolute inset-y-0 w-1/2 -skew-x-12 bg-white/35 blur-md"
              animate={{ x: ["-120%", "260%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-14px] right-[2%] h-[112px] w-[58px] rounded-[14px] border border-ink/15 bg-surface p-1.5 shadow-xl">
        <div className="mx-auto mb-1.5 h-1 w-5 rounded-full bg-ink/20" />
        <div className="h-2 w-[80%] rounded bg-ink/80" />
        <div className="mt-1 h-2 w-[60%] rounded bg-ink/80" />
        <div className="mt-2 h-8 rounded bg-gradient-to-br from-accent to-spark" />
        <div className="mt-2 h-3 w-full rounded-full bg-spark" />
      </div>
    </div>
  );
}

function ChatVisual() {
  const msgs = [
    { me: false, text: "Hi! Want tickets for Saturday? 🎉" },
    { me: true, text: "Yes please, 2 tickets" },
    { me: false, text: "Great. What's your phone number?" },
  ];
  return (
    <div className="mx-auto flex h-[150px] w-full max-w-[420px] flex-col justify-end gap-2 px-[4%]">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ delay: 0.3 + i * 0.7, duration: 0.5, ease }}
          className={cn(
            "max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug",
            m.me
              ? "self-end rounded-br-md bg-grad text-on-accent"
              : "self-start rounded-bl-md border border-ink/10 bg-surface text-ink shadow-sm",
          )}
        >
          {m.text}
        </motion.div>
      ))}
      <div className="flex items-center gap-1 self-start rounded-full border border-ink/10 bg-surface px-3 py-2">
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-muted"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

function StoreVisual() {
  return (
    <div className="relative mx-auto flex h-[150px] w-full max-w-[420px] items-center justify-center gap-3 px-[4%]">
      <div className="w-[44%] rounded-xl border border-ink/10 bg-surface p-2.5 shadow-sm">
        <div className="grid h-14 place-items-center rounded-lg bg-spark-tint">
          <ShoppingBag size={22} className="text-ink" />
        </div>
        <div className="mt-2 h-2 w-[80%] rounded bg-ink/70" />
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium text-ink">₦12,500</span>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] text-on-accent">Add</span>
        </div>
      </div>
      <div className="w-[48%] space-y-2">
        <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-surface px-3 py-2 shadow-sm">
          <CreditCard size={15} className="text-accent" />
          <span className="text-[12px] text-ink">Card or transfer</span>
        </div>
        <div className="relative flex items-center gap-2 overflow-hidden rounded-xl border border-ink/10 bg-surface px-3 py-2 shadow-sm">
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-emerald-400/25"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          />
          <Check size={15} className="relative text-emerald-600 dark:text-emerald-400" />
          <span className="relative text-[12px] text-ink">Order email sent</span>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<ServiceId, () => JSX.Element> = {
  automation: AutomationVisual,
  website: WebsiteVisual,
  chatbot: ChatVisual,
  ecommerce: StoreVisual,
};

const layout: Record<ServiceId, string> = {
  automation: "lg:col-span-7",
  website: "lg:col-span-5",
  chatbot: "lg:col-span-5",
  ecommerce: "lg:col-span-7",
};

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        index="01"
        eyebrow="Services"
        title="What I build"
        accent="for you."
        intro="Four ways I help a business sell more and work less. Pick one, or combine them into a single system."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {services.map((s, i) => {
          const Visual = visuals[s.id];
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.1 }}
              className={layout[s.id]}
            >
              <GlassCard className="group flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-0.5 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-black text-outline opacity-40">0{i + 1}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.quote}</span>
                </div>
                <div className="my-8 rounded-2xl bg-page/70 py-6">
                  <Visual />
                </div>
                <h3 className="text-2xl font-extrabold text-ink sm:text-[1.75rem]">{s.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{s.full}</p>
                <button
                  onClick={() => requestQuote(s.quote)}
                  className="mt-7 inline-flex min-h-11 items-center gap-3 self-start text-sm font-semibold uppercase tracking-[0.08em] text-ink"
                >
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                    Get a quote for this
                  </span>
                  <Dot />
                </button>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
