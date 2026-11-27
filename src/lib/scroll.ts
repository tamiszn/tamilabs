import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smoothly scroll to a section by id (works with or without Lenis). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", `#${id}`);
}

/** Tell the quote form which service to preselect, then scroll to it. */
export function requestQuote(service?: string) {
  if (service) {
    window.dispatchEvent(new CustomEvent("tami:select-service", { detail: service }));
  }
  scrollToId("quote");
}
