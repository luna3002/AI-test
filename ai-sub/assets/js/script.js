/**
 * ========================================
 * 서울의 공원 AI 검색 - JavaScript
 * ========================================
 * 
 * 이 파일은 사이트의 인터랙션과 애니메이션을 담당합니다.
 * - TOP 버튼 스크롤
 * - 검색 입력 효과
 * - 질문 칩 호버 효과
 * - 스크롤 기반 애니메이션
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // DOM Elements
    // ========================================
    const topBtn = document.querySelector('.top-btn');
    const searchInput = document.querySelector('.search-input');
    const questionChips = document.querySelectorAll('.question-chip');
    const sidebar = document.querySelector('.sidebar');
    const purumiCharacter = document.querySelector('.purumi-character');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const resultItems = document.querySelectorAll('.result-item');
    const weatherCards = document.querySelectorAll('.weather-info-card');

    // ========================================
    // TOP Button - Scroll to Top
    // ========================================
    if (topBtn) {
        topBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/Hide TOP button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                topBtn.style.opacity = '1';
                topBtn.style.pointerEvents = 'auto';
            } else {
                topBtn.style.opacity = '0.5';
            }
        });
    }

    // ========================================
    // Search Input - Typing Animation
    // ========================================
    if (searchInput) {
        const originalPlaceholder = searchInput.placeholder;
        let typingIndex = 0;
        let isTyping = false;

        function typeText() {
            if (isTyping) return;
            isTyping = true;
            searchInput.placeholder = '';
            typingIndex = 0;

            const typeInterval = setInterval(function() {
                if (typingIndex < originalPlaceholder.length) {
                    searchInput.placeholder += originalPlaceholder.charAt(typingIndex);
                    typingIndex++;
                } else {
                    clearInterval(typeInterval);
                    isTyping = false;
                }
            }, 50);
        }

        // Trigger typing animation on page load after delay
        setTimeout(typeText, 1000);

        // Re-trigger on focus
        searchInput.addEventListener('focus', function() {
            if (!isTyping) {
                typeText();
            }
        });
    }

    // ========================================
    // Question Chips - Click Handler
    // ========================================
    questionChips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            const questionText = this.querySelector('span').textContent.replace(/\n/g, ' ').trim();
            
            // Update search input with selected question
            if (searchInput) {
                searchInput.placeholder = questionText;
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }

            // Optional: Scroll to search input
            const searchWrapper = document.querySelector('.search-input-wrapper');
            if (searchWrapper) {
                searchWrapper.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // ========================================
    // Purumi Character - Interaction
    // ========================================
    if (purumiCharacter) {
        purumiCharacter.addEventListener('click', function() {
            // Bounce animation on click
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'bounce 0.5s ease';
            
            setTimeout(() => {
                this.style.animation = 'pulse 3s ease-in-out infinite';
            }, 500);
        });

        // Add bounce keyframes dynamically
        if (!document.querySelector('#bounce-keyframes')) {
            const style = document.createElement('style');
            style.id = 'bounce-keyframes';
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.1); }
                    50% { transform: scale(0.95); }
                    75% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ========================================
    // Navigation Links - Hover Effect
    // ========================================
    navLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });

    // ========================================
    // Scroll-based Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe result items
    resultItems.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        animateOnScroll.observe(item);
    });

    // ========================================
    // Weather Cards - Animation on Load
    // ========================================
    weatherCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // Sidebar Show/Hide on Scroll
    // ========================================
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (sidebar) {
            if (scrollTop > scrollThreshold) {
                sidebar.style.opacity = '1';
                sidebar.style.transform = 'translateY(-50%)';
            }
            
            // Optional: Hide sidebar when scrolling down quickly
            if (scrollTop > lastScrollTop && scrollTop > 500) {
                // Scrolling down
                sidebar.style.transform = 'translateY(-50%) translateX(20px)';
                sidebar.style.opacity = '0.7';
            } else {
                // Scrolling up
                sidebar.style.transform = 'translateY(-50%) translateX(0)';
                sidebar.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ========================================
    // Safety Button Click Handler
    // ========================================
    const safetyBtn = document.querySelector('.safety-btn');
    if (safetyBtn) {
        safetyBtn.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Alert or navigation
            console.log('공원안전제안 클릭됨');
        });

        // Add ripple keyframes
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ========================================
    // Language Selector Toggle
    // ========================================
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Toggle dropdown (if implemented)
            console.log('언어 선택 클릭됨');
        });
    }

    // ========================================
    // Menu Toggle (Mobile)
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle mobile menu (if implemented)
            console.log('메뉴 토글 클릭됨');
            this.classList.toggle('active');
        });
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🌳 서울의 공원 AI 검색 🌳', 'color: #00793b; font-size: 20px; font-weight: bold;');
    console.log('%c무장애 공원 정보를 쉽게 찾아보세요!', 'color: #666; font-size: 14px;');
});

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
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
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
