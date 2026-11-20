/* ===== Tami portfolio — contact details live here, change them once ===== */
const CONFIG = {
  whatsapp: "2349072818333",          // WhatsApp number, country code, no + or spaces
  phone: "09072818333",
  email: "contact.tamilabs@gmail.com",
  tiktok: "tami.szn"
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;

/* ----- Contact links from CONFIG ----- */
const wa = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
$$("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
$$("[data-contact]").forEach(el => {
  const t = el.dataset.contact;
  if (t === "call") el.href = `tel:${CONFIG.phone}`;
  if (t === "sms") el.href = `sms:${CONFIG.phone}`;
  if (t === "mail") el.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Project enquiry")}`;
  if (t === "tiktok") el.href = `https://www.tiktok.com/@${CONFIG.tiktok}`;
});
$$("[data-show]").forEach(el => el.textContent = { phone: CONFIG.phone, email: CONFIG.email, tiktok: "@" + CONFIG.tiktok }[el.dataset.show]);
$("#year").textContent = new Date().getFullYear();

/* ----- Loader, then start the hero ----- */
addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 900));
setTimeout(() => document.body.classList.add("loaded"), 3500);

/* ----- Theme toggle ----- */
$(".theme").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.classList.add("theme-anim");
  root.dataset.theme = next;
  $('meta[name="theme-color"]').content = next === "light" ? "#f3f5fb" : "#050505";
  try { localStorage.setItem("tami-theme", next); } catch (e) {}
  setTimeout(() => root.classList.remove("theme-anim"), 700);
});

/* ----- Mobile menu ----- */
const header = $("header");
const closeMenu = () => { header.classList.remove("menu-open"); $(".burger").setAttribute("aria-expanded", "false"); };
$(".burger").addEventListener("click", e => e.currentTarget.setAttribute("aria-expanded", header.classList.toggle("menu-open")));
$$("nav a").forEach(a => a.addEventListener("click", closeMenu));

/* ----- Split headings into words ----- */
function splitWords(el) {
  let i = 0;
  (function walk(node) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(" "); return; }
          const w = document.createElement("span"); w.className = "w";
          const s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
          w.append(s); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  })(el);
}
$$(".split").forEach(splitWords);

/* ----- Reveal on scroll ----- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15 });
$$(".rv,.split,.case").forEach((el, i) => { if (el.classList.contains("rv")) el.style.setProperty("--d", `${(i % 4) * .08}s`); io.observe(el); });

/* ----- Pointer effects (desktop) ----- */
$$(".card").forEach(c => c.addEventListener("pointermove", e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${e.clientX - r.left}px`);
  c.style.setProperty("--my", `${e.clientY - r.top}px`);
}));
if (finePointer) {
  $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3 - 3}px)`;
    });
    b.addEventListener("pointerleave", () => b.style.transform = "");
  });
  const frame = $(".frame");
  $(".hero").addEventListener("pointermove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    frame.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  });
  $(".hero").addEventListener("pointerleave", () => frame.style.transform = "");
}

/* ----- Smooth scrolling (mouse wheel / trackpad; touch keeps native momentum) ----- */
const smooth = finePointer && !reduced;
const dlg = $("dialog");
let cur = scrollY, target = scrollY, busy = false;
const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
addEventListener("scroll", () => { if (!busy) cur = target = scrollY; }, { passive: true });
if (smooth) {
  addEventListener("wheel", e => {
    if (e.ctrlKey || dlg.open || Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.target.closest("textarea,select")) return;
    e.preventDefault();
    const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
    target = clamp(target + d, 0, maxScroll());
    busy = true;
  }, { passive: false });
}
function goTo(y) {
  y = clamp(y, 0, maxScroll());
  if (smooth) { target = y; busy = true; } else scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
}
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const id = a.getAttribute("href");
  const el = id.length > 1 ? $(id) : null;
  if (!el) return;
  e.preventDefault();
  goTo(id === "#top" ? 0 : el.getBoundingClientRect().top + scrollY - 64);
  if (id === "#contact") {
    const box = $(".methods"); box.classList.remove("flash");
    setTimeout(() => box.classList.add("flash"), 900);
  }
}));

/* ----- Horizontal "How we'll work together" ----- */
const hs = $(".hscroll"), track = $(".htrack"), hbar = $(".hbar i");
let dist = 0;
function sizeH() {
  dist = Math.max(0, track.scrollWidth - innerWidth);
  hs.style.height = `${dist + innerHeight}px`;
}
sizeH(); addEventListener("resize", sizeH); addEventListener("load", sizeH);
if (document.fonts) document.fonts.ready.then(sizeH);

/* ----- Parallax + marquee ----- */
const par = $$("[data-speed]");
const mq = $(".marquee div");
let mqX = 0, lastY = scrollY, vel = 0;
const prog = $(".progress");

function frame() {
  if (busy) {
    cur += (target - cur) * .085;
    if (Math.abs(target - cur) < .4) { cur = target; busy = false; }
    scrollTo(0, cur);
  }
  const y = scrollY;
  vel += ((y - lastY) - vel) * .12; lastY = y;

  header.classList.toggle("solid", y > 30);
  prog.style.transform = `scaleX(${clamp(y / Math.max(1, maxScroll()), 0, 1)})`;

  par.forEach(el => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    const c = r.top + r.height / 2 - innerHeight / 2;
    el.style.setProperty("--py", `${(c * -parseFloat(el.dataset.speed)).toFixed(1)}px`);
  });

  const hr = hs.getBoundingClientRect();
  const p = clamp(-hr.top / Math.max(1, hs.offsetHeight - innerHeight), 0, 1);
  track.style.transform = `translate3d(${-p * dist}px,0,0)`;
  hbar.style.transform = `scaleX(${p})`;

  if (!reduced) {
    mqX -= 1 + Math.abs(vel) * .35;
    const half = mq.scrollWidth / 2;
    if (-mqX >= half) mqX += half;
    mq.style.transform = `translate3d(${mqX}px,0,0) skewX(${clamp(-vel * .25, -8, 8)}deg)`;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ----- Image lightbox ----- */
$$(".gallery button").forEach(b => b.addEventListener("click", () => {
  const img = $("img", b);
  $("img", dlg).src = img.src; $("img", dlg).alt = img.alt;
  dlg.showModal();
}));
dlg.addEventListener("click", () => dlg.close());

/* ----- Quote form -> WhatsApp ----- */
$("#quote").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  window.open(wa(`Hi Tami, my name is ${f.get("name")}. I need: ${f.get("service")}.\n\n${f.get("details")}\n\nPlease send me a quote.`), "_blank", "noopener");
});
