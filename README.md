# The Cloves Cafe & Dining — website

A custom, responsive restaurant website built with **Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion and Lucide icons**. It exports as a static site for simple hosting; it does not require a database or server-side runtime.

## Run locally

Requirements: Node.js 20.9 or newer. The included `.npmrc` uses the official npm registry to avoid broken third-party mirrors.

```bash
npm install
npm run dev
```

## Build for launch

```bash
npm run typecheck
npm run build
```

`next build` generates the static website in `out/`. Upload the contents of that folder to a static host (for example, Vercel, Netlify, Cloudflare Pages or a web server). The project ZIP also includes this prebuilt `out/` directory.

## Included conversion paths

- Tap-to-call using the supplied phone number.
- Google Maps directions using the supplied PDDU Nagar address and Subhash Park landmark.
- Online-order link to the Zomato listing supplied in the business information.
- Reserve-by-phone actions (no separate booking system or WhatsApp number was supplied).
- Menu category filters, dish detail dialogs, gallery filters and keyboard-operable lightbox.

## Before public launch

- Replace illustrative Unsplash food/atmosphere photos with owner-approved photos of the actual restaurant and dishes. One dining-room photo was cropped from the supplied business-listing screenshot. See `ASSET_SOURCES.md`.
- Set the canonical URL and, if desired, the social sharing image once the production domain is known.
- Add verified opening hours and official social profiles only when supplied by the owner. No hours, handles, per-dish prices or reservation platform were invented.
- Menu cards intentionally omit exact prices. The overall ₹200–₹1,200 per-person estimate reflects the listing information supplied.
- Structured data includes restaurant name, address, phone, cuisine, menu and price range; opening hours and review aggregate markup are omitted because they were not appropriate to invent or reproduce as self-serving review data.

## Security and QA

- Production static export and TypeScript checks pass.
- `npm audit` reported zero vulnerabilities after dependency patching.
- Responsive previews were inspected at desktop and phone widths; no horizontal overflow or console errors were found in the render checks.
