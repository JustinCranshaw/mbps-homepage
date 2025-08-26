## Mount Baker Preschool — Design Guidelines

### Scope
These guidelines are derived from the completed hero section and shared tokens. Use them for all remaining pages and components to maintain a consistent, nature-inspired aesthetic.

### Brand character
- **Warm, natural, and calm**: organic forms, gentle motion, and soft glass surfaces.
- **Friendly but professional**: strong typographic hierarchy with clean CTAs.
- **Nature-first palette**: deep greens, soft mists, and wood tones with lively but sparing accents.

### Typography
- **Display (headings)**: `Fraunces`, serif
  - Weight 700; optical size set for large display.
  - Example style:
```css
.hero-title {
  font-family: 'Fraunces', serif;
  font-variation-settings: 'opsz' 144;
  font-size: clamp(2.4rem, 7.5vw, 4.2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #2D5016;
}
```
- **Accent (subheads/labels)**: `Amatic SC`, cursive
  - Bold 700; use sparingly for warmth and whimsy.
```css
.hero-subtitle {
  font-family: 'Amatic SC', cursive;
  font-size: clamp(1.4rem, 3.6vw, 2.3rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #52734D;
}
```
- **Body**: `Inter`, sans-serif
```css
.hero-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2.4vw, 1.35rem);
  line-height: 1.6;
  font-weight: 400;
  color: #2D3748;
}
```
- **Utilities**
  - CSS: `.font-display` and `.font-accent` are defined in `src/styles/tokens.css`.
  - Tailwind families are available via theme: `font-display`, `font-accent`, `font-body`.

### Color palette
Defined in `tailwind.config.js` and `src/styles/tokens.css`.
- **Core tokens**
  - `old-growth` `#1B4332` (deep forest)
  - `fern` `#52734D` (medium green)
  - `morning-mist` `#F0F4F5` (soft off-white)
  - `puget-sound` `#5C7A8B` (muted blue)
  - `granite` `#8B8680`
  - `salmon` `#E07B39`
  - `rain-cloud` `#A8B5BB`
  - `bark` `#3E2723`
- **Text**
  - Headings: `#2D5016` (dark green on white/glass)
  - Body: `#2D3748` for high readability
- **CTA accent gradient** (primary button)
  - From `#D946EF` → `#F472B6` → `#FB7185`
  - Reserve for primary CTAs only; secondary actions stay neutral.

### Surfaces and depth
Use a soft “glass card” with subtle nature tints for content blocks.
```css
.text-backdrop {
  background: rgba(255, 255, 255, 0.66);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.65);
}
.text-backdrop::before { /* subtle radial tints */
  background: radial-gradient(120% 120% at 20% 0%, rgba(126, 211, 33, 0.10) 0%, rgba(126, 211, 33, 0.06) 25%, rgba(255,255,255,0) 55%),
              radial-gradient(140% 140% at 100% 100%, rgba(80, 227, 194, 0.06) 0%, rgba(255,255,255,0) 50%);
}
```
- **Border radius**: 20px for cards; 10px for buttons.
- **Shadows**: soft, layered, low-opacity; avoid harsh contrast.

### Buttons
- **Primary**: gradient background, white text, gentle lift on hover.
```css
.hero-btn.primary {
  background: linear-gradient(135deg, #D946EF 0%, #F472B6 50%, #FB7185 100%);
  color: #fff;
  box-shadow: 0 6px 16px rgba(217, 70, 239, 0.35);
}
.hero-btn.primary:hover {
  filter: brightness(1.05);
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(217, 70, 239, 0.4);
}
```
- **Secondary**: white surface, `old-growth` text, subtle border and hover.
```css
.hero-btn.secondary {
  background: #fff;
  color: #2D5016;
  border: 2px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}
.hero-btn.secondary:hover {
  background: #F7FAFC;
  border-color: #CBD5E0;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}
```
- **Shared CTA ergonomics**
  - Padding `12px 24px`, min-height `48px`, `Inter` 600, 18px icons with `stroke-width: 2`.
  - Transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`; icon nudge `translateX(2px)` on hover.

### Motion and animation
- **Principles**: calm, continuous, low-amplitude; prefer transform/opacity for performance.
- **UI interactions**: 300ms `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Backgrounds**
  - Gradient shift: 20s ease-in-out, infinite.
  - Organic shapes: 12–20s float, opacity 0.08–0.15, random delays.
  - Particles: 9–14s upward drift with fade in/out.
- **Respect reduced motion**: disable non-essential animation when `prefers-reduced-motion: reduce` is set.

### Layout and spacing
- **Content width**: center blocks up to `900px`; horizontal padding `20px`.
- **Buttons layout**: grid, 2 columns with `12px` gap; stack at ≤768px.
- **Card padding**: desktop `40px 36px`; tablet `36px 28px`; mobile `28px 20px`.
- **Breakpoints** (observed)
  - ≤768px: stack CTAs, smaller ribbon area.
  - ≤480px: reduce type sizes (`title: ~2rem`, `subtitle: ~1.3rem`, `body: ~0.95rem`).

### Background motifs
- **Rolling hills**: rendered behind content; never interfere with contrast.
- **Dynamic ribbons**: above background but below content; low-motion wave/flutters.
- **Floating shapes/particles**: opacity ~0.1; small sizes; avoid overlap with key text.

### Accessibility
- **Contrast**: ensure headings at `#2D5016` and body at `#2D3748` on glass/white pass AA.
- **Hit areas**: CTA min-height `48px` with generous padding.
- **Motion**: provide a reduced-motion experience.
- **Fonts**: load via `<link>` with preconnect; fallbacks included.

### Tailwind usage tips
- **Fonts**: `class="font-display"`, `class="font-accent"`, `class="font-body"`.
- **Colors**: `text-old-growth`, `text-fern`, `bg-morning-mist`, etc.
- **Card scaffold** (mix utilities + a component class for glass specifics):
```html
<div class="max-w-[900px] mx-auto px-5">
  <div class="rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.10),_0_2px_8px_rgba(0,0,0,0.06)] border border-white/65 bg-white/70 [backdrop-filter:blur(16px)_saturate(120%)]">
    <!-- content -->
  </div>
</div>
```

### Reusable section skeleton
Use this when building new pages so the look stays cohesive.
```html
<section class="relative py-16">
  <div class="max-w-[900px] mx-auto px-5">
    <div class="text-backdrop">
      <h2 class="font-display text-old-growth text-3xl md:text-4xl tracking-tight">Section Title</h2>
      <p class="font-accent text-fern text-2xl mt-3">Optional subtitle</p>
      <p class="font-body text-slate-700 mt-6">Body copy goes here.</p>
      <div class="grid grid-cols-2 gap-3 mt-6 md:grid-cols-2 sm:grid-cols-1">
        <a class="hero-btn primary">Primary</a>
        <a class="hero-btn secondary">Secondary</a>
      </div>
    </div>
  </div>
</section>
```

### Implementation references
- See `src/styles/hero.css` for canonical values used above.
- See `src/styles/tokens.css` and `tailwind.config.js` for font and color tokens.
