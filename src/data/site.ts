// All of Tami's contact details and page content live here,
// so they can be edited in one place.

export const contact = {
  whatsappNumber: "2349072818333",
  whatsappDisplay: "+234 907 281 8333",
  phoneNumber: "+2349037521249",
  phoneDisplay: "+234 903 752 1249",
  email: "contact.tamilabs@gmail.com",
  tiktokHandle: "tami.szn",
  tiktokUrl: "https://www.tiktok.com/@tami.szn",
};

export const whatsappLink = (text = "Hi Tami, I'd like to discuss a project.") =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const services = [
  {
    id: "automation",
    title: "Business Process Automation",
    short: "Workflows in n8n and Zapier that process orders, update payments and send notifications without anyone lifting a finger.",
    full: "I develop smart workflows using n8n and Zapier to automate repetitive business operations, streamline order processing, manage payment updates, and deliver important notifications without manual intervention.",
    quote: "Business automation",
  },
  {
    id: "website",
    title: "Websites & Landing Pages",
    short: "Modern, fast websites and high-converting landing pages that look sharp on every phone.",
    full: "I create modern, visually appealing websites and high-converting landing pages that strengthen your brand identity, deliver a seamless user experience, and perform smoothly across mobile devices.",
    quote: "Website / landing page",
  },
  {
    id: "chatbot",
    title: "Chatbots & SOPs",
    short: "Telegram bots that greet customers and collect leads, plus clear process documents your team can follow.",
    full: "I create Telegram chatbots that automatically engage with potential customers and collect leads, alongside well-structured process documentation that helps your team understand and execute business operations efficiently.",
    quote: "Chatbot & SOPs",
  },
  {
    id: "ecommerce",
    title: "E-commerce & Online Stores",
    short: "Online stores with tidy product listings, a cart, secure checkout, payments and automatic order emails.",
    full: "I build fully functional online stores with organised product listings, shopping carts, secure checkout experiences, integrated payment systems, and automated order confirmation emails.",
    quote: "Online store",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const quoteServices = [
  "Website / landing page",
  "Online store",
  "Business automation",
  "Chatbot & SOPs",
  "Not sure yet",
];

export type ProjectCategory = "websites" | "automation";

export type Project = {
  id: string;
  name: string;
  kind: string;
  category: ProjectCategory;
  summary: string;
  details: string[];
  tags: string[];
  images: { src: string; alt: string; tall?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "defamous",
    name: "Defamous Books",
    kind: "Online Store",
    category: "websites",
    summary:
      "An online bookshop that brings original UK Bond Maths and English workbooks to parents in Nigeria.",
    details: [
      "Parents shop by subject and age group, order straight from WhatsApp, and pay by card or bank transfer.",
      "A clear order tracker shows every step, from shipping in London to customs and delivery to any state.",
      "Built mobile-first, because most customers order from their phones.",
    ],
    tags: ["Online Store", "WhatsApp Ordering", "Mobile-first"],
    images: [{ src: "/images/defamous-books.webp", alt: "Defamous Books home page: Bond books from the UK, at your door in Nigeria" }],
  },
  {
    id: "sumptuous",
    name: "Sumptuous Foods",
    kind: "Telegram Ordering Bot & Mini App",
    category: "automation",
    summary:
      "A restaurant ordering and delivery system that runs entirely inside Telegram.",
    details: [
      "Customers search the menu, add meals to their cart and check out in a Telegram mini app.",
      "Every order gets its own ID, and the bot messages the customer in Telegram at each step until delivery.",
      "Behind it, n8n workflows handle new orders, order status updates and notifications automatically.",
    ],
    tags: ["Telegram Mini App", "n8n", "Order Tracking"],
    images: [
      { src: "/images/sumptuous-menu.webp", alt: "Sumptuous Foods mini app menu with rice dishes and soups", tall: true },
      { src: "/images/sumptuous-order.webp", alt: "Sumptuous Foods order placed confirmation screen", tall: true },
      { src: "/images/working-1.webp", alt: "Tami building the Sumptuous Foods n8n ordering workflows" },
      { src: "/images/working-2.webp", alt: "The Restaurant Ordering and Delivery System workflows in n8n", tall: true },
    ],
  },
  {
    id: "party-tickets",
    name: "Party Tickets Lead Bot",
    kind: "Telegram Lead Capture Automation",
    category: "automation",
    summary:
      "A Telegram bot that signs up party guests and saves every lead without anyone typing a thing.",
    details: [
      "The bot welcomes each guest, asks for their name and phone number, and checks the number is valid.",
      "Every registration is saved to Google Sheets, and the organiser gets an instant alert for each new lead.",
      "If anything fails, the bot tells the customer and alerts the admin, so no sign-up is lost.",
    ],
    tags: ["n8n", "Telegram Bot", "Google Sheets", "Admin Alerts"],
    images: [{ src: "/images/party-tickets-n8n.webp", alt: "n8n workflow for the Telegram Lead Capture Bot for party tickets" }],
  },
];

// Client reviews, as given by Tami. "service" is what Tami built for them.
export type Review = { name: string; role: string; service: string; quote: string };

export const reviews: Review[] = [
  {
    name: "Mr. Adugbe",
    role: "Business Owner",
    service: "Website Design & Development",
    quote:
      "Working with him was one of the best decisions for my business. He completely transformed our online presence with a clean, modern website that looks incredibly professional. The attention to detail was impressive, and the entire process was smooth.",
  },
  {
    name: "Mrs. Rowland",
    role: "Small Business Owner",
    service: "Custom Website Development",
    quote:
      "I really appreciated how he understood my vision and turned it into something even better than I imagined. The design is modern, the layout is well thought out, and everything works perfectly on mobile. Highly recommend his services!",
  },
  {
    name: "Ms. Rachel",
    role: "Online Business Owner",
    service: "Payment Integration & E-Commerce",
    quote:
      "The online payment integration has made a huge difference for us. Customers can now make payments directly through our website without having to go through unnecessary steps. It has made our business more convenient and professional.",
  },
  {
    name: "Mr. Adesina",
    role: "Founder & Entrepreneur",
    service: "Website Redesign",
    quote:
      "Our old website was outdated and honestly wasn't doing our business any justice. He redesigned everything and gave us a website that finally represents the quality of our brand. It's beautiful, responsive, and incredibly easy to navigate.",
  },
  {
    name: "Mr. Adegoke",
    role: "Company Director",
    service: "Website Development",
    quote:
      "From the initial discussion to the final delivery, the experience was excellent. He was professional, creative, and genuinely interested in making sure everything was right. Our website now gives potential customers a much better first impression.",
  },
  {
    name: "ShinaCreates",
    role: "Startup Founder",
    service: "Website Development",
    quote:
      "What stood out most was the quality of his work. The website feels premium, loads smoothly, and works exactly how we wanted. He also made sure the smallest details were taken care of. Definitely someone I'd recommend to other businesses.",
  },
];

export const steps = [
  {
    title: "Discovery call",
    text: "We talk on WhatsApp or a call. You tell me about your business, your goals and what's slowing you down.",
  },
  {
    title: "Plan & quote",
    text: "I map out the pages or the workflow, give you a clear price and timeline, and we agree before any work starts.",
  },
  {
    title: "Build & review",
    text: "I build it and share progress as I go. You review, and I refine until it's right.",
  },
  {
    title: "Launch & support",
    text: "I launch it, test everything live, show you how it works, with an SOP for automations, and stay on hand for support.",
  },
];

export const faqs = [
  {
    q: "How long does a project take?",
    a: "It depends on the size. A landing page is usually the quickest, while an online store or a multi-step automation takes longer. You get a clear timeline with your quote, before any work starts.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. I work with businesses in Nigeria and abroad, fully remotely. We keep in touch on WhatsApp, email or calls at times that suit your time zone.",
  },
  {
    q: "How does payment work?",
    a: "The price and payment terms are agreed in your quote before work begins, so there are no surprises. Message me and I'll walk you through it.",
  },
  {
    q: "Which tools do you use for automation?",
    a: "Mainly n8n and Zapier, connected to the tools you already use: Telegram, WhatsApp, Google Sheets, Gmail and your payment platform.",
  },
  {
    q: "Will I be able to manage it myself?",
    a: "Yes. When we launch, I show you how everything works. For automations you also get a written SOP, so you and your team know exactly what happens and what to do.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a short description of your business and what you want to achieve. Fill in the quote form below or message me on WhatsApp, and we'll take it from there.",
  },
];
