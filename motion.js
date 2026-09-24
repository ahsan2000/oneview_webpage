const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const reveals = [...document.querySelectorAll("[data-reveal]")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });

  reveals.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 90}ms`);
    observer.observe(element);
  });

  const heroArt = document.querySelector(".hero-art");
  let frameRequested = false;
  const updateScrollMotion = () => {
    frameRequested = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--scroll-progress", maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    if (heroArt) heroArt.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.06, 28)}px`);
  };
  window.addEventListener("scroll", () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateScrollMotion);
  }, { passive: true });
  updateScrollMotion();
}
