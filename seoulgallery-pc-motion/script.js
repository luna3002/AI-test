/**
 * Seoul Gallery - Interactive JavaScript
 * 
 * 이 파일은 서울갤러리 웹사이트의 모든 인터랙션과 애니메이션을 관리합니다.
 * - 스크롤 기반 애니메이션
 * - 헤더 스크롤 효과
 * - 캘린더 기능
 * - 회전 텍스트 애니메이션
 * - 마키 애니메이션 복제
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================= //
    // INITIALIZATION
    // ======================= //
    initScrollAnimations();
    initHeaderScroll();
    initCalendar();
    initRotatingText();
    initMarquee();
    initTabInteractions();
    initSmoothScroll();
});

// ======================= //
// SCROLL ANIMATIONS
// ======================= //
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ======================= //
// HEADER SCROLL EFFECT (DISABLED)
// ======================= //
function initHeaderScroll() {
    // 스크롤 효과 비활성화 - 헤더가 상단에 고정됨
    return;
}

// ======================= //
// CALENDAR FUNCTIONALITY
// ======================= //
function initCalendar() {
    const prevBtn = document.querySelector('.month-nav-btn.prev');
    const nextBtn = document.querySelector('.month-nav-btn.next');
    const monthTitle = document.querySelector('.month-title');
    const calendarDays = document.querySelector('.calendar-days');
    
    let currentDate = new Date(2025, 11, 1); // December 2025
    
    // Month names in Korean
    const monthNames = [
        '1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'
    ];
    
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Update month title
        monthTitle.textContent = `${year}년 ${monthNames[month]}`;
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Adjust for Monday start (Korean calendar)
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        
        // Clear existing days
        calendarDays.innerHTML = '';
        
        // Previous month days
        for (let i = startDay - 1; i >= 0; i--) {
            const day = document.createElement('span');
            day.className = 'day other-month';
            day.textContent = daysInPrevMonth - i;
            calendarDays.appendChild(day);
        }
        
        // Current month days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('span');
            day.className = 'day';
            day.textContent = i;
            
            // Check if today
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                i === today.getDate()) {
                day.classList.add('today');
            }
            
            // Selected day (29th for demo)
            if (i === 29 && month === 11 && year === 2025) {
                day.classList.add('selected');
            }
            
            // Click handler
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-days .day').forEach(d => {
                    d.classList.remove('selected');
                });
                this.classList.add('selected');
            });
            
            calendarDays.appendChild(day);
        }
        
        // Next month days
        const totalCells = 42; // 6 rows * 7 days
        const remainingCells = totalCells - startDay - daysInMonth;
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('span');
            day.className = 'day other-month';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    function updateNavButtons() {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // Disable next button if at current month (December 2025)
        if (currentYear === 2025 && currentMonth === 11) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!nextBtn.classList.contains('disabled')) {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            }
        });
    }
    
    // Initial render
    renderCalendar(currentDate);
}

// ======================= //
// ROTATING TEXT ANIMATION
// ======================= //
function initRotatingText() {
    const container = document.querySelector('.rotating-text-container');
    if (!container) return;
    
    const text = "SEOUL GALLERY SEOUL GALLERY SEOUL GALLERY ";
    const radius = 80;
    const characters = text.split('');
    
    // Create rotating text element
    const textWrapper = document.createElement('div');
    textWrapper.className = 'rotating-text-wrapper';
    textWrapper.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        animation: rotate 20s linear infinite;
    `;
    
    // Create star in center
    const star = document.createElement('span');
    star.className = 'rotating-star';
    star.textContent = '*';
    star.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        font-weight: 800;
        color: #111;
    `;
    
    // Create circular text
    characters.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 15px;
            font-weight: 800;
            color: #111;
            transform-origin: 0 ${radius}px;
            transform: rotate(${(index * 360) / characters.length}deg) translateY(-${radius}px);
        `;
        textWrapper.appendChild(span);
    });
    
    container.innerHTML = '';
    container.appendChild(textWrapper);
    container.appendChild(star);
    
    // Add rotation animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ======================= //
// MARQUEE ANIMATION
// ======================= //
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (!marqueeContent) return;
    
    // Clone content for seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement.appendChild(clone);
}

// ======================= //
// TAB INTERACTIONS
// ======================= //
function initTabInteractions() {
    // Exhibition tags
    const exhibitionTags = document.querySelectorAll('.exhibition-tags .tag');
    exhibitionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const parent = this.closest('.exhibition-tags');
            parent.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Venue tags
    const venueTags = document.querySelectorAll('.venue-tags .tag');
    venueTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const parent = this.closest('.venue-tags');
            parent.querySelectorAll('.tag').forEach(t => {
                t.classList.remove('active');
                t.classList.add('outline');
            });
            this.classList.add('active');
            this.classList.remove('outline');
            
            // Update venue title
            const venueTitle = document.querySelector('.venue-title');
            if (venueTitle) {
                venueTitle.textContent = this.textContent;
            }
        });
    });
}

// ======================= //
// SMOOTH SCROLL
// ======================= //
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================= //
// HERO PARALLAX EFFECT
// ======================= //
function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrollY < heroHeight) {
            const scale = 1.2 - (scrollY * 0.0002);
            heroImage.style.transform = `scale(${Math.max(scale, 1)})`;
        }
    });
}

// Initialize parallax on load
initHeroParallax();

// ======================= //
// EVENT CARD HOVER EFFECTS
// ======================= //
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 12px 24px rgba(126, 161, 189, 0.35)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// ======================= //
// NEWSLETTER FORM
// ======================= //
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Success feedback
            emailInput.value = '';
            showNotification('뉴스레터 구독이 완료되었습니다!', 'success');
        } else {
            showNotification('유효한 이메일 주소를 입력해주세요.', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#278352' : '#d12a5f'};
        color: white;
        border-radius: 10px;
        font-size: 14px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
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
document.head.appendChild(notificationStyles);

// ======================= //
// LAZY LOADING IMAGES
// ======================= //
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ======================= //
// ACCESSIBILITY ENHANCEMENTS
// ======================= //

// Keyboard navigation for calendar
document.querySelectorAll('.calendar-days .day').forEach(day => {
    day.setAttribute('tabindex', '0');
    day.setAttribute('role', 'button');
    
    day.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = '메인 콘텐츠로 건너뛰기';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #111;
    color: #fff;
    padding: 8px 16px;
    z-index: 10000;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});

skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Add id to main content
const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.id = 'main-content';
}

console.log('Seoul Gallery scripts loaded successfully!');
