# Project Handoff README

**Project:** Website Development
**Handoff To:** Emmanuel
**Priority:** Urgent
**Deadline:** February 4, 2026

---

## 📌 Project Overview

This project is a modern website built to present content, media, and key information in a clean and responsive format. The site is currently in active development and has most core pages and structure completed.

**Purpose:**
To deliver a functional, responsive, and CMS-driven website that allows easy content updates and a smooth user experience.

**Current Status:**
Partially complete — core UI implemented, some integrations and refinements pending.

**Tech Stack:**

* Next.js
* React
* Tailwind CSS
* Sanity CMS
* Vercel (Deployment)

---

## 🔗 Important Links & Access

* **Repository:** [Add GitHub Repo Link]
* **Live Site (if available):** [Add URL]
* **Figma/Design Files:** [Add Link]
* **CMS (Sanity Studio):** [Add Access Instructions]
* **Hosting Platform:** Vercel

> Note: Environment variables and sensitive keys are stored in `.env.local`.

---

## 📂 Project Structure Guide

```
/app            → Main pages and routing
/components     → Reusable UI components
/lib            → API queries, utilities, configurations
/public         → Static assets (images, icons)
/styles         → Global styling
```

Key Notes:

* Pages are built using the Next.js App Router.
* Reusable UI elements are organized inside `/components`.
* CMS queries and data fetching logic live inside `/lib`.

---

## ✅ Completed Features

* Homepage layout implemented
* Gallery page structure completed
* Contact page UI created
* CMS integration setup (Sanity)
* Core component structure established
* Basic responsiveness applied

---

## 🚧 Pending Tasks / In Progress

* Connect contact form to backend/email service
* Final mobile responsiveness adjustments
* SEO optimization (meta tags, performance)
* Image optimization improvements
* Final content population from CMS

---

## 🐞 Known Issues

* Gallery performance needs optimization on mobile
* Some images may not be fully optimized
* Contact form currently not sending submissions
* Minor layout spacing inconsistencies on smaller screens

---

## ⚙️ How to Run the Project Locally

1. Clone the repository:

```
git clone [repo-link]
```

2. Install dependencies:

```
npm install
```

3. Start development server:

```
npm run dev
```

4. Open in browser:

```
http://localhost:3000
```

5. Ensure `.env.local` is configured with required environment variables.

---

## 🧠 Key Implementation Notes (The “Why”)

* **Next.js** was chosen for performance and SEO benefits.
* **Tailwind CSS** is used for rapid UI development and consistency.
* **Sanity CMS** allows non-developers to update content easily.
* Components were built to be reusable to keep the system scalable.

---

## 🎯 Immediate Priority Tasks

1. Finalize form submission functionality
2. Review responsiveness across devices
3. Confirm CMS content syncing correctly
4. Polish UI spacing and performance

---

## 🤝 Handoff Notes for Emmanuel

* Review `/lib` folder for CMS queries and data flow.
* Most UI components are reusable and modular.
* Check environment variables if CMS data does not load.
* Reach out for clarification on any unclear logic or structure.

---

## 📅 Final Update

This document reflects the latest state of the project at the time of handoff. All core files, updates, and structure have been prepared to support a smooth continuation of development.

---
