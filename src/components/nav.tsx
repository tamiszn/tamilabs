import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { scrollToId } from "@/lib/scroll";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/lib/theme";
import { Dot, ease } from "./ui";

const links = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "reviews", label: "Reviews" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

/**
 * The hero carries its own navbar. This floating bar slides in once the hero has scrolled away,
 * so a link is always one tap away further down the page.
 */
export function Nav() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-accent px-4 py-2 font-semibold text-on-accent focus:translate-y-0"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {(shown || open) && (
          <motion.header
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10"
          >
            <nav
              aria-label="Sections"
              className="glass glass-strong mx-auto flex max-w-[1440px] items-center justify-between rounded-full py-2 pl-5 pr-2"
            >
              <button
                onClick={() => go("top")}
                className="flex min-h-11 items-center font-script text-[1.9rem] font-normal leading-none text-accent"
                aria-label="Tami, back to top"
              >
                Tami
              </button>

              <ul className="hidden items-center gap-1 md:flex">
                {links.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => go(l.id)}
                      className={cn(
                        "relative min-h-10 rounded-full px-4 text-sm font-medium uppercase tracking-[0.08em] transition-colors",
                        active === l.id ? "text-accent" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {active === l.id && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => go("contact")}
                  className="group hidden min-h-11 items-center gap-3 rounded-full border border-ink/30 py-1.5 pl-5 pr-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition hover:-translate-y-0.5 hover:border-ink active:scale-95 sm:inline-flex"
                >
                  Contact
                  <Dot />
                </button>
                <ThemeToggle />

                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-page md:hidden"
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-page/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="flex w-full items-baseline gap-4 border-b border-ink/10 py-4 text-left font-display text-4xl font-black uppercase tracking-tight text-ink"
                  >
                    <span className="font-mono text-xs font-normal text-accent">0{i + 1}</span>
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-grad font-semibold text-on-accent"
            >
              <SiWhatsapp size={18} /> Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
