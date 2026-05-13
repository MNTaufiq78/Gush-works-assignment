# Mangalam HDPE Pipes - Premium HDPE Pipe Manufacturing Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-00C853?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 📋 Overview

A complete, production-ready front-end website for **Mangalam HDPE Pipes** - a premium HDPE pipe and coil manufacturer. This project was developed as a front-end assessment demonstrating pixel-perfect implementation of Figma designs, responsive layouts, interactive components, and modern web development practices.

## 🎯 Assessment Requirements Met

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Pixel-perfect Figma implementation | ✅ Complete | Exact colors, spacing, typography from design |
| Fully responsive (Desktop, Tablet, Mobile) | ✅ Complete | Media queries for all breakpoints (1440px, 1024px, 768px, 640px, 600px) |
| Sticky header with scroll behavior | ✅ Complete | Appears after first fold, disappears on scroll up |
| Image carousel with zoom feature | ✅ Complete | Magnetic zoom lens with diagonal center calculation + magnified preview |
| Clean, semantic HTML5 | ✅ Complete | Proper sectioning, headings, and landmark elements |
| Cross-browser compatibility | ✅ Complete | Tested on Chrome, Firefox, Safari, Edge |

## ✨ Features

### 1. Sticky Header Navigation
- Fixed-position header that appears when scrolling beyond the first fold
- Smooth slide-in/out animation using CSS transforms
- Disappears when scrolling back up for optimal screen real estate

### 2. Image Carousel with Magnetic Zoom Lens
- **Carousel:** Navigate through product images with next/prev buttons or thumbnail clicks
- **Magnetic Zoom Lens:** Circular lens follows cursor with diagonal center calculation
- **Zoom Preview:** Separate panel shows magnified view at 2.8x zoom
- **Touch Swipe:** Mobile gesture support with 50px threshold detection
- **Fade Transitions:** Smooth opacity transitions between image changes

### 3. Technical Specifications Table
- Dark-themed table matching Figma specifications
- Exact colors: background `#0F172A`, subtitle `#94A3B8`
- Responsive with horizontal scroll on mobile devices
- Row hover effects for better readability

### 4. Interactive Components
- **FAQ Accordion:** Click to expand/collapse answers, chevron rotation animation
- **Popup Modals:** Download brochure and request callback with form validation
- **Infinite Sliders:** Continuous horizontal scrolling for applications and testimonials
- **Process Stepper:** Clickable steps showing different manufacturing stages

### 5. Fully Responsive Layout
- Desktop: 1240px max-width container with proper margins
- Tablet: 1024px, 900px, 768px breakpoints
- Mobile: 640px and 600px breakpoints
- Fluid images and flexible grid layouts

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic document structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (Vanilla)** | Interactive components, DOM manipulation |
| **Google Fonts (Inter)** | Modern typography |
| **Font Awesome 6** | Icons for UI elements |

## 📁 Project Structure
Gush-works-assignment/
│
├── index.html # Main HTML document
├── style.css # Complete stylesheet (23 organized sections)
├── script.js # JavaScript functionality (12 feature blocks)
├── Media/ # Images and assets folder
│ ├── Logo.png
│ ├── Hero slide image.jpg
│ ├── Slide image 2.jpg
│ ├── Euroflex.jpg
│ ├── Complete piping soln.webp
│ └── complete piping soln 2.jpg
│
└── README.md # Project documentation

## 🚀 How to Run Locally

### Option 1: Direct Browser
1. Clone the repository:
```bash
git clone https://github.com/yourusername/mangalam-hdpe-pipes.git

cd Gush-works-assignment

# Using VS Code Live Server extension
Right-click on index.html → Open with Live Server

# OR using Python
python -m http.server 8000

# OR using Node.js
npx serve .

```
## 📱 Responsive Breakpoints

| Breakpoint | Target Device | Layout Changes |
|------------|---------------|----------------|
| > 1440px | Large Desktop | Body padding 100px, container max-width 1240px |
| 1024px - 1439px | Desktop | Normal container padding |
| 900px - 1023px | Small Desktop | Hero grid to column, font size adjustments |
| 768px - 899px | Tablet | Feature grid to 2 columns, zoom preview hidden |
| 640px - 767px | Large Mobile | Feature grid to 1 column, FAQ padding reduced |
| < 640px | Mobile | Thumbnail size reduced, stacked layouts |

---

## 🎨 Key CSS Sections

The CSS is organized into 23 numbered sections:

| # | Section Name |
|---|--------------|
| 1 | Reset & Global |
| 2 | Variables |
| 3 | Container & Layout |
| 4 | Sticky Header |
| 5 | Main Header / Navbar |
| 6 | Breadcrumb |
| 7 | Product Showcase Gallery |
| 8 | Product Info Section |
| 9 | Trust Bar Section |
| 10 | Magnifying Glass Zoom |
| 11 | Trusted By Section |
| 12 | Technical Specifications Section |
| 13 | Features Section |
| 14 | FAQ Section |
| 15 | Catalogue Banner |
| 16 | Applications Section |
| 17 | Process Section |
| 18 | Testimonial Section |
| 19 | Portfolio Section |
| 20 | Resources Section |
| 21 | CTA Contact Section |
| 22 | Footer |
| 23 | Responsive Media Queries |

---

## 🔧 JavaScript Features Explained

| Function | Description |
|----------|-------------|
| Sticky Header | Tracks scroll direction, shows/hides header |
| Magnetic Zoom Lens | Diagonal center calculation, 2.8x magnification |
| Touch Swipe | Detects horizontal swipes on mobile |
| FAQ Accordion | Toggles answers, rotates chevron icons |
| Popup Modals | Open/close with multiple triggers (×, outside click, ESC) |
| Infinite Sliders | Clones content for seamless horizontal scrolling |

---

## 📊 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

---

## 🎯 Performance Optimizations

- CSS transforms for animations (GPU accelerated)
- Images with proper object-fit and aspect-ratio
- Lazy loading not required (all images above fold)
- Minimal JavaScript with event delegation where applicable
- No external dependencies (only Font Awesome CDN)

---

## 📝 Code Quality Standards Followed

- ✅ Semantic HTML5 elements (`<header>`, `<section>`, `<nav>`, `<main>`, `<footer>`)
- ✅ BEM-inspired class naming convention
- ✅ Proper indentation and formatting
- ✅ Comprehensive comments explaining each block
- ✅ No inline styles (all styles in external CSS)
- ✅ No console errors or warnings
- ✅ Accessibility considerations (alt tags, semantic structure)

---

## 🔄 Future Enhancements

- [ ] Add search functionality for products
- [ ] Implement actual form submission with backend integration
- [ ] Add more product images to carousel
- [ ] Implement lazy loading for below-fold images
- [ ] Add PWA support for offline access
- [ ] Integrate Google Analytics for tracking
- [ ] Add dark mode toggle

---

## 📧 Contact

For questions or feedback about this project:

- **Email:** gydmnt@gmail.com
- **GitHub:** MNTaufiq78

---

## 📄 License

This project is for assessment purposes. All rights reserved.

---

## Acknowledgements

- Font Awesome for icon library
- Google Fonts for Inter typeface
- Figma for design specifications

---

**Built with ❤️ for the GushWork Front-End Assessment**

