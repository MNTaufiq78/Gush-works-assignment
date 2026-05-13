/* ============================================================================
   BLOCK 1: STICKY HEADER
   ============================================================================
   WHAT IT DOES:
   - Makes the header appear when you scroll down past the first fold
   - Makes the header disappear when you scroll back up
   - Uses transform translateY to slide in/out smoothly
   
   WHY THIS APPROACH:
   - transform animations are GPU accelerated (smoother than top/left)
   - 0.3s ease transition creates a polished feel
   - Tracks scroll direction to determine show/hide
   ============================================================================ */
const stickyHeader = document.getElementById('stickyHeader');
let lastScroll = window.scrollY;
let firstFold = window.innerHeight * 0.7;

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    if (currentScroll > firstFold) {
        if (currentScroll > lastScroll) {
            stickyHeader.classList.add('visible');
        } else if (currentScroll < lastScroll) {
            stickyHeader.classList.remove('visible');
        }
    } else {
      stickyHeader.classList.remove('visible');
    }
    lastScroll = currentScroll;
});

/* ============================================================================
   BLOCK 2: IMAGE ARRAY & DOM ELEMENTS
   ============================================================================
   WHAT IT DOES:
   - Stores all carousel image paths in an array
   - Gets references to all DOM elements needed for carousel functionality
   - Tracks current selected image index
   ============================================================================ */
const images = [
  "Media/Hero slide image.jpg",
  "Media/Slide image 2.jpg",
  "Media/Hero slide image.jpg",
  "Media/Slide image 2.jpg",
  "Media/Hero slide image.jpg",
  "Media/Slide image 2.jpg"
];

const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const zoomLens = document.getElementById("zoomLens");
const zoomPreview = document.getElementById("zoomPreview");
const mainContainer = document.getElementById("mainContainer");

let currentIndex = 0;

/* ============================================================================
   BLOCK 3: THUMBNAIL RENDERER
   ============================================================================
   WHAT IT DOES:
   - Creates thumbnail images for each carousel image
   - Highlights the active thumbnail with 'active' class
   - Adds click handlers to switch to selected image
   
   WHY THIS APPROACH:
   - Dynamic generation keeps thumbnails in sync with main image
   - Re-renders on each image change to update active state
   ============================================================================ */
function renderThumbnails() {
    thumbnailContainer.innerHTML = "";

    images.forEach((img, index) => {
        const thumb = document.createElement("div");
        thumb.classList.add("thumb");
        if (index === currentIndex) {
            thumb.classList.add("active");
        }
        thumb.innerHTML = `<img src="${img}" alt="">`;
        thumb.addEventListener("click", () => {
        currentIndex = index;
        updateGallery();
    });
    thumbnailContainer.appendChild(thumb);
  });
}

/* ============================================================================
   BLOCK 4: GALLERY UPDATER
   ============================================================================
   WHAT IT DOES:
   - Changes the main image source to the selected image
   - Adds fade transition (opacity) for smooth image changes
   - Updates thumbnails to reflect new active state
   - Updates zoom preview background image
   
   WHY 180ms DELAY:
   - Allows opacity transition to complete before changing image source
   - Creates smooth cross-fade effect
   ============================================================================ */
function updateGallery() {
    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = 1;
        renderThumbnails();
        zoomPreview.style.backgroundImage = `url('${images[currentIndex]}')`;
    }, 180);
}

/* ============================================================================
   BLOCK 5: NEXT / PREV BUTTONS
   ============================================================================
   WHAT IT DOES:
   - Next button: increments index, wraps around to 0 at the end
   - Prev button: decrements index, wraps around to last at the beginning
   - Calls updateGallery() to refresh display
   ============================================================================ */
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
});

/* ============================================================================
   BLOCK 6: MAGNETIC ZOOM LENS (CORE FEATURE)
   ============================================================================
   WHAT IT DOES:
   - Creates a zoom lens that follows the cursor
   - Uses DIAGONAL CENTER CALCULATION (lensWidth/2, lensHeight/2)
   - Shows magnified view in separate zoom-preview panel
   - Updates background position based on lens location
   
   WHY DIAGONAL CALCULATION IS IMPORTANT:
   - Centers the lens exactly under the cursor (not offset)
   - Provides natural magnetic feel as cursor stays centered
   - Prevents lens from jumping or lagging
   
   MATHEMATICAL FORMULAS USED:
   - lensPosition = cursorPosition - (lensSize/2)  ← diagonal center
   - backgroundSize = imageSize × zoomLevel (2.8x)
   - backgroundPosition = - (centerPosition × zoomLevel - previewWidth/2)
   ============================================================================ */
const zoomLevel = 2.8;
mainContainer.addEventListener("mousemove", (e) => {
    const rect = mainContainer.getBoundingClientRect();

    // Get cursor position relative to image container
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const lensWidth = zoomLens.offsetWidth;
    const lensHeight = zoomLens.offsetHeight;

    // DIAGONAL CENTER CALCULATION - keeps cursor in center of lens
    const diagonalX = lensWidth / 2;
    const diagonalY = lensHeight / 2;
    x = x - diagonalX;
    y = y - diagonalY;

    // Boundary limits - prevent lens from going outside image
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - lensWidth) { x = rect.width - lensWidth; }
    if (y > rect.height - lensHeight) { y = rect.height - lensHeight; }

    // Move lens to calculated position
    zoomLens.style.transform = `translate(${x}px, ${y}px)`;
    zoomLens.style.opacity = "1";
    zoomPreview.classList.add("active");

    // Calculate center of lens for zoom positioning
    const centerX = x + lensWidth / 2;
    const centerY = y + lensHeight / 2;

    // Calculate background size (original image × zoom level)
    const bgWidth = rect.width * zoomLevel;
    const bgHeight = rect.height * zoomLevel;
    zoomPreview.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;

    // MAGNETIC POSITION - maps lens position to zoom preview
    const bgPosX = -(centerX * zoomLevel - zoomPreview.offsetWidth / 2);
    const bgPosY = -(centerY * zoomLevel - zoomPreview.offsetHeight / 2);
    zoomPreview.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
});

