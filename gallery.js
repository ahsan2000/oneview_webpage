const slides = [
  {
    image: "assets/screenshot-dashboard.webp",
    title: "Your complete picture",
    description: "See your total portfolio value, invested amount, and performance over time in one clear view.",
    alt: "OneView overview showing portfolio value and performance chart",
  },
  {
    image: "assets/screenshot-portfolio-mix.webp",
    title: "Portfolio mix",
    description: "Understand how stocks, mutual funds, and VPS / pension holdings contribute to your portfolio.",
    alt: "OneView portfolio mix showing category allocation and stock sectors",
  },
  {
    image: "assets/screenshot-investments.webp",
    title: "Every investment, organized",
    description: "Search and filter holdings, then review units, current prices, and returns for each investment.",
    alt: "OneView Investment screen with search, category filters, and holding cards",
  },
  {
    image: "assets/screenshot-activity.webp",
    title: "A clear activity history",
    description: "Browse your recorded buys, sells, dividends, and fees, with category filters and sorting.",
    alt: "OneView Activity screen showing dated transactions and filters",
  },
  {
    image: "assets/screenshot-settings.webp",
    title: "Your data, your control",
    description: "Choose a theme, import statements, manage backups, and set device security options.",
    alt: "OneView Settings screen showing appearance, local files, and biometric lock",
  },
];

const showcase = document.getElementById("app-showcase");
if (showcase) {
  const AUTOPLAY_DELAY = 3000;
  const image = document.getElementById("showcase-image");
  const title = document.getElementById("showcase-title");
  const description = document.getElementById("showcase-description");
  const count = document.getElementById("showcase-count");
  const status = document.getElementById("showcase-status");
  const autoplayButton = document.getElementById("showcase-autoplay");
  const tabs = [...showcase.querySelectorAll("[data-slide]")];
  let current = 0;
  let timer = null;
  let inView = false;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let autoplayEnabled = !motionPreference.matches;

  // Download and decode every slide up front. By the time the visitor reaches
  // the showcase, changing `src` can use an image that is already in memory
  // instead of leaving the previous screenshot visible during a network wait.
  const slideImages = slides.map((slide, index) => {
    const cachedImage = new Image();
    cachedImage.decoding = "async";
    cachedImage.fetchPriority = index === 1 ? "high" : "low";
    cachedImage.src = slide.image;
    cachedImage.decode?.().catch(() => {});
    return cachedImage;
  });

  function showSlide(index, announce = false) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    image.src = slideImages[current].src;
    image.alt = slide.alt;
    image.classList.remove("slide-enter");
    void image.offsetWidth;
    image.classList.add("slide-enter");
    title.textContent = slide.title;
    description.textContent = slide.description;
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    tabs.forEach((tab, position) => tab.setAttribute("aria-pressed", String(position === current)));
    if (announce) status.textContent = `${slide.title}, screenshot ${current + 1} of ${slides.length}`;
  }

  function scheduleAutoplay() {
    window.clearTimeout(timer);
    timer = null;
    if (!autoplayEnabled || !inView || document.hidden) return;
    timer = window.setTimeout(() => {
      showSlide(current + 1);
      scheduleAutoplay();
    }, AUTOPLAY_DELAY);
  }

  function navigate(index) {
    showSlide(index, true);
    scheduleAutoplay();
  }

  function updateAutoplayButton() {
    autoplayButton.textContent = autoplayEnabled ? "Pause autoplay" : "Play autoplay";
    autoplayButton.setAttribute("aria-pressed", String(autoplayEnabled));
  }

  tabs.forEach((tab, index) => tab.addEventListener("click", () => navigate(index)));
  document.getElementById("showcase-previous").addEventListener("click", () => navigate(current - 1));
  document.getElementById("showcase-next").addEventListener("click", () => navigate(current + 1));
  autoplayButton.addEventListener("click", () => {
    autoplayEnabled = !autoplayEnabled;
    updateAutoplayButton();
    scheduleAutoplay();
  });
  showcase.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigate(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  let touchStartX = null;
  showcase.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.screenX ?? null;
  }, { passive: true });
  showcase.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0]?.screenX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 55) navigate(current + (distance < 0 ? 1 : -1));
  }, { passive: true });

  document.addEventListener("visibilitychange", scheduleAutoplay);
  motionPreference.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    autoplayEnabled = false;
    updateAutoplayButton();
    scheduleAutoplay();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      scheduleAutoplay();
    }, { threshold: 0.25 }).observe(showcase);
  } else {
    inView = true;
  }
  updateAutoplayButton();
  scheduleAutoplay();
}
