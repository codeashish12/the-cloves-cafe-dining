'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Leaf, MapPin,
  Menu as MenuIcon, Phone, Plus, Star, UtensilsCrossed, X,
} from 'lucide-react';

type Dish = {
  id: string; name: string; categories: string[]; description: string; image: string;
  alt: string; vegetarian?: boolean; nonVeg?: boolean; label?: string;
};
type GalleryImage = { src: string; title: string; category: 'Food' | 'Interiors' | 'Drinks' | 'Vibe'; alt: string };

const phone = '+916389061111';
const phoneLabel = '063890 61111';
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=The%20Cloves%20Cafe%20%26%20Dining%2C%20GT%20Road%2C%20in%20front%20of%20Subhash%20Park%2C%20Pandit%20Deen%20Dayal%20Upadhyaya%20Nagar%2C%20Uttar%20Pradesh%20232101';
const reviewsUrl = 'https://www.google.com/maps/search/?api=1&query=The%20Cloves%20Cafe%20%26%20Dining%20Mughalsarai';
const orderUrl = 'https://zoma.to/r/19178323';
const address = <>GT Rd, in front of Subhash Park, above Allahabad Bank,<br />Ravi Nagar, Subhash Nagar,<br />Pandit Deen Dayal Upadhyaya Nagar,<br />Uttar Pradesh 232101</>;