mainContainer.addEventListener("mouseleave", () => {
  zoomLens.style.opacity = "0";
  zoomPreview.classList.remove("active");
});

/* ============================================================================
   BLOCK 7: TOUCH SWIPE FOR MOBILE
   ============================================================================
   WHAT IT DOES:
   - Detects horizontal touch swipes on mobile devices
   - Swipe left (startX - endX > 50) → next image
   - Swipe right (endX - startX > 50) → previous image
   
   WHY 50px THRESHOLD:
   - Prevents accidental swipes from small hand movements
   - Ensures intentional swipe gesture
   ============================================================================ */
let startX = 0;
mainContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});
mainContainer.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    // Swipe left → next image
    if (startX - endX > 50) {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    }

    // Swipe right → previous image
    if (endX - startX > 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    }
});

// Initialize gallery with first image
updateGallery();


/* ============================================================================
   BLOCK 8: FAQ ACCORDION
   ============================================================================
   WHAT IT DOES:
   - Toggles FAQ answer visibility when question is clicked
   - Rotates chevron icon 180 degrees when open
   - Closes other items when one is opened (accordion mode)
   
   WHY ACCORDION BEHAVIOR:
   - Prevents long page scrolling with all FAQs open
   - Keeps interface clean and focused
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');

            // Accordion mode: close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});

/* ============================================================================
   BLOCK 9: DOWNLOAD BROCHURE POPUP
   ============================================================================
   WHAT IT DOES:
   - Opens popup modal when "Download Full Technical Datasheet" is clicked
   - Prevents default link behavior (e.preventDefault)
   - Closes popup when clicking × button, clicking outside, or pressing ESC
   - Disables body scroll when popup is open (prevents background scrolling)
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const openPopupBtn = document.getElementById("openPopup");
    const closePopupBtn = document.getElementById("closePopup");
    const catalogPopup = document.getElementById("catalogPopup");

    // OPEN POPUP
    openPopupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        catalogPopup.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // CLOSE BUTTON
    closePopupBtn.addEventListener("click", () => {
        catalogPopup.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // CLOSE WHEN CLICKING OUTSIDE (on overlay)
    catalogPopup.addEventListener("click", (e) => {
        if (e.target === catalogPopup) {
            catalogPopup.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // ESC KEY CLOSE
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            catalogPopup.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});

/* ============================================================================
   BLOCK 10: REQUEST QUOTE POPUP
   ============================================================================
   WHAT IT DOES:
   - Opens callback request modal when "Request a Quote" button is clicked
   - Contains form for name, company, email, and phone with country code
   - Same close behaviors as download popup (×, outside click, ESC)
   
   NOTE: Includes null checks (!openBtn || !closeBtn || !popup) to prevent errors
         if elements don't exist on the page.
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openQuotePopup");
    const closeBtn = document.getElementById("closeQuotePopup");
    const popup = document.getElementById("callbackPopup");

    // Exit if any elements are missing (prevents JavaScript errors)
    if (!openBtn || !closeBtn || !popup) return;

    // OPEN POPUP
    openBtn.addEventListener("click", () => {
        popup.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // CLOSE BUTTON
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // CLICK OUTSIDE TO CLOSE
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });

    // ESC KEY CLOSE
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            popup.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});

/* ============================================================================
   BLOCK 11: INFINITE SLIDER FOR APPLICATIONS SECTION
   ============================================================================
   WHAT IT DOES:
   - Creates infinite horizontal scrolling carousel for application cards
   - Clones each card and appends to track (doubles the content)
   - CSS animation handles the continuous scrolling
   
   WHY THIS APPROACH:
   - Duplicates content so animation can loop seamlessly
   - CSS transform handles smooth animation (GPU accelerated)
   - No complex JavaScript calculations needed during scroll
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('sliderTrack');
    const cards = Array.from(track.children);
    
    // Clone each card and append it to create seamless loop
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
});

/* ============================================================================
   BLOCK 12: INFINITE SLIDER FOR TESTIMONIALS SECTION
   ============================================================================
   WHAT IT DOES:
   - Creates infinite horizontal scrolling carousel for testimonial cards
   - Doubles the content by cloning innerHTML
   - Calculates animation duration based on total width for consistent speed
   
   WHY DYNAMIC DURATION:
   - animation speed stays consistent regardless of how many cards
   - duration = totalWidth / 50 (higher denominator = slower speed)
   - Prevents very fast or very slow scrolling based on content length
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('testimonialTrack');
    
    // Double the content for seamless loop (CSS transform uses -50%)
    const content = track.innerHTML;
    track.innerHTML = content + content;

    // Calculate animation duration based on total width
    const totalWidth = track.scrollWidth;
    const duration = totalWidth / 50; 
    track.style.animationDuration = `${duration}s`;
});
