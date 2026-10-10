# ConnectNaija — Premium Nigerian Adult Relationship Directory

Frontend prototype for a Nigeria-focused adult relationship, sugar dating, companionship, and personal connection directory.

**For consenting adults aged 18+ only.**

## Technology Stack

- **HTML5** — semantic markup, separate pages
- **CSS3** — custom properties, Grid, Flexbox, no frameworks
- **Vanilla JavaScript (ES6+)** — no React, Vue, jQuery, or build tools

Open any HTML file in a browser. No installation, compilation, or server required for the static prototype.

```bash
# From the website/ directory
# Option 1: Open index.html directly in a browser
# Option 2: Serve locally for cleaner paths
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Project Structure

```
website/
├── index.html              # Homepage / SEO landing
├── browse.html             # Directory with filters
├── profile.html            # Individual profile (?id=)
├── list-profile.html       # Multi-step create listing
├── verification.html       # Simulated verification
├── login.html / register.html
├── favorites.html
├── dashboard.html
├── safety.html / privacy.html / terms.html / age-policy.html
├── report-profile.html / contact.html / 404.html
├── css/
│   ├── styles.css          # Design system
│   ├── components.css      # Header, cards, forms
│   ├── pages.css           # Page-specific
│   └── responsive.css
├── js/
│   ├── mock-data.js        # Nigerian states, profiles, interests
│   ├── app.js              # Shared utilities, homepage
│   ├── navigation.js
│   ├── filters.js          # Search, filter, sort, pagination
│   ├── favorites.js        # localStorage favorites
│   ├── profile.js
│   └── forms.js            # Multi-step, auth, verification
├── seo/
│   ├── robots.txt
│   └── sitemap.xml
└── README.md
```

## Features Implemented (Frontend Only)

- Premium 2026 visual design (ivory, charcoal, burgundy, gold)
- Responsive mobile-first layout
- Homepage with search, featured profiles, locations, categories, FAQ, CTA
- Browse page with live filters (state, city, interest, age, verified), sort, pagination
- Individual profile pages with gallery, contact actions, similar profiles
- Multi-step list-profile form with validation and photo preview
- Simulated verification UI (pending / approved / rejected states)
- Registration, login, password visibility, +234 phone formatting
- Favorites (localStorage)
- Member dashboard (pause/remove listing, contact visibility)
- Safety, privacy, terms, age policy, report, contact, 404
- JSON-LD on key static pages
- robots.txt and sitemap templates

## Mock Data

All profiles are fictional adults 18+. Locations use real Nigerian states and cities. Contact details are never real numbers. Images are loaded from Unsplash (portrait photography).

## SEO — What Is Complete vs What Needs Backend

### Completed in static HTML

- Semantic HTML5, one H1 per page, heading hierarchy
- Unique title tags and meta descriptions on public pages
- Canonical links (placeholder domain)
- Open Graph and Twitter card meta
- JSON-LD: WebSite, WebPage, CollectionPage
- Descriptive alt text on images
- Crawlable navigation and internal links
- Mobile responsive
- robots.txt and sitemap templates

### Requires backend / deployment support

1. **Dynamic profile URLs**  
   Production should serve full HTML for URLs such as `/profile/adaeze-001/` with correct title, description, canonical, H1, visible content, and ProfilePage/Person JSON-LD (only for approved public profiles). This static prototype uses `profile.html?id=`.

2. **Location & category landing pages**  
   Clean paths like `/browse/lagos/`, `/browse/lagos/lekki/`, `/categories/sugar-dating/` should return server-rendered HTML with location-specific content and listings — not empty or near-duplicate pages.

3. **HTTP status codes**  
   Removed or non-public profiles must return 404 or 410. Private pages should not be indexed.

4. **Sitemap generation**  
   Sync sitemap with approved public profiles and useful directory pages only. Exclude dashboards, drafts, and filter combinations.

5. **Authentication, moderation, verification, secure contact**  
   Client-side checks are not security controls. Age eligibility, verification, authorization, and private contact handling must be enforced server-side.

6. **Organization schema**  
   Add real Organization JSON-LD when legal entity details are available. Do not invent business credentials or ratings.

## Future API Integration Points

Marked in JS with `// TODO: API`:

- `MockData.getProfileById` → `GET /api/profiles/:id`
- Filter/search → `GET /api/profiles?state=&city=&interest=&...`
- Favorites → authenticated user favorites API
- Form submissions (list profile, register, login, report, verification) → respective POST endpoints
- Dashboard actions (pause, remove) → PATCH/DELETE profile endpoints

## Design Notes

- **Brand**: ConnectNaija (temporary; logo is a CSS wordmark — replace easily)
- **Colors**: Warm ivory `#FAF7F2`, deep charcoal, burgundy `#6B2D3C`, champagne gold `#C9A227`
- **UX inspiration**: Directory browsing patterns similar to codedruns.ng (not a visual or code copy)
- **Accessibility**: Focus states, labels, reduced-motion support, keyboard-friendly controls

## License & Usage

Prototype for demonstration and further development. Replace placeholder domain, legal text, and mock data before any production launch. Ensure full legal review of Terms, Privacy, and Age Policy.
