(() => {
  const grid = document.querySelector("#featured-designs");
  const categoryLinks = [...document.querySelectorAll(".category-grid a")];
  if (!grid || categoryLinks.length === 0) return;

  const calendar = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parser = new DOMParser();
  let displayedDay;
  let catalogs;
  let updating = false;

  function rotationDay() {
    const parts = Object.fromEntries(
      calendar.formatToParts(new Date()).map(({ type, value }) => [type, value])
    );
    return Math.floor(Date.UTC(parts.year, parts.month - 1, parts.day) / 86400000);
  }

  async function loadCatalog(link) {
    const response = await fetch(link.href);
    if (!response.ok) throw new Error("Category could not be loaded");
    const page = parser.parseFromString(await response.text(), "text/html");
    const cards = [...page.querySelectorAll(".product-grid a.jewelry-card")];
    if (cards.length === 0) throw new Error("Category contains no product cards");
    return cards;
  }

  async function refresh() {
    if (document.hidden || updating || displayedDay === rotationDay()) return;
    updating = true;
    try {
      catalogs ??= await Promise.all(categoryLinks.map(loadCatalog));
      const day = rotationDay();
      grid.replaceChildren(...catalogs.map(cards => {
        const index = ((day % cards.length) + cards.length) % cards.length;
        return document.importNode(cards[index], true);
      }));
      displayedDay = day;
    } catch {
      // The page already has featured products to display if a category fails to load.
    } finally {
      updating = false;
    }
  }

  refresh();
  document.addEventListener("visibilitychange", refresh);
  window.setInterval(refresh, 60000);
})();
