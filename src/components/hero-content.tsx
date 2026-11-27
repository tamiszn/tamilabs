import Elias, { type EliasProps } from "./tami-hero";
import { contact, whatsappLink } from "@/data/site";
import { ThemeToggle } from "@/lib/theme";
import { SiWhatsapp } from "react-icons/si";
import { LinkButton } from "./ui";

// Each project becomes a "book" in the hero's card. Clicking opens it to its first page.
const books: NonNullable<EliasProps["books"]> = [
  {
    label: "Online store",
    title: "Defamous Books",
    coverLines: ["Defa-", "mous", "books"],
    topics: ["Store", "WhatsApp", "Mobile"],
    art: "days",
    colors: { cover: "#ff4d12", type: "#0b0b0c", spine: "#0b0b0c" },
    chapter: "Project one",
    chapterTitle: "UK books, Nigerian doors",
    text: "An online bookshop for original Bond workbooks. Parents order on WhatsApp, pay by card or transfer, and track every step from London to their door.",
  },
  {
    label: "Telegram mini app",
    title: "Sumptuous Foods",
    coverLines: ["Sump-", "tuous", "foods"],
    topics: ["Telegram", "n8n", "Orders"],
    art: "sunrise",
    colors: { cover: "#141416", type: "#f2f2f0", spine: "#ff4d12" },
    chapter: "Project two",
    chapterTitle: "A restaurant in Telegram",
    text: "Customers browse the menu, check out in a mini app and get a message at every step until delivery. n8n runs the orders behind the scenes.",
  },
  {
    label: "Lead capture bot",
    title: "Party Tickets Bot",
    coverLines: ["Party", "tickets", "bot"],
    topics: ["n8n", "Sheets", "Alerts"],
    art: "path",
    colors: { cover: "#9cc3ff", type: "#0b0b0c", spine: "#0b0b0c" },
    chapter: "Project three",
    chapterTitle: "No lead left behind",
    text: "The bot greets each guest, checks their number and saves them to Google Sheets, while the organiser gets an instant alert for every sign-up.",
  },
];

export function TamiHero() {
  return (
    <Elias
      brand={{ name: "Tami", href: "#top" }}
      navLinks={{
        left: [
          { label: "Home", href: "#top", active: true },
          { label: "Services", href: "#services" },
        ],
        right: [
          { label: "Work", href: "#work" },
          { label: "About", href: "#about" },
        ],
      }}
      navCta={{ label: "Contact", href: "#contact" }}
      navExtra={<ThemeToggle />}
      introActions={
        <>
          <LinkButton href={whatsappLink()} target="_blank" rel="noreferrer">
            <SiWhatsapp size={17} /> Start a project
          </LinkButton>
          <LinkButton href="#work" variant="glass">
            See my work
          </LinkButton>
        </>
      }
      navStatus={{ label: "Available", detail: "Worldwide" }}
      name={{ first: "Tami", last: "Labs" }}
      intro={{
        roles: ["Websites", "Automation", "Bots"],
        headline: ["Websites and", "automations that", "run your business."],
        description:
          "Online stores, landing pages, Telegram bots and n8n or Zapier workflows for businesses in Nigeria and worldwide.",
      }}
      portrait={{
        src: "/images/tami-cutout.webp",
        width: 864,
        height: 937,
        alt: "Tami in a black shirt, looking at the camera",
      }}
      books={books}
      bookCard={{ href: "#work", open: "Open", close: "Close and show the next project", folio: "1" }}
      letter={{
        eyebrow: "A note to your business",
        greeting: "Dear business owner,",
        stamp: "Seal & send",
        postmark: "From Tami",
        seal: "T",
        sealing: "Sealed and on its way",
        messages: [
          "Your orders will confirm themselves while you sleep.",
          "Every new lead will land in your sheet before your coffee cools.",
          "Your website will load fast and look sharp on every phone.",
          "You will spend less time typing and more time growing.",
        ],
        counter: "Note",
      }}
      socialLinks={[
        { label: "WhatsApp", href: whatsappLink() },
        { label: "TikTok", href: contact.tiktokUrl },
        { label: "Email", href: `mailto:${contact.email}` },
      ]}
      motion={{ cursor: { readLabel: "Open" } }}
      scriptName
      className="tami-hero ea-script"
    />
  );
}
