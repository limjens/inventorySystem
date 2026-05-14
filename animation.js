/**
 * animations.js - Reusable Animation Library for FlowStock
 * All UI animations are separate from auth logic
 * Can be used across multiple pages (login, register, dashboard)
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // 1. INPUT FIELD ANIMATIONS (reusable)
  // ============================================
  const animateInputs = () => {
    const inputs = document.querySelectorAll(".glass-input");

    inputs.forEach((input) => {
      // Add focus animation class
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
        this.style.transform = "scale(1.01)";
      });

      // Remove animation on blur
      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("focused");
        this.style.transform = "scale(1)";
      });

      // Add ripple effect on input click
      input.addEventListener("click", function (e) {
        createRipple(e, this);
      });
    });
  };

  // ============================================
  // 2. RIPPLE EFFECT (reusable)
  // ============================================
  const createRipple = (event, element) => {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: rippleAnimation 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
        `;

    // Add keyframe animation if not exists
    if (!document.querySelector("#rippleStyle")) {
      const style = document.createElement("style");
      style.id = "rippleStyle";
      style.textContent = `
                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  // ============================================
  // 3. BUTTON LOADING ANIMATION (reusable)
  // ============================================
  const addButtonLoadingEffect = (buttonSelector) => {
    const button = document.querySelector(buttonSelector);
    if (!button) return;

    let originalText = button.innerHTML;

    button.addEventListener("click", function (e) {
      // Don't interfere with existing login() function
      // Just add visual feedback if button is clicked
      if (!this.classList.contains("loading")) {
        // Store original content
        originalText = this.innerHTML;

        // Add loading class for visual feedback
        this.classList.add("loading");

        // Reset after 2 seconds (in case login takes time)
        setTimeout(() => {
          if (this.classList.contains("loading")) {
            this.classList.remove("loading");
            this.innerHTML = originalText;
          }
        }, 2000);
      }
    });
  };

  // ============================================
  // 4. SHAKE ANIMATION FOR ERRORS (reusable)
  // ============================================
  const shakeElement = (element) => {
    element.style.animation = "shake 0.4s ease-in-out";
    setTimeout(() => {
      element.style.animation = "";
    }, 400);

    // Add keyframe if not exists
    if (!document.querySelector("#shakeStyle")) {
      const style = document.createElement("style");
      style.id = "shakeStyle";
      style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
      document.head.appendChild(style);
    }
  };

  // ============================================
  // 5. PULSE ANIMATION (reusable)
  // ============================================
  const addPulseEffect = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", function () {
        this.style.animation = "pulse 0.5s ease";
        setTimeout(() => {
          this.style.animation = "";
        }, 500);
      });
    });

    // Add pulse keyframe if not exists
    if (!document.querySelector("#pulseStyle")) {
      const style = document.createElement("style");
      style.id = "pulseStyle";
      style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
            `;
      document.head.appendChild(style);
    }
  };

  // ============================================
  // 6. TYPING ANIMATION FOR PLACEHOLDERS (reusable)
  // ============================================
  const typewriterEffect = (element, text, speed = 50) => {
    let i = 0;
    const originalPlaceholder = element.getAttribute("placeholder");
    element.setAttribute("placeholder", "");

    const type = setInterval(() => {
      if (i < text.length) {
        element.setAttribute(
          "placeholder",
          element.getAttribute("placeholder") + text.charAt(i),
        );
        i++;
      } else {
        clearInterval(type);
        setTimeout(() => {
          element.setAttribute("placeholder", originalPlaceholder);
        }, 2000);
      }
    }, speed);
  };

  // ============================================
  // 7. FADE IN ELEMENTS ON SCROLL (reusable)
  // ============================================
  const fadeInOnScroll = () => {
    const elements = document.querySelectorAll(".fade-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
  };

  // ============================================
  // 8. CURSOR TRAIL EFFECT (optional - reusable)
  // ============================================
  const addCursorTrail = () => {
    let trail = [];
    const trailLength = 5;

    document.addEventListener("mousemove", (e) => {
      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > trailLength) trail.shift();

      // Remove old dots
      document.querySelectorAll(".cursor-trail").forEach((el) => el.remove());

      // Create new trail
      trail.forEach((pos, index) => {
        const dot = document.createElement("div");
        dot.className = "cursor-trail";
        dot.style.cssText = `
                    position: fixed;
                    width: ${6 - index}px;
                    height: ${6 - index}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${pos.x}px;
                    top: ${pos.y}px;
                    transition: all 0.1s ease;
                `;
        document.body.appendChild(dot);

        setTimeout(() => dot.remove(), 200);
      });
    });
  };

  // ============================================
  // 9. FORM VALIDATION VISUAL FEEDBACK (reusable)
  // ============================================
  const addValidationFeedback = () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (usernameInput) {
      usernameInput.addEventListener("blur", function () {
        if (this.value.trim() === "") {
          this.style.borderColor = "rgba(255, 100, 100, 0.7)";
        } else {
          this.style.borderColor = "rgba(100, 255, 100, 0.5)";
          setTimeout(() => {
            this.style.borderColor = "rgba(255, 255, 255, 0.35)";
          }, 1500);
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("blur", function () {
        if (this.value.trim() === "") {
          this.style.borderColor = "rgba(255, 100, 100, 0.7)";
        } else {
          this.style.borderColor = "rgba(100, 255, 100, 0.5)";
          setTimeout(() => {
            this.style.borderColor = "rgba(255, 255, 255, 0.35)";
          }, 1500);
        }
      });
    }
  };

  // ============================================
  // 10. GLOW EFFECT ON CARD HOVER (reusable)
  // ============================================
  const addGlowOnHover = (selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 0 30px rgba(255, 255, 255, 0.2)";
      });
      el.addEventListener("mouseleave", function () {
        this.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
      });
    });
  };

  // ============================================
  // 11. PAGE TRANSITION ANIMATION (reusable)
  // ============================================
  const pageTransition = () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  };

  // ============================================
  // 12. TOAST NOTIFICATION (reusable component)
  // ============================================
  window.showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    const colors = {
      success: "rgba(76, 175, 80, 0.9)",
      error: "rgba(244, 67, 54, 0.9)",
      info: "rgba(33, 150, 243, 0.9)",
      warning: "rgba(255, 152, 0, 0.9)",
    };

    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;

    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Add slide animations for toast
  if (!document.querySelector("#toastStyle")) {
    const style = document.createElement("style");
    style.id = "toastStyle";
    style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // ============================================
  // INITIALIZE ALL ANIMATIONS
  // ============================================
  const init = () => {
    animateInputs();
    addButtonLoadingEffect(".btn-glass-login");
    addPulseEffect(".glass-link");
    addPulseEffect(".forgot-link");
    addValidationFeedback();
    addGlowOnHover(".glass-card");
    pageTransition();
    fadeInOnScroll();

    // Uncomment to enable cursor trail (optional)
    // addCursorTrail();

    console.log("✨ Animations initialized - FlowStock UI ready");
  };

  // Start all animations
  init();
});

// ============================================
// EXPORT REUSABLE FUNCTIONS (for use in other pages)
// ============================================
// These functions can be called from any page that includes animations.js
window.Animations = {
  shakeElement,
  showToast,
  createRipple,
  addPulseEffect: (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.02)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);
      });
    });
  },
  typewriterEffect,
};
