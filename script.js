/**
 * ===========================================================
 * PGH Risk & Safety - Main JavaScript File
 * ===========================================================
 * 
 * Senior Developer Production-Ready JavaScript
 * 
 * This file contains all client-side functionality including:
 * - Loading overlay management
 * - Toast notification system
 * - Form handling with validation
 * - Photo upload with preview and progress
 * - Animated counters
 * - Scroll effects (navbar, back-to-top)
 * - Dark mode toggle
 * - Accessibility enhancements
 * 
 * TABLE OF CONTENTS:
 * 1. Utility Functions
 * 2. Toast Notification System
 * 3. Loading Overlay
 * 4. Navbar Scroll Effects
 * 5. Back to Top Button
 * 6. Dark Mode Toggle
 * 7. Animated Counters
 * 8. Photo Upload System
 * 9. Form Handling
 * 10. Accessibility Enhancements
 * 11. Initialization
 * 
 * ===========================================================
 */

'use strict';

// ===========================================================
// 1. UTILITY FUNCTIONS
// ===========================================================

/**
 * Safely query a DOM element
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {HTMLElement|null}
 */
const $ = (selector, context = document) => context.querySelector(selector);

/**
 * Safely query all DOM elements
 * @param {string} selector - CSS selector
 * @param {HTMLElement} context - Context element (default: document)
 * @returns {NodeList}
 */
const $$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function}
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string}
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

/**
 * Generate unique ID
 * @returns {string}
 */
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}


// ===========================================================
// 2. TOAST NOTIFICATION SYSTEM
// ===========================================================

/**
 * Toast notification manager
 */
const Toast = {
    container: null,
    
    /**
     * Initialize toast container
     */
    init() {
        this.container = $('#toastContainer');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toastContainer';
            this.container.className = 'toast-container position-fixed top-0 end-0 p-3';
            this.container.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.container);
        }
    },
    
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duration in milliseconds
     */
    show(message, type = 'info', duration = 5000) {
        if (!this.container) this.init();
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const colors = {
            success: 'text-success',
            error: 'text-danger',
            warning: 'text-warning',
            info: 'text-info'
        };
        
        const toastId = generateId();
        const toastHTML = `
            <div id="${toastId}" class="toast toast-custom toast-${type}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="fas ${icons[type]} ${colors[type]} me-2"></i>
                    <strong class="me-auto text-capitalize">${type}</strong>
                    <small>Just now</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        this.container.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = $(`#${toastId}`);
        const bsToast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: duration
        });
        
        bsToast.show();
        
        // Clean up after hiding
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
        
        return bsToast;
    },
    
    success(message, duration) {
        return this.show(message, 'success', duration);
    },
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    },
    
    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};


// ===========================================================
// 3. LOADING OVERLAY
// ===========================================================

/**
 * Loading overlay manager
 */
const LoadingOverlay = {
    element: null,
    
    init() {
        this.element = $('#loadingOverlay');
    },
    
    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
        }
    },
    
    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }
};


// ===========================================================
// 4. NAVBAR SCROLL EFFECTS
// ===========================================================

/**
 * Handle navbar scroll effects
 */
function initNavbarScroll() {
    const navbar = $('#mainNavbar');
    if (!navbar) return;
    
    const handleScroll = debounce(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}


// ===========================================================
// 5. BACK TO TOP BUTTON
// ===========================================================

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    
    const handleScroll = debounce(() => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ===========================================================
// 6. DARK MODE TOGGLE
// ===========================================================

/**
 * Initialize dark mode toggle
 */
function initDarkMode() {
    const toggle = $('#darkModeToggle');
    if (!toggle) return;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('darkMode', isDark);
        toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        Toast.info(`${isDark ? 'Dark' : 'Light'} mode activated`);
    });
}


// ===========================================================
// 7. ANIMATED COUNTERS
// ===========================================================

/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} element - Counter element
 * @param {number} target - Target value
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Initialize all animated counters
 */