const categories = ['All', 'Starters', 'Soups', 'Main Course', 'North Indian', 'Chinese', 'Cafe', 'Shakes', 'Mocktails', 'Desserts'];
const dishes: Dish[] = [
  { id: 'paneer-tikka', name: 'Paneer Tikka', categories: ['Starters', 'North Indian'], description: 'Char-grilled cottage cheese with aromatic spices.', image: '/images/indian4.webp', alt: 'Grilled paneer pieces with herbs, illustrative food photography', vegetarian: true, label: 'From the tandoor' },
  { id: 'hakka-noodles', name: 'Hakka Noodles', categories: ['Chinese'], description: 'Classic wok-tossed noodles with fresh vegetables.', image: '/images/noodles1.webp', alt: 'Wok-tossed noodles with vegetables, illustrative food photography', label: 'Guest favourite' },
  { id: 'kitkat-shake', name: 'KitKat Shake', categories: ['Shakes', 'Cafe'], description: 'A rich chocolate shake blended with KitKat.', image: '/images/shake.webp', alt: 'Chocolate shake topped with chocolate pieces, illustrative food photography', label: 'Cafe favourite' },
  { id: 'dal-fry', name: 'Dal Fry', categories: ['Main Course', 'North Indian'], description: 'A much-mentioned comfort classic from the menu.', image: '/images/indian5.webp', alt: 'A bowl of Indian dal with herbs, illustrative food photography', vegetarian: true, label: 'North Indian' },
  { id: 'tawa-roti', name: 'Tawa Roti', categories: ['North Indian'], description: 'A familiar table favourite, best enjoyed warm.', image: '/images/indian2.webp', alt: 'Fresh Indian flatbread served with curry, illustrative food photography', vegetarian: true, label: 'Fresh from the tawa' },
  { id: 'methi-chicken', name: 'Methi Chicken', categories: ['Main Course', 'North Indian'], description: 'A rich, flavourful chicken dish guests mention often.', image: '/images/indian1.webp', alt: 'Rich Indian chicken curry with herbs, illustrative food photography', nonVeg: true, label: 'House favourite' },
  { id: 'manchow-soup', name: 'Veg Manchow Soup', categories: ['Soups', 'Chinese'], description: 'A warming Indo-Chinese favourite for the table.', image: '/images/indian3.webp', alt: 'A spread of vegetarian Indian dishes, illustrative food photography', vegetarian: true, label: 'Comfort in a bowl' },
  { id: 'honey-chilli-potato', name: 'Honey Chilli Potato', categories: ['Starters', 'Chinese'], description: 'Crisp potato with a sweet-and-spicy finish.', image: '/images/indian4.webp', alt: 'A golden grilled appetiser, illustrative food photography', vegetarian: true, label: 'For the table' },
  { id: 'mocktails', name: 'Mocktails', categories: ['Mocktails'], description: "A refreshing sip to pair with your meal. Ask about today's selection.", image: '/images/mocktail.webp', alt: 'Colourful drinks in glasses, illustrative drink photography', label: 'Something refreshing' },
  { id: 'strawberry-punch', name: 'Strawberry Punch', categories: ['Mocktails'], description: 'A strawberry mocktail mentioned in the business listing.', image: '/images/mocktail.webp', alt: 'A bright fruit mocktail, illustrative drink photography', label: 'A refreshing favourite' },
  { id: 'sizzlers', name: 'Sizzlers', categories: ['Cafe', 'Main Course'], description: 'A hearty cafe-style plate for an unhurried meal.', image: '/images/sizzler.webp', alt: 'A sizzling main course with accompaniments, illustrative food photography', label: 'Made for sharing' },
];
const menuImages: GalleryImage[] = [
  { src: '/images/indian4.webp', title: 'Paneer Tikka', category: 'Food', alt: 'Grilled paneer dish, illustrative food photography' },
  { src: '/images/noodles1.webp', title: 'Hakka Noodles', category: 'Food', alt: 'Noodles served with vegetables, illustrative food photography' },
  { src: '/images/cloves-interior-reference.webp', title: 'The dining room', category: 'Interiors', alt: 'Warmly lit dining room shown in the supplied business listing image' },
  { src: '/images/mocktail.webp', title: 'A refreshing pause', category: 'Drinks', alt: 'Colourful drinks in stemmed glasses, illustrative photography' },
  { src: '/images/coffee.webp', title: 'A relaxed cafe moment', category: 'Vibe', alt: 'A cafe table beside a bright window, illustrative atmosphere photography' },
  { src: '/images/indian3.webp', title: 'On the table', category: 'Food', alt: 'A selection of Indian dishes, illustrative food photography' },
  { src: '/images/shake.webp', title: 'KitKat Shake', category: 'Drinks', alt: 'Chocolate shake, illustrative drink photography' },
  { src: '/images/cafe.webp', title: 'Cafe atmosphere', category: 'Interiors', alt: 'A contemporary cafe dining space, illustrative atmosphere photography' },
];
const galleryCategories = ['All', 'Food', 'Interiors', 'Drinks', 'Vibe'];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: reduced ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className="brand" aria-label="The Cloves Cafe and Dining, home"><span className="brand-monogram">C</span><span className="brand-lockup"><span className="brand-name">The Cloves</span><span className="brand-sub">Cafe &amp; Dining</span></span>{footer && <span className="sr-only"> home</span>}</a>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = () => setOpen(false);
  return <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
    <div className="wrap header-inner"><Brand />
      <button className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(v => !v)}>{open ? <X size={23} /> : <MenuIcon size={23} />}</button>
      <nav id="main-navigation" className={`nav${open ? ' open' : ''}`} aria-label="Main navigation">
        {[['Home', '#home'], ['Menu', '#menu'], ['About', '#about'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
        <a className="nav-cta" href={`tel:${phone}`} onClick={close}>Reserve a table <ArrowUpRight size={13} /></a>
      </nav>
    </div>
  </header>;
}

function DishDialog({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (dish && !el.open) el.showModal();
    if (!dish && el.open) el.close();
  }, [dish]);
  return <dialog ref={ref} aria-labelledby="dish-dialog-title" onClose={onClose} onClick={e => { if (e.target === ref.current) ref.current?.close(); }}>
    {dish && <div className="dialog-inner"><button className="dialog-close" aria-label="Close dish details" onClick={() => ref.current?.close()}><X size={20} /></button><div className="dialog-image"><Image src={dish.image} alt={dish.alt} fill sizes="(max-width:760px) 100vw, 45vw" /></div><div className="dialog-copy"><span className="eyebrow">{dish.categories.join(' · ')}</span><h2 id="dish-dialog-title">{dish.name}</h2><p>{dish.description}</p><p>Current item prices are not available in this preview. Please check the live menu or call the cafe.</p><div className="dialog-actions"><a className="btn btn-gold" href={orderUrl} target="_blank" rel="noreferrer">View online menu <ArrowUpRight size={14} /></a><a className="btn btn-outline-dark" href={`tel:${phone}`}>Call to ask <Phone size={13} /></a></div></div></div>}
  </dialog>;
}

function Lightbox({ item, images, onClose, onChange }: { item: GalleryImage | null; images: GalleryImage[]; onClose: () => void; onChange: (next: GalleryImage) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const current = item ? images.findIndex(i => i.src === item.src && i.title === item.title) : -1;
  const cycle = (step: number) => { if (images.length) onChange(images[(current + step + images.length) % images.length]); };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (item && !el.open) el.showModal();
    if (!item && el.open) el.close();
  }, [item]);
  useEffect(() => {
    if (!item) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') cycle(1); if (e.key === 'ArrowLeft') cycle(-1); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  });
  return <dialog ref={ref} className="lightbox" aria-label={item ? `Photo: ${item.title}` : 'Photo gallery'} onClose={onClose} onClick={e => { if (e.target === ref.current) ref.current?.close(); }}>
    {item && <figure><button className="icon-btn lightbox-close" aria-label="Close photo" onClick={() => ref.current?.close()}><X size={22} /></button><Image src={item.src} alt={item.alt} width={1280} height={850} sizes="90vw" /><button className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => cycle(-1)}><ArrowLeft size={19} /></button><button className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => cycle(1)}><ArrowRight size={19} /></button><figcaption><span>{item.title}</span><small>{item.category}</small></figcaption></figure>}
  </dialog>;
}

