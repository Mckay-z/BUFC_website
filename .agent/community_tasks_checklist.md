# BUFC Community Page — Development Checklist

> **For:** King David  
> **Last Updated:** 2026-02-24

---

## Task 1: Public Community Page

- [x] Hero section with background image and CTAs (Join Community & Sign In buttons)
- [x] Community statistics section (Active Members, Matches Attended, Projects, Impact)
- [x] Featured community projects grid (image, title, status badge)
- [x] Category/filter tabs (All Projects, Ongoing, Completed, Education, Health, etc.)
- [x] Community activity teaser section (blurred preview with Hunters Hub CTA)
- [x] **Benefits of joining section** ← *Built in this session (6 icon cards + CTA)*
- [x] Final conversion CTA banner at bottom
- [x] Responsive design — desktop & tablet
- [x] Responsive design — mobile

---

## Task 2: Project Details Page

- [x] Back button + breadcrumb
- [x] Project hero image (aspect-video, rounded, shadow)
- [x] Project status/category badge
- [x] Impact metrics row (beneficiaries, funds, volunteer hours, status)
- [x] Portable text body content
- [x] CTA card (Volunteer Now + Donate Funds)
- [x] Social sharing (desktop vertical + mobile horizontal)
- [x] Related projects grid (3 cards)
- [x] Join the Hunters Pack section
- [x] **Community Reactions & Comments section** ← *Built in this session*
  - Threaded comments with replies
  - Like/unlike comments
  - Quick emoji reaction bar (👍🔥❤️👏)
  - Sign-in prompt for unauthenticated users
  - Sort by Newest / Top
- [x] **SEO meta tags** ← *Improved in this session*
  - Full Open Graph (article type, image, publishedTime)
  - Twitter Card (summary_large_image)
  - keywords array
  - canonical URL

---

## Task 3: Payment Modal

- [x] Volunteer registration form (name, phone, email, skills, message)
- [x] Donation mode with amount picker (preset + custom GHS input)
- [x] Payment method selector (Card / Mobile Money)
- [x] Success state screen
- [x] **Error state screen** ← *Added in this session*
- [x] **Processing state screen** ← *Added in this session*
- [x] **Mobile bottom-sheet style** ← *Added in this session*
- [x] **Paystack API route** (`/api/community/donate`) ← *Built in this session*
  - Converts GHS to kobo
  - Passes MoMo/Card channel to Paystack
  - Returns authorization URL for redirect
  - Graceful fallback in dev (no key required)
- [x] **Volunteer API route** (`/api/community/volunteer`) ← *Built in this session*
  - Optional Resend email confirmation
  - Safe dynamic import guards against missing package
- [x] Pre-fills form from authenticated user session
- [x] Paystack security badge + PCI DSS note
- [ ] Live Paystack key setup in `.env.local` *(configure when ready to go live)*
- [ ] Email confirmation via Resend *(install: npm install resend, add RESEND_API_KEY)*

---

## Task 4: Authenticated Community Dashboard

- [x] Dashboard shell with sidebar navigation and mobile menu
- [x] User avatar + role display in sidebar
- [x] Match History Tab — attended matches with results table
- [x] Season Tickets Tab — current season ticket card
- [x] Settings Tab — profile update, email display, password change button
- [x] **Activity Feed Tab** ← *Full implementation complete*
  - Compose box with auto-resize
  - Emoji reaction picker (👍🔥❤️🎉) per post
  - Expandable comment threads
  - Like/reply on individual comments
  - Poll voting with live percentages
  - Pinned announcement support
  - Hashtag tags on posts
  - Filter bar (All / Announcements / Match Talk / Community / Polls)
  - Top Contributors sidebar widget
  - Trending Topics sidebar widget
  - Club News sidebar widget
- [x] **My Impact Tab** ← *Built in this session*
  - Community rank bar (Top X%)
  - Stats row (hours, donations, projects, badges)
  - Badges grid (earned/locked with lock icon)
  - Volunteer history table
  - Donation history table

---

## Task 5: Sanity CMS

- [x] `communityProject` schema (title, slug, category, status, featured image, description, impact metrics)
- [x] `communityPageSettings` schema (hero, stats, featured projects, CTA text)
- [x] GROQ queries: single project, related projects, featured projects, all projects
- [x] Image pipeline with `urlFor()`
- [x] Sanity image for project header updated

---

## Task 6: Mobile Responsiveness

- [x] Community Page — hero, stats, bento grid, Hunters Hub
- [x] Community Page — "View All Projects" link visible on mobile
- [x] Community Page — mobile "View All Projects" button at section bottom
- [x] Project Details — back button, sharing icons, CTA
- [x] Payment Modal — **bottom-sheet on mobile** *(improved this session)*
- [x] Dashboard — responsive sidebar (hidden on mobile with hamburger)
- [x] Activity Feed — filter bar horizontal scroll

---

## Remaining / Future Tasks

| Task | Priority | Notes |
|---|---|---|
| Live Paystack secret key | HIGH | Add to `.env.local` when ready to go live | 
| Email confirmations via Resend | MEDIUM | `npm install resend`, add `RESEND_API_KEY` |
| Real backend for feed posts | MEDIUM | Replace mock data with Supabase/Firebase |
| My Impact — real data | MEDIUM | Wire to actual volunteer/donation records |
| Sanity preview mode | LOW | For content editor workflow |
| SEO: community listing page | LOW | Add OG tags to `/community` root |
| PWA / push notifications | LOW | Match day alerts for logged-in fans |
