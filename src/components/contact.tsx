import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ChevronDown, Mail, MessageSquareText, Phone } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import { contact, quoteServices, whatsappLink } from "@/data/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Dot, Flourish, Button, GlassCard, LiveDot, Section, SectionHeading, ease } from "./ui";

type Fields = { name: string; reach: string; service: string; budget: string; message: string };
const empty: Fields = { name: "", reach: "", service: "", budget: "", message: "" };

const input =
  "w-full rounded-2xl border bg-surface/80 px-4 py-3.5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-1 text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

function buildMessage(f: Fields) {
  return [
    "Hi Tami, I'd like a quote.",
    "",
    `Name: ${f.name}`,
    `Contact: ${f.reach}`,
    `Service: ${f.service}`,
    f.budget ? `Budget: ${f.budget}` : null,
    "",
    f.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

const channels = [
  { label: "WhatsApp", value: contact.whatsappDisplay, href: whatsappLink(), Icon: SiWhatsapp, color: "#25D366", external: true },
  { label: "Calls", value: contact.phoneDisplay, href: `tel:${contact.phoneNumber}`, Icon: Phone, color: "var(--color-accent)", external: false },
  { label: "Texts", value: contact.phoneDisplay, href: `sms:${contact.phoneNumber}`, Icon: MessageSquareText, color: "var(--color-spark)", external: false },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail, color: "var(--color-accent)", external: false },
  { label: "TikTok", value: `@${contact.tiktokHandle}`, href: contact.tiktokUrl, Icon: SiTiktok, color: "var(--color-ink)", external: true },
];

export function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const s = (e as CustomEvent<string>).detail;
      if (quoteServices.includes(s)) setF((prev) => ({ ...prev, service: s }));
    };
    window.addEventListener("tami:select-service", onSelect);
    return () => window.removeEventListener("tami:select-service", onSelect);
  }, []);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Fields> = {};
    if (!f.name.trim()) e.name = "Please tell me your name.";
    if (!f.reach.trim()) e.reach = "Add your email or WhatsApp number so I can reply.";
    if (!f.service) e.service = "Choose the service you need.";
    if (f.message.trim().length < 10) e.message = "Tell me a little about your project (at least a sentence).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappLink(buildMessage(f)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Quote request: ${f.service}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(f))}`;
    setSent(true);
  };

  const border = (k: keyof Fields) => (errors[k] ? "border-rose-400/70" : "border-ink/12 hover:border-ink/25");
  const describe = (k: keyof Fields, id: string) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${id}-error` : undefined,
  });

  return (
    <Section id="contact">
      <div id="quote" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            index="07"
            eyebrow="Contact"
            title="Let's build"
            accent="what's next."
            intro="Fill in the form and WhatsApp opens with your message ready to send. Prefer email? Use the email button. You'll get a clear price and timeline back."
          />
          <ul className="mt-10 space-y-3">
            {channels.map(({ label, value, href, Icon, color, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="glass group flex min-h-16 items-center gap-4 rounded-2xl px-4 py-3 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface shadow-sm">
                    <Icon size={18} style={{ color }} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{label}</span>
                    <span className="block truncate font-semibold text-ink">{value}</span>
                  </span>
                  <Dot className="mr-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-7"
        >
          <GlassCard className="p-5 sm:p-8 lg:p-10">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="text-2xl font-extrabold text-ink">Request a quote</h3>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                <LiveDot /> Available worldwide
              </span>
            </div>
            <form noValidate onSubmit={sendWhatsApp} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="q-name" label="Your name" error={errors.name}>
                  <input id="q-name" value={f.name} onChange={set("name")} placeholder="Ada Okafor" autoComplete="name" {...describe("name", "q-name")} className={cn(input, border("name"))} />
                </Field>
                <Field id="q-reach" label="Email or WhatsApp" error={errors.reach}>
                  <input id="q-reach" value={f.reach} onChange={set("reach")} placeholder="you@business.com" autoComplete="email" {...describe("reach", "q-reach")} className={cn(input, border("reach"))} />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="q-service" label="Service you need" error={errors.service}>
                  <div className="relative">
                    <select id="q-service" value={f.service} onChange={set("service")} {...describe("service", "q-service")} className={cn(input, "appearance-none pr-10", border("service"), !f.service && "text-faint")}>
                      <option value="" disabled>
                        Choose one
                      </option>
                      {quoteServices.map((s) => (
                        <option key={s} value={s} className="bg-surface text-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                  </div>
                </Field>
                <Field id="q-budget" label="Budget (optional)">
                  <input id="q-budget" value={f.budget} onChange={set("budget")} placeholder="e.g. ₦300,000" className={cn(input, "border-ink/12 hover:border-ink/25")} />
                </Field>
              </div>
              <Field id="q-message" label="What do you need built?" error={errors.message}>
                <textarea id="q-message" value={f.message} onChange={set("message")} rows={5} placeholder="A short description of your business and what you'd like to achieve." {...describe("message", "q-message")} className={cn(input, "resize-none", border("message"))} />
              </Field>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Button type="submit" className="w-full sm:w-auto">
                  <SiWhatsapp size={18} /> Send on WhatsApp
                </Button>
                <Button type="button" variant="glass" onClick={sendEmail} className="w-full sm:w-auto">
                  <Mail size={18} /> Send by email
                </Button>
              </div>
              {sent && (
                <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400">
                  Your message is ready. Press send in WhatsApp or your email app and I'll get back to you.
                </p>
              )}
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-band px-4 pb-10 pt-16 text-band-fg sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <p className="max-w-xl font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
            Got a business that should run itself? <Flourish>Let's talk.</Flourish>
          </p>
          <div className="flex items-center gap-2">
            {[
              { href: contact.tiktokUrl, label: "TikTok", icon: <SiTiktok size={16} />, ext: true },
              { href: whatsappLink(), label: "WhatsApp", icon: <SiWhatsapp size={16} className="text-[#25D366]" />, ext: true },
              { href: `mailto:${contact.email}`, label: "Email", icon: <Mail size={16} className="text-spark" />, ext: false },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                className="grid h-11 w-11 place-items-center rounded-full border border-band-fg/20 transition hover:-translate-y-0.5 hover:border-band-fg/60"
              >
                {s.icon}
              </a>
            ))}
            <button
              onClick={() => scrollToId("top")}
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full bg-grad text-on-accent transition hover:-translate-y-0.5"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        <p
          aria-hidden
          className="mt-10 select-none whitespace-nowrap py-2 font-script text-[15vw] font-normal leading-[1.15] sm:text-[11vw] min-[1440px]:text-[150px]"
        >
          <span className="text-grad">Tami Labs</span>
        </p>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-band-fg/15 pt-6 text-sm text-band-fg/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Tami. Websites & business automation.</p>
          <p>Available worldwide</p>
        </div>
      </div>
    </footer>
  );
}