function initCounters() {
    const counters = $$('[data-count], .counter[data-target]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count || entry.target.dataset.target, 10);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}


// ===========================================================
// 8. PHOTO UPLOAD SYSTEM
// ===========================================================

/**
 * Photo upload handler with preview and progress
 */
const PhotoUpload = {
    init() {
        this.initForms();
        this.initDragDrop();
    },
    
    initForms() {
        const forms = $$('[id^="photoUploadForm"]');
        
        forms.forEach(form => {
            const fileInput = form.querySelector('input[type="file"]');
            const previewImg = form.querySelector('.photo-preview, [id^="photoPreview"]');
            const timestampDisplay = form.querySelector('.submission-timestamp, [id^="submissionTimestamp"]');
            
            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    this.handleFileSelect(e.target.files[0], previewImg);
                });
            }
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form, previewImg, timestampDisplay);
            });
        });
    },
    
    initDragDrop() {
        const dropZones = $$('.photo-preview-container');
        
        dropZones.forEach(zone => {
            ['dragenter', 'dragover'].forEach(event => {
                zone.addEventListener(event, (e) => {
                    e.preventDefault();
                    zone.classList.add('dragover');
                });
            });
            
            ['dragleave', 'drop'].forEach(event => {
                zone.addEventListener(event, (e) => {
                    e.preventDefault();
                    zone.classList.remove('dragover');
                });
            });
            
            zone.addEventListener('drop', (e) => {
                const file = e.dataTransfer.files[0];
                const preview = zone.querySelector('img');
                const input = zone.closest('form')?.querySelector('input[type="file"]');
                
                if (file && file.type.startsWith('image/')) {
                    this.handleFileSelect(file, preview);
                    if (input) {
                        // Create a DataTransfer to update the file input
                        const dt = new DataTransfer();
                        dt.items.add(file);
                        input.files = dt.files;
                    }
                }
            });
        });
    },
    
    handleFileSelect(file, previewImg) {
        if (!file || !file.type.startsWith('image/')) {
            Toast.error('Please select a valid image file');
            return;
        }
        
        // File size validation (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            Toast.error('File size must be less than 10MB');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            if (previewImg) {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
                previewImg.alt = 'Preview of ' + file.name;
            }
            Toast.success('Photo loaded successfully');
        };
        
        reader.onerror = () => {
            Toast.error('Error reading file');
        };
        
        reader.readAsDataURL(file);
    },
    
    handleSubmit(form, previewImg, timestampDisplay) {
        const phase = form.dataset.phase || 'task';
        const fileInput = form.querySelector('input[type="file"]');
        
        if (!fileInput?.files?.length) {
            Toast.warning('Please select a photo to upload');
            return;
        }
        
        // Simulate upload progress
        this.showProgress(form, () => {
            const now = new Date();
            const timestamp = formatDate(now);
            
            if (timestampDisplay) {
                timestampDisplay.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Submitted: ${timestamp}
                `;
                timestampDisplay.style.display = 'inline-flex';
            }
            
            Toast.success(`${phase.charAt(0).toUpperCase() + phase.slice(1)} photo uploaded successfully!`);
            
            // Reset form but keep preview
            fileInput.value = '';
        });
    },
    
    showProgress(form, callback) {
        let progressBar = form.querySelector('.upload-progress-bar');
        let progressContainer = form.querySelector('.upload-progress');
        
        // Create progress bar if it doesn't exist
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.className = 'upload-progress active';
            progressContainer.innerHTML = '<div class="upload-progress-bar"></div>';
            form.appendChild(progressContainer);
            progressBar = progressContainer.querySelector('.upload-progress-bar');
        } else {
            progressContainer.classList.add('active');
        }
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                progressBar.style.width = '100%';
                clearInterval(interval);
                
                setTimeout(() => {
                    progressContainer.classList.remove('active');
                    progressBar.style.width = '0%';
                    callback();
                }, 300);
            } else {
                progressBar.style.width = progress + '%';
            }
        }, 200);
    }
};


// ===========================================================
// 9. FORM HANDLING
// ===========================================================

/**
 * Form validation and submission handler
 */
const FormHandler = {
    init() {
        this.initIncidentForm();
        this.initContactForm();
        this.initValidation();
    },
    
    initIncidentForm() {
        const form = $('#incidentForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!this.validateForm(form)) {
                Toast.error('Please fill in all required fields');
                return;
            }
            
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate submission
            Toast.info('Submitting incident report...');
            
            setTimeout(() => {
                console.log('Incident Report Data:', data);
                Toast.success('Incident report submitted successfully! Reference #' + Math.random().toString(36).substr(2, 8).toUpperCase());
                form.reset();
                
                // Clear any validation states
                form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
            }, 1500);
        });
    },
    
    initContactForm() {
        const form = $('#contactForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!this.validateForm(form)) {
                Toast.error('Please fill in all required fields');
                return;
            }
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            Toast.info('Sending message...');
            
            setTimeout(() => {
                console.log('Contact Form Data:', data);
                Toast.success('Message sent successfully! We\'ll get back to you soon.');
                form.reset();
                
                form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
            }, 1500);
        });
    },
    
    initValidation() {
        // Real-time validation on blur
        $$('input[required], textarea[required], select[required]').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    this.validateField(field);
                }
            });
        });
    },
    
    validateField(field) {
        const isValid = field.checkValidity();
        
        field.classList.remove('is-valid', 'is-invalid');
        field.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        return isValid;
    },
    
    validateForm(form) {
        let isValid = true;
        
        form.querySelectorAll('[required]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
};


// ===========================================================
// 10. ACCESSIBILITY ENHANCEMENTS
// ===========================================================

/**
 * Accessibility improvements
 */
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'visually-hidden-focusable position-absolute top-0 start-0 p-2 bg-primary text-white';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Ensure all images have alt text
    $$('img:not([alt])').forEach(img => {
        img.alt = '';
    });
    
    // Add aria-current to active nav links
    $$('.nav-link.active').forEach(link => {
        link.setAttribute('aria-current', 'page');
    });
    
    // Escape key closes modals/dropdowns
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open Bootstrap modals
            const modal = $('.modal.show');
            if (modal) {
                bootstrap.Modal.getInstance(modal)?.hide();
            }
        }
    });
}


// ===========================================================
// 11. INITIALIZATION
// ===========================================================

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize toast system
    Toast.init();
    
    // Initialize loading overlay
    LoadingOverlay.init();
    
    // Hide loading overlay after page load
    setTimeout(() => {
        LoadingOverlay.hide();
    }, 500);
    
    // Initialize UI components
    initNavbarScroll();
    initBackToTop();
    initDarkMode();
    initCounters();
    initAccessibility();
    
    // Initialize functional components
    PhotoUpload.init();
    FormHandler.init();
    
    // Log initialization
    console.log('PGH Risk & Safety initialized successfully');
});

/**
 * Handle page visibility changes for performance
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations when page is hidden
        document.body.classList.add('reduce-motion');
    } else {
        document.body.classList.remove('reduce-motion');
    }
});

/**
 * Export for potential module use
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Toast, PhotoUpload, FormHandler };
}
