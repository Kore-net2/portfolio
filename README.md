# Portfolio Template

A clean, responsive portfolio site built with HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies. Deploys for free on GitHub Pages.

**[Live demo →](https://cynthianiaz.github.io)**

## Features

- **Four pages** — Home, Resume, Projects, and Notes
- **Clean URLs** — `/resume` instead of `/resume.html`
- **Responsive** — looks good on desktop, tablet, and mobile
- **Fast** — no build step, no JavaScript frameworks, just static files
- **Easy to customize** — colors, fonts, and content are all in one place
- **Notes section** — a lightweight blog with a grid layout
- **Quote rotation** — rotating quotes on the home page
- **Scroll animations** — subtle fade-in effects as you scroll
- **GitHub Pages ready** — push and it's live

## Quick Start

1. Click **"Use this template"** (green button above) or fork the repo
2. Rename the repo to `yourusername.github.io`
3. Edit the HTML files with your own content
4. Push to GitHub — your site will be live at `yourusername.github.io`

## Local Development

Don't open HTML files directly in your browser — clean URLs require a server. Run this from your repo root instead:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Everything will work exactly as it does on GitHub Pages.

## Customization

### Colors

Open `assets/css/main.css` and change the CSS variables at the top:

```css
:root {
    --wine: #7d1e3e;        /* Main accent color — change this one */
    --wine-light: #9d3a5a;  /* Lighter variant for hover states */
    --wine-dark: #5a1529;   /* Darker variant */
    --cream: #faf8f5;       /* Background */
    --charcoal: #2a2a2a;    /* Body text */
    --gray: #6a6a6a;        /* Secondary text */
}
```

### Fonts

The site uses [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) for headings and [Work Sans](https://fonts.google.com/specimen/Work+Sans) for body text. To change them, update the Google Fonts import in each HTML file's `<head>` and the `font-family` references in the CSS.

### Content

Everything is in the HTML files — no CMS, no markdown. Each resume entry and project follows a consistent structure you can copy and paste.

### Profile photo

Drop your photo in `assets/images/personal/` and update the `<img>` src in `index.html`.

### Company logos

Replace the SVGs in `assets/images/logos/` with your own. Transparent PNGs work best at 56×56px.

### Email

Edit `assets/js/home.js` and change the `user` and `domain` variables to your email. It's split in JavaScript to reduce spam.

## File Structure

```
├── index.html                  ← Home page (stays at root)
├── 404.html                    ← Error page
├── resume/
│   └── index.html              ← yoursite.com/resume
├── projects/
│   └── index.html              ← yoursite.com/projects
├── notes/
│   ├── index.html              ← yoursite.com/notes
│   └── example-note/
│       └── index.html          ← yoursite.com/notes/example-note
└── assets/
    ├── css/
    │   ├── main.css            ← Shared styles (nav, footer, colors)
    │   ├── home.css            ← Home page
    │   ├── resume.css          ← Resume page
    │   ├── projects.css        ← Projects page
    │   ├── notes.css           ← Notes index
    │   ├── note-page.css       ← Individual note layout
    │   └── 404.css             ← Error page
    ├── js/
    │   ├── main.js             ← Shared (scroll, nav, animations)
    │   ├── home.js             ← Email obfuscation, parallax
    │   └── quotes.js           ← Quote rotation
    ├── documents/              ← PDFs (resume, papers)
    └── images/
        ├── logos/              ← Company logos for resume
        └── personal/           ← Profile photo
```

Each page lives in its own folder as `index.html` — this is what gives you clean URLs on GitHub Pages. The home page is the exception: `index.html` at the root already gets a clean URL, so it stays there.

Asset paths use `../assets/` from depth-1 pages (like `resume/`) and `../../assets/` from depth-2 pages (like `notes/example-note/`). Nav links use absolute paths like `/resume` and `/notes` so they work from any depth.

## Adding a Note

1. Create a new folder inside `notes/` — e.g. `notes/my-new-note/`
2. Copy `notes/example-note/index.html` into it and edit the content
3. Add a card for it in `notes/index.html` inside `.notes-grid` with `href="/notes/my-new-note"`

The first card in the grid can use the `featured` class to span two columns. Regular cards are square.

## Deploying

If you named your repo `yourusername.github.io`, it deploys automatically. Otherwise go to Settings → Pages, set source to "Deploy from a branch," and select `main`.

For a custom domain, add a `CNAME` file to the root with your domain name and configure DNS with your provider. GitHub has [good documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) on this.

## License

MIT — use it however you want. A link back is appreciated but not required.

## Credits

Designed and built by [Cynthia Niaz](https://cynthianiaz.github.io).