export default function HomePage() {
  const [menuCategory, setMenuCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [galleryCategory, setGalleryCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState<GalleryImage | null>(null);
  const visibleDishes = menuCategory === 'All' ? dishes : dishes.filter(d => d.categories.includes(menuCategory));
  const visibleGallery = galleryCategory === 'All' ? menuImages : menuImages.filter(i => i.category === galleryCategory);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Restaurant', name: 'The Cloves Cafe & Dining',
    servesCuisine: ['North Indian'], telephone: phone, priceRange: '₹200–₹1,200',
    address: { '@type': 'PostalAddress', streetAddress: 'GT Rd, in front of Subhash Park, above Allahabad Bank, Ravi Nagar, Subhash Nagar', addressLocality: 'Pandit Deen Dayal Upadhyaya Nagar', addressRegion: 'Uttar Pradesh', postalCode: '232101', addressCountry: 'IN' },
    hasMap: mapUrl, menu: orderUrl,
  };
  return <MotionConfig reducedMotion="user">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Header />
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image"><Image src="/images/hero-interior.webp" alt="A warmly lit cafe interior, illustrative stock photography" fill priority sizes="100vw" /></div>
        <div className="wrap hero-content"><div className="hero-copy">
          <div className="hero-kicker">Pandit Deen Dayal Upadhyaya Nagar</div>
          <div className="hero-wordmark"><strong>THE CLOVES</strong><span>CAFE &amp; DINING</span></div>
          <h1 id="hero-title">Good Food. Great Moments.</h1>
          <p>An elevated café and dining experience in the heart of PDDU Nagar.</p>
          <div className="hero-actions"><a className="btn btn-gold" href="#menu">Explore menu <ArrowDown size={14} /></a><a className="btn btn-outline-light" href={`tel:${phone}`}>Reserve a table <ArrowUpRight size={14} /></a><a className="hero-call" href={`tel:${phone}`}><Phone size={15} /> Call now</a></div>
        </div><div className="hero-side">A local table, made memorable</div></div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to discover"><i /> Discover The Cloves</a>
      </section>

      <section className="intro" id="about" aria-labelledby="intro-title"><div className="wrap intro-grid">
        <Reveal className="intro-visual"><div className="main-photo"><Image src="/images/indian3.webp" alt="Indian meal spread with dal, breads and accompaniments; illustrative photography" fill sizes="(max-width:760px) 90vw, 48vw" /></div><div className="intro-inset"><Image src="/images/cloves-interior-reference.webp" alt="Warm, upholstered dining room from the supplied business listing image" fill sizes="(max-width:760px) 45vw, 20vw" /><span className="image-note">The Cloves · Dining room</span></div></Reveal>
        <Reveal className="intro-copy" delay={0.08}><span className="eyebrow">A place to gather</span><h2 className="section-title" id="intro-title">Where every meal becomes a memory.</h2><p className="section-copy">From comforting Indian classics to indulgent café favourites, The Cloves brings together great food, warm hospitality and an inviting atmosphere under one roof.</p><p className="intro-aside">For family meals, date nights, time with friends and celebrations worth sharing.</p>
          <div className="stats-row"><div className="stat"><div className="stat-number">4.2 <span style={{ color: 'var(--gold)', fontSize: 16 }}>★</span></div><div className="stat-label">Google rating</div></div><div className="stat"><div className="stat-number">1,043+</div><div className="stat-label">Guest reviews</div></div><div className="stat"><div className="stat-number">₹200–1,200</div><div className="stat-label">Per person</div></div><div className="stat"><div className="stat-number" style={{ fontSize: 21 }}>Here for you</div><div className="stat-label">Dine-in · takeaway · delivery</div></div></div>
        </Reveal>
      </div></section>

      <section className="menu-section" id="menu" aria-labelledby="menu-title"><div className="wrap"><Reveal className="section-head"><div><span className="eyebrow">A taste of The Cloves</span><h2 className="section-title" id="menu-title">The menu, at a glance.</h2></div><p>From North Indian comfort to café favourites and refreshing drinks. Browse a few guest-loved picks, then view the current menu online.</p></Reveal>
        <div className="menu-filters" role="group" aria-label="Filter menu by category">{categories.map(c => <button key={c} className="filter-button" aria-pressed={menuCategory === c} onClick={() => setMenuCategory(c)}>{c}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div className="menu-grid" key={menuCategory} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.22 }}>
          {visibleDishes.map(dish => <article className="dish-card" key={dish.id}><div className="dish-photo"><Image src={dish.image} alt={dish.alt} fill sizes="(max-width:760px) 46vw, 25vw" loading="lazy" /><span className="dish-tag">{dish.label}</span></div><div className="dish-info"><div className="dish-meta"><span className="dish-category">{dish.categories[0]}</span>{dish.vegetarian && <span className="diet"><span className="diet-dot">●</span> Veg</span>}{dish.nonVeg && <span className="diet nonveg"><span className="diet-dot">●</span> Non-veg</span>}</div><h3>{dish.name}</h3><p>{dish.description}</p><button className="dish-view" onClick={() => setSelectedDish(dish)}>View dish <ArrowUpRight size={12} /></button></div></article>)}
          {visibleDishes.length === 0 && <div className="empty-menu" style={{ gridColumn: '1/-1' }}><strong>Dessert selection</strong>For today's dessert options and current prices, please ask the team.</div>}
        </motion.div></AnimatePresence>
        <div className="menu-bottom"><span className="menu-note">Item prices are not listed here because a verified price list was not provided.</span><a className="btn btn-outline-dark" href={orderUrl} target="_blank" rel="noreferrer">View full menu <ArrowUpRight size={14} /></a></div>
      </div></section>

      <section className="signatures" aria-labelledby="signature-title"><div className="wrap"><Reveal className="section-head"><div><span className="eyebrow">Worth a return visit</span><h2 className="section-title" id="signature-title">The Cloves signatures.</h2></div><p>Popular picks from the menu and the moments guests remember. Ask the team what's available today.</p></Reveal>
        <div className="signature-layout"><Reveal className="signature-feature"><Image src="/images/indian4.webp" alt="Paneer tikka-style grilled dish, illustrative food photography" fill sizes="(max-width:760px) 90vw, 52vw" /><div className="signature-feature-caption"><span>North Indian · Starter</span><h3>Paneer Tikka</h3></div></Reveal><div className="signature-list">{[
          ['Hakka Noodles', 'Chinese favourite', '/images/noodles1.webp'], ['Veg Manchow Soup', 'A comforting bowl', '/images/indian3.webp'], ['Honey Chilli Potato', 'For the table', '/images/indian4.webp'], ['Dal Fry', 'North Indian classic', '/images/indian5.webp'], ['KitKat Shake', 'Cafe favourite', '/images/shake.webp'],
        ].map(([name, caption, src], i) => <Reveal key={name} className="signature-item" delay={i * .035}><Image src={src} alt={`${name}, illustrative food photography`} fill sizes="(max-width:760px) 45vw, 22vw" loading="lazy" /><div><small>{caption}</small><h3>{name}</h3></div></Reveal>)}</div></div>
      </div></section>

      <section className="experience" aria-labelledby="experience-title"><div className="wrap experience-grid"><Reveal className="experience-copy"><span className="eyebrow">Gather around</span><h2 className="section-title" id="experience-title">More than just a meal.</h2><p>Settle into a comfortable, inviting space for family dinners, casual dates, an evening with friends or a little celebration. Warm hospitality makes every visit feel easy.</p><p>Find us near Subhash Park, right on GT Road in PDDU Nagar.</p><a className="btn btn-outline-dark" href={mapUrl} target="_blank" rel="noreferrer">Plan your visit <ArrowUpRight size={14} /></a></Reveal><div className="experience-tiles"><div className="experience-tile"><Image src="/images/cloves-interior-reference.webp" alt="Warm dining room and upholstered seating at The Cloves, from the supplied listing photo" fill sizes="(max-width:760px) 90vw, 35vw" loading="lazy" /><span>The dining room</span></div><div className="experience-tile"><Image src="/images/cafe.webp" alt="Contemporary cafe atmosphere, illustrative photography" fill sizes="(max-width:760px) 45vw, 25vw" loading="lazy" /><span>Casual moments</span></div><div className="experience-tile"><Image src="/images/coffee.webp" alt="A table set for a quiet cafe moment, illustrative photography" fill sizes="(max-width:760px) 45vw, 25vw" loading="lazy" /><span>Time well spent</span></div></div></div></section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title"><div className="wrap"><Reveal className="section-head"><div><span className="eyebrow">A closer look</span><h2 className="section-title" id="gallery-title">A taste of the atmosphere.</h2></div><p>Explore the dishes, drinks and mood around the table.</p></Reveal>
        <div className="gallery-filter" role="group" aria-label="Filter gallery">{galleryCategories.map(c => <button key={c} aria-pressed={galleryCategory === c} onClick={() => setGalleryCategory(c)}>{c}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div className="gallery-grid" key={galleryCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
          {visibleGallery.map((img, i) => <button className="gallery-item" key={img.title} onClick={() => setActivePhoto(img)} aria-label={`Open photo: ${img.title}`}><Image src={img.src} alt={img.alt} fill sizes="(max-width:760px) 46vw, 24vw" loading="lazy" /><span className="gallery-caption"><span>{img.title}</span><small>{img.category}</small></span></button>)}
        </motion.div></AnimatePresence>
        <p className="gallery-disclosure">Food and atmosphere images are illustrative references except for the supplied dining-room photograph. Replace with owner-approved photography before launch.</p>
      </div></section>

      <section className="reviews" id="reviews" aria-labelledby="reviews-title"><div className="wrap reviews-grid"><Reveal className="rating-block"><div><div className="rating-number">4.2</div><div className="rating-stars" aria-label="4.2 stars">★★★★☆</div><div className="rating-caption">1,043+ Google reviews</div></div></Reveal><Reveal className="review-copy" delay={.06}><span className="eyebrow">Guest feedback</span><h2 className="section-title" id="reviews-title" style={{ fontSize: 'clamp(34px,4vw,48px)' }}>What our guests say.</h2><p>Review themes shared in the business listing mention dal fry, tawa roti and methi chicken, along with clean, well-decorated interiors, friendly staff and an inviting atmosphere.</p><div className="review-tags"><span>Dal Fry</span><span>Tawa Roti</span><span>Methi Chicken</span><span>Friendly hospitality</span><span>Inviting interiors</span></div><a className="btn btn-outline-dark" href={reviewsUrl} target="_blank" rel="noreferrer">Read Google reviews <ArrowUpRight size={14} /></a></Reveal></div></section>

      <section className="location" id="contact" aria-labelledby="location-title"><div className="wrap location-grid"><Reveal className="location-copy"><span className="eyebrow">Come on in</span><h2 className="section-title" id="location-title">Find us.</h2><div className="address-row"><MapPin size={18} /><div><strong>Visit The Cloves</strong>{address}<br /><span style={{ color: 'var(--clay)' }}>Landmark: Subhash Park</span></div></div><div className="address-row"><Phone size={17} /><div><strong>Call the restaurant</strong><a href={`tel:${phone}`} style={{ textDecoration: 'none' }}>{phoneLabel}</a><br />For today's hours, please call ahead.</div></div><div className="location-actions"><a className="btn btn-gold" href={mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a><a className="btn btn-outline-dark" href={`tel:${phone}`}>Call restaurant <Phone size={13} /></a></div></Reveal>
        <Reveal className="map-card" delay={.08}><div className="map-drawing" /><div className="map-park" /><div className="map-road" /><div className="map-road secondary" /><span className="map-pin"><MapPin size={49} fill="currentColor" /></span><a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">Open in maps <ArrowUpRight size={14} /></a><div className="map-label"><strong>The Cloves Cafe &amp; Dining</strong><span>Near Subhash Park · GT Road · PDDU Nagar</span></div></Reveal>
      </div></section>

      <section className="reservation" aria-labelledby="reservation-title"><div className="wrap reservation-inner"><div><span className="eyebrow">A seat at the table</span><h2 id="reservation-title">Your table is waiting.</h2><p>Planning dinner with friends, a family meal or a relaxed evening out? Come experience The Cloves.</p></div><div className="reservation-actions"><a className="btn btn-gold" href={`tel:${phone}`}>Reserve by phone <Phone size={14} /></a><a className="btn btn-outline-light" href={orderUrl} target="_blank" rel="noreferrer">Order online <ArrowUpRight size={14} /></a></div></div></section>
    </main>

    <footer className="footer"><div className="wrap"><div className="footer-main"><div className="footer-brand"><Brand footer /><p>Good food. Great moments. A warm table in the heart of PDDU Nagar.</p></div><div className="footer-column"><h3>Explore</h3><a href="#home">Home</a><a href="#menu">Menu</a><a href="#about">About</a><a href="#gallery">Gallery</a></div><div className="footer-column"><h3>Visit</h3><span>GT Rd, near Subhash Park<br />PDDU Nagar, Uttar Pradesh 232101</span><a href={mapUrl} target="_blank" rel="noreferrer">Get directions ↗</a></div><div className="footer-column"><h3>Contact</h3><a href={`tel:${phone}`}>{phoneLabel}</a><a href={orderUrl} target="_blank" rel="noreferrer">Order online ↗</a><span>Call to confirm today's hours</span></div></div><div className="footer-bottom"><span>© 2026 The Cloves Cafe &amp; Dining. All rights reserved.</span><span className="footer-tail-note">A warm table in Pandit Deen Dayal Upadhyaya Nagar.</span></div></div></footer>

    <nav className="mobile-actions" aria-label="Quick actions"><a href={`tel:${phone}`} aria-label="Call The Cloves"><Phone /><span>Call</span></a><a href={mapUrl} target="_blank" rel="noreferrer" aria-label="Get directions"><MapPin /><span>Directions</span></a><a href="#menu" aria-label="View menu"><UtensilsCrossed /><span>Menu</span></a><a href={`tel:${phone}`} aria-label="Reserve a table by phone"><Clock3 /><span>Reserve</span></a></nav>
    <DishDialog dish={selectedDish} onClose={() => setSelectedDish(null)} />
    <Lightbox item={activePhoto} images={visibleGallery} onClose={() => setActivePhoto(null)} onChange={setActivePhoto} />
  </MotionConfig>;
}
