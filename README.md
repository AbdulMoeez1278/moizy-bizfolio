# leadflow-portfolio

Modern **Business Developer & Lead Generation Expert** portfolio website built with **vanilla HTML, CSS, and JavaScript**.

This repo contains a production-ready, responsive, accessible portfolio site with:

- Modern UI, animations and micro-interactions
- Light / dark theme toggle (respects `prefers-color-scheme`, persists to `localStorage`)
- Smooth scroll-reveal animations
- Typed/fading hero roles, skill animations, project modal, and a contact form (client-side validation)
- 100% responsive across mobile/tablet/desktop (four breakpoints)
- Semantic HTML and basic SEO meta tags
- Ready to host on GitHub Pages or Netlify

---

## File structure

leadflow-portfolio/
├─ index.html
├─ README.md
├─ css/
│ └─ styles.css
├─ js/
│ └─ script.js
└─ assets/
├─ hero.jpg
├─ profile.jpg
├─ case1.jpg
├─ case2.jpg
├─ case3.jpg
└─ testimonial1.jpg

---

## How to run locally

1. Clone or download this repository.
2. Place the `assets/` images (listed below) into the `assets/` folder.
3. Open `index.html` in your browser (no server required).
   - For best experience use a local static server (optional):
     - `npx http-server` or `python -m http.server 8000` then visit `http://localhost:8000`.

---

## Images (save these into `assets/`)

Download these images from Unsplash and save with the exact filenames shown.

- `assets/hero.jpg`  
  https://images.unsplash.com/photo-1522071820081-009f0129c71c

- `assets/profile.jpg`  
  https://images.unsplash.com/photo-1544005313-94ddf0286df2

- `assets/case1.jpg`  
  https://images.unsplash.com/photo-1504384308090-c894fdcc538d

- `assets/case2.jpg`  
  https://images.unsplash.com/photo-1542744173-8e7e53415bb0

- `assets/case3.jpg`  
  https://images.unsplash.com/photo-1521791136064-7986c2920216

- `assets/testimonial1.jpg`  
  https://images.unsplash.com/photo-1545996124-1b5a0f9e9a19

> Tip: For performance, create resized versions (e.g. `hero-480.jpg`, `hero-1024.jpg`) and update `srcset` in `index.html`. Compress images (WebP/optimized JPEG) for faster loads.

---

## Customization

- **Colors & spacing**: edit CSS variables at the top of `css/styles.css`.
- **Copy & branding**: replace "Your Name" and text in `index.html`.
- **Add more case studies**: duplicate `.project-card` in the portfolio section and update `data-project`.
- **Fonts**: currently using Inter via Google Fonts — change in `<head>`.

---

## Accessibility & SEO notes

- Uses semantic HTML5 tags and a skip link.
- All images include `alt` attributes (please update alt text to your real content).
- Keyboard accessible: focus states and aria attributes included for main interactions.
- Add structured data / Open Graph tags if publishing to increase share quality.

---

## Deployment

- Drag-and-drop to Netlify or enable GitHub Pages from repo settings.
- No build steps — static files only.

---

## Performance & improvements

- Defer or inline critical CSS, lazy-load large images, and convert assets to WebP for best scores.
- For heavy interactive needs consider adding small libraries (e.g. for typed effects) — but current solution keeps bundles minimal.

---

## License

You can reuse and modify this project freely. (Add your preferred license file if required.)

---

If you'd like, I can:

- Generate the actual files and zip them for download.
- Replace placeholder text with your real name, email, LinkedIn, and resume link.
- Convert images to optimized WebP and produce multiple sizes for `srcset`.
  Assets list (filenames + direct Unsplash URLs)
  assets/hero.jpg — https://images.unsplash.com/photo-1522071820081-009f0129c71c

assets/profile.jpg — https://images.unsplash.com/photo-1544005313-94ddf0286df2

assets/case1.jpg — https://images.unsplash.com/photo-1504384308090-c894fdcc538d

assets/case2.jpg — https://images.unsplash.com/photo-1542744173-8e7e53415bb0

assets/case3.jpg — https://images.unsplash.com/photo-1521791136064-7986c2920216

assets/testimonial1.jpg — https://images.unsplash.com/photo-1545996124-1b5a0f9e9a19

Suggested srcset strategy (example for hero/profile images in index.html):

<img src="assets/profile.jpg"
     srcset="assets/profile.jpg 400w, assets/profile.jpg 800w"
     sizes="(max-width:480px) 220px, (max-width:1024px) 300px, 380px"
     alt="Profile photo">
(For best performance, create separate resized files like profile-400.jpg, profile-800.jpg and reference them.)
