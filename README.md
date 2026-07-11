# Alex Sardaryan — Portfolio Website

---
## Live Demo

Link: http://127.0.0.1:5500/alex-sardaryan-pers-web/index.html
---

**Repo:** `alex-sardaryan-pers-web`

A single-page personal portfolio site built with vanilla HTML, CSS, and JavaScript. Showcases experience, skills, education, and contact info for a Full Stack Developer, with a dark/light mode toggle, animated cursor trail, scroll-based section indicators, and a mobile navigation menu.

**Live sections:** Home · About · Experience · Skills · Education · Contact

---

## Tech Stack

- **HTML5** — semantic markup, no framework
- **CSS3** — custom properties (CSS variables) for theming, CSS Grid/Flexbox for layout, no preprocessor
- **Vanilla JavaScript** — no build step, no dependencies
- **[Font Awesome 7](https://fontawesome.com/)** — icons, loaded via CDN
- **[Inter](https://fonts.google.com/specimen/Inter)** — typeface, loaded via Google Fonts

No package manager, bundler, or build process is required — it's plain static files.

---

## Project Structure

```
alex-sardaryan-pers-web/
├── css/
│   └── main.css              # All styling, theming, responsive breakpoints
├── images/
│   ├── skills/                # Skill icon PNGs (html.png, css.png, react.png, etc.)
│   └── me.jpeg                # Hero portrait
├── js/
│   └── main.js                # Scroll UI, mobile menu, cursor trail, dark mode
├── .gitignore
├── Alex_Sardaryan_Full_Stack_developer_CV.pdf       # Downloadable CV linked from the hero section
├── index.html                  # All page markup and content
└── README.md
```

---

## Features

- **Dark / light mode toggle** — preference is saved to `localStorage` and restored on next visit (falls back gracefully if storage is unavailable, e.g. private browsing)
- **Scroll-based section indicators** — dots on the right edge highlight the section currently in view, using `IntersectionObserver`
- **Mobile navigation menu** — accessible hamburger menu with keyboard support (Escape to close, focus returns to the trigger button)
- **Animated cursor trail** — custom cursor with a trailing dot effect; automatically disabled on touch devices and skipped entirely if `prefers-reduced-motion` is set
- **Scroll-to-top button** — appears after scrolling 300px down the page
- **Fully responsive** — breakpoints at 1600px, 1100px, 768px, and 480px

---

## Accessibility

- Skip-to-content link for keyboard users
- Visible `:focus-visible` outlines on all interactive elements
- Icon-only links (GitHub, LinkedIn) have `aria-label`s
- Mobile menu and dark-mode toggle expose their state via `aria-expanded` / `aria-pressed` / `aria-hidden`
- Section indicator dots are real `<button>` elements with `aria-current` on the active one
- Respects `prefers-reduced-motion` — animations and the custom cursor are disabled for users who request reduced motion
- Custom cursor (`cursor: none`) only applies on devices with a fine pointer (mouse), never on touch devices

---

## Customization

**Colors** — all theme colors live in `:root` at the top of `css/main.css`:
```css
:root {
  --dark: #0E0E0E;
  --green: #DFF11E;
  --lm-gold: #C89B3C;
  /* ...etc */
}
```
Light mode overrides are applied via the `body.light-mode` class.

**Content** — all text, dates, and links live directly in `index.html`; there's no CMS or data file to edit separately.

**Skill icons** — add or remove entries inside the relevant `.skill-logos` block in the Skills section, and drop a matching PNG into `images/skills/`.

---

## Browser Support

Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, CSS custom properties, and `backdrop-filter`, which are not supported in Internet Explorer.

---

## License

© 2025 Alex Sardaryan. All rights reserved — personal portfolio, not licensed for reuse.
