import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpenCheck,
  ClipboardCheck,
  ClipboardList,
  Hammer,
  MessagesSquare,
  Plus,
  Rocket,
  Smartphone,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { faqs, steps, whatsappLink } from "@/data/site";
import { Flourish, GlassCard, LinkButton, LiveDot, SectionHeading, Section, ease } from "./ui";
import { cn } from "@/lib/utils";

/* ---------- Process ---------- */
const stepIcons = [MessagesSquare, ClipboardList, Hammer, Rocket];

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        index="04"
        eyebrow="Process"
        title="From first message"
        accent="to launch."
        intro="Four clear steps. You always know what's happening, what it costs and what comes next."
      />

      <div className="relative mt-16">
        {/* connecting rail with a travelling light (desktop) */}
        <div aria-hidden className="absolute left-0 right-0 top-[34px] hidden h-px bg-ink/15 lg:block">
          <motion.div
            className="absolute top-1/2 h-[3px] w-40 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
            animate={{ left: ["-10%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="relative flex flex-col"
              >
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <span className="glass grid h-[68px] w-[68px] place-items-center rounded-2xl">
                    <Icon size={24} className="text-accent" />
                  </span>
                  <span className="font-mono text-sm text-faint">Step 0{i + 1}</span>
                </div>
                <GlassCard className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
                </GlassCard>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- About ---------- */
const skills = ["Websites", "Landing Pages", "Online Stores", "n8n", "Zapier", "Telegram Bots", "Chatbots", "SOPs"];

// Each point restates something the site already promises (the quote, mobile-first builds, the SOP handover).
const principles = [
  {
    Icon: ClipboardCheck,
    title: "Clear from day one",
    text: "You get a price and a timeline before any work starts, and you see progress while I build.",
  },
  {
    Icon: Smartphone,
    title: "Made for phones",
    text: "Most customers meet your business on a phone, so everything I build is designed for small screens first.",
  },
  {
    Icon: BookOpenCheck,
    title: "Yours to run",
    text: "At launch I show you how it all works, and every automation comes with a written SOP for your team.",
  },
];

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease, delay: i * 0.08 },
});

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* photos: stay in view on desktop while the story scrolls past */}
        <motion.div {...reveal()} className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,var(--blob-a),transparent_65%)] blur-2xl" />
            <div className="relative">
              <div className="rounded-[30px] bg-grad p-[2px] shadow-[0_30px_80px_-30px_var(--glow)]">
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src="/images/tami.webp"
                    alt="Portrait of Tami in a black shirt"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-3 w-[44%] overflow-hidden rounded-[22px] border-4 border-page shadow-2xl sm:-right-6">
                <img
                  src="/images/working-1.webp"
                  alt="Tami building an n8n ordering workflow at night"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="glass absolute -left-3 top-6 flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 sm:-left-6">
                <LiveDot />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">Available worldwide</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 lg:col-span-7 lg:mt-0">
          <SectionHeading index="05" eyebrow="About me" title="The person behind" accent="the systems." />

          <div className="mt-8 space-y-5 text-base leading-[1.8] text-muted sm:text-[17px]">
            <motion.p {...reveal(1)} className="text-lg leading-[1.7] text-ink sm:text-xl">
              Hi, I’m Tami — a digital solutions developer passionate about helping businesses{" "}
              <span className="text-grad font-semibold">work smarter and grow</span> through technology.
            </motion.p>
            <motion.p {...reveal(2)}>
              I specialize in building intelligent automation systems and modern, high-performing websites that solve
              real business problems. From streamlining repetitive workflows and connecting business tools to designing
              and developing professional websites, I turn ideas into practical digital solutions.
            </motion.p>
            <motion.p {...reveal(3)}>
              My approach is simple: combine creativity, technology, and strategic thinking to build solutions that
              don’t just look good but <span className="font-semibold text-ink">deliver real value</span>.
            </motion.p>
            <motion.p {...reveal(4)}>
              Whether you’re looking to automate your operations, establish your online presence, or take your business
              to the next level, I’m here to help make it happen.
            </motion.p>
          </div>

          {/* how I work */}
          <h3 className="mt-12 font-mono text-xs font-normal uppercase tracking-[0.2em] text-muted">How I work</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {principles.map(({ Icon, title, text }, i) => (
              <motion.li key={title} {...reveal(i)}>
                <GlassCard className="h-full p-5 transition-transform duration-500 hover:-translate-y-0.5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-grad text-on-accent">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold tracking-[-0.02em] text-ink">{title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                </GlassCard>
              </motion.li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="What I do best">
            {skills.map((s) => (
              <li
                key={s}
                className="glass rounded-full px-4 py-2 text-sm font-medium text-ink/85 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* sign-off */}
          <motion.div {...reveal()} className="mt-12 border-t border-ink/10 pt-10">
            <p className="font-display text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
              Let’s build something <Flourish>meaningful.</Flourish>
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={whatsappLink()} target="_blank" rel="noreferrer">
                <SiWhatsapp size={17} /> Start a project
              </LinkButton>
              <LinkButton href="#work" variant="glass">
                See my work
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-12">
        <SectionHeading
          index="06"
          eyebrow="FAQ"
          title="Questions,"
          accent="answered."
          intro="Something else on your mind? Message me on WhatsApp and ask away."
          className="lg:col-span-5"
        />
        <div className="space-y-3 lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "glass rounded-2xl transition-colors duration-300",
                  isOpen && "border-accent/30 bg-surface/90",
                )}
              >
                <h3 className="text-base font-semibold tracking-normal">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 text-left font-sans text-[16px] text-ink sm:px-6 sm:text-[17px]"
                  >
                    {f.q}
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 transition-transform duration-300",
                        isOpen && "rotate-45 border-accent bg-accent text-on-accent",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
