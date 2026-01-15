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
    // initRotatingText(); // Disabled - Using SVG image instead
    initMarquee();
    initTabInteractions();
    initSmoothScroll();
    initExhibitionTabs();
    initPosterSlider();
    initHamburgerMenu();
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
    
    // Calendar collapse on scroll
    initCalendarCollapse();
}

function initCalendarCollapse() {
    const calendarDaysWrapper = document.querySelector('.calendar-days-wrapper');
    const calendarDays = document.querySelector('.calendar-days');
    const sidebar = document.querySelector('.sidebar');
    
    if (!calendarDaysWrapper || !calendarDays || !sidebar) return;
    
    // Calculate current week row number (all days including other-month)
    const allDays = calendarDays.querySelectorAll('.day');
    const selectedDay = calendarDays.querySelector('.day.selected');
    let currentWeekRow = 0;
    
    if (selectedDay) {
        const allDaysArray = Array.from(allDays);
        const selectedIndex = allDaysArray.indexOf(selectedDay);
        currentWeekRow = Math.floor(selectedIndex / 7);
    }
    
    const rowHeight = 52; // Height of each day row
    const translateY = currentWeekRow * rowHeight;
    
    // Scroll event to collapse/expand calendar
    window.addEventListener('scroll', () => {
        // Only apply collapse effect on screens wider than 1280px
        if (window.innerWidth <= 1280) {
            calendarDaysWrapper.classList.remove('collapsed');
            calendarDays.style.transform = 'translateY(0)';
            return;
        }
        
        const sidebarRect = sidebar.getBoundingClientRect();
        
        // When sidebar is stuck (top: 0)
        if (sidebarRect.top <= 0) {
            calendarDaysWrapper.classList.add('collapsed');
            calendarDays.style.transform = `translateY(-${translateY}px)`;
        } else {
            calendarDaysWrapper.classList.remove('collapsed');
            calendarDays.style.transform = 'translateY(0)';
        }
    });
    
    // Also remove collapsed state on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1280) {
            calendarDaysWrapper.classList.remove('collapsed');
            calendarDays.style.transform = 'translateY(0)';
        }
    });
}

// ======================= //
// HAMBURGER MENU
// ======================= //
function initHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburgerBtn || !mobileMenuOverlay) return;
    
    // Toggle menu on hamburger button click
    hamburgerBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1280) {
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
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
    const venueTags = document.querySelectorAll('.venue-tags-content .tag');
    venueTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const parent = this.closest('.venue-tags-content');
            parent.querySelectorAll('.tag').forEach(t => {
                t.classList.remove('active', 'green');
                t.classList.add('outline');
            });
            this.classList.add('active', 'green');
            this.classList.remove('outline');
            
            // Get data attributes
            const image = this.dataset.image;
            const title = this.dataset.title;
            const desc = this.dataset.desc;
            
            // Update venue image
            const venueImage = document.querySelector('.venue-image');
            if (venueImage && image) {
                venueImage.src = image;
                venueImage.alt = title;
            }
            
            // Update venue title
            const venueTitle = document.querySelector('.venue-title');
            if (venueTitle && title) {
                venueTitle.textContent = title;
            }
            
            // Update venue description
            const venueDesc = document.querySelector('.venue-description');
            if (venueDesc && desc) {
                venueDesc.innerHTML = desc;
            }
            
            // Update reserve button text
            const reserveBtn = document.querySelector('.venue-reserve-btn span');
            if (reserveBtn && title) {
                reserveBtn.textContent = title + ' 대관예약';
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
    top: -50px;
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
    this.style.top = '-50px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Add id to main content
const mainContent = document.querySelector('.main-content');
if (mainContent) {
    mainContent.id = 'main-content';
}

// ======================= //
// EXHIBITION TAB SWITCHER
// ======================= //
function initExhibitionTabs() {
    const exhibitionCards = document.querySelectorAll('.exhibition-card[data-exhibition="future-seoul"]');
    
    exhibitionCards.forEach(card => {
        const tags = card.querySelectorAll('.exhibition-tags .tag');
        const images = card.querySelectorAll('.exhibition-image');
        const names = card.querySelectorAll('.exhibition-name');
        
        let autoPlayInterval;
        let currentIndex = 0;
        const totalTabs = tags.length;
        
        // 탭 전환 함수
        function switchTab(tabName) {
            // 모든 active 클래스 제거
            tags.forEach(tag => tag.classList.remove('active'));
            images.forEach(img => img.classList.remove('active'));
            names.forEach(name => name.style.display = 'none');
            
            // 선택된 탭에 active 클래스 추가
            const selectedTag = card.querySelector(`.tag[data-tab="${tabName}"]`);
            const selectedImage = card.querySelector(`.exhibition-image[data-tab="${tabName}"]`);
            const selectedName = card.querySelector(`.exhibition-name[data-tab="${tabName}"]`);
            
            if (selectedTag) selectedTag.classList.add('active');
            if (selectedImage) selectedImage.classList.add('active');
            if (selectedName) selectedName.style.display = 'block';
            
            // 현재 인덱스 업데이트
            tags.forEach((tag, index) => {
                if (tag.dataset.tab === tabName) {
                    currentIndex = index;
                }
            });
        }
        
        // 자동 재생
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalTabs;
                const nextTab = tags[currentIndex].dataset.tab;
                switchTab(nextTab);
            }, 3000); // 3초마다 전환
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        // 태그 이벤트 리스너
        tags.forEach(tag => {
            // 호버 시 전환
            tag.addEventListener('mouseenter', () => {
                stopAutoPlay();
                switchTab(tag.dataset.tab);
            });
            
            // 클릭 시 전환
            tag.addEventListener('click', () => {
                stopAutoPlay();
                switchTab(tag.dataset.tab);
                startAutoPlay();
            });
        });
        
        // 카드에서 마우스가 나가면 자동 재생 재시작
        card.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // 초기 자동 재생 시작
        startAutoPlay();
    });
}

// ======================= //
// POSTER SLIDER (PROGRAM SECTION) - 무한 루프
// ======================= //
function initPosterSlider() {
    const posterScroll = document.querySelector('.program-section .poster-scroll');
    const posterWrappers = Array.from(document.querySelectorAll('.program-section .poster-item-wrapper'));
    const prevBtn = document.querySelector('.poster-prev-btn');
    const nextBtn = document.querySelector('.poster-next-btn');
    
    // 텍스트 영역 요소들
    const featuredTitle = document.getElementById('featured-title');
    const featuredDate = document.getElementById('featured-date');
    const featuredDescription = document.getElementById('featured-description');
    
    if (!posterScroll || posterWrappers.length === 0 || !prevBtn || !nextBtn) {
        console.log('Poster slider elements not found');
        return;
    }
    
    const totalPosters = posterWrappers.length;
    
    // 화면 크기에 따라 포스터 너비와 gap 동적 계산
    function getPosterDimensions() {
        const width = window.innerWidth;
        if (width <= 1024) {
            return { posterWidth: 294, posterGap: 30 };
        }
        return { posterWidth: 367, posterGap: 38 };
    }
    
    let { posterWidth, posterGap } = getPosterDimensions();
    let slideDistance = posterWidth + posterGap;
    
    // 원본 포스터 데이터 저장 (복제 전)
    const posterData = posterWrappers.map(wrapper => ({
        title: wrapper.dataset.title || '',
        date: wrapper.dataset.date || '',
        description: wrapper.dataset.description || ''
    }));
    
    // 무한 루프를 위해 포스터 복제 (앞뒤로 추가)
    const firstClone = posterWrappers[0].cloneNode(true);
    const lastClone = posterWrappers[totalPosters - 1].cloneNode(true);
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    
    posterScroll.appendChild(firstClone);
    posterScroll.insertBefore(lastClone, posterWrappers[0]);
    
    // 복제 후 새로운 래퍼 목록
    const allWrappers = Array.from(document.querySelectorAll('.program-section .poster-item-wrapper'));
    
    let currentIndex = 1; // 복제된 마지막 포스터가 앞에 있으므로 1부터 시작
    let isTransitioning = false;
    
    // 초기 위치 설정
    posterScroll.style.transform = `translateX(${-currentIndex * slideDistance}px)`;
    
    // 텍스트 업데이트 함수
    function updateTextContent(dataIndex) {
        if (!featuredTitle || !featuredDate || !featuredDescription) return;
        
        const data = posterData[dataIndex];
        if (data) {
            // 페이드 효과
            featuredTitle.style.opacity = '0';
            featuredDate.style.opacity = '0';
            featuredDescription.style.opacity = '0';
            
            setTimeout(() => {
                featuredTitle.textContent = data.title;
                featuredDate.textContent = data.date;
                featuredDescription.innerHTML = data.description;
                
                featuredTitle.style.opacity = '1';
                featuredDate.style.opacity = '1';
                featuredDescription.style.opacity = '1';
            }, 200);
        }
    }
    
    // 실제 데이터 인덱스 계산 (복제본 고려)
    function getRealIndex(index) {
        if (index <= 0) return totalPosters - 1;
        if (index > totalPosters) return 0;
        return index - 1;
    }
    
    // 활성화 상태 업데이트
    function updateActiveState() {
        allWrappers.forEach((wrapper) => {
            wrapper.classList.remove('active');
        });
        allWrappers[currentIndex].classList.add('active');
        
        // 텍스트 업데이트
        const realIndex = getRealIndex(currentIndex);
        updateTextContent(realIndex);
    }
    
    // 슬라이드 이동
    function slideTo(index, animate = true) {
        if (isTransitioning) return;
        
        currentIndex = index;
        
        if (animate) {
            isTransitioning = true;
            posterScroll.style.transition = 'transform 0.5s ease';
        } else {
            posterScroll.style.transition = 'none';
        }
        
        posterScroll.style.transform = `translateX(${-currentIndex * slideDistance}px)`;
        updateActiveState();
    }
    
    // 트랜지션 종료 시 무한 루프 처리
    posterScroll.addEventListener('transitionend', function() {
        isTransitioning = false;
        
        // 첫 번째 복제본에 도달 (마지막 → 처음으로 이동 시)
        if (currentIndex >= totalPosters + 1) {
            slideTo(1, false);
        }
        // 마지막 복제본에 도달 (처음 → 마지막으로 이동 시)
        else if (currentIndex <= 0) {
            slideTo(totalPosters, false);
        }
    });
    
    // 이전 버튼 (오른쪽 썸네일이 왼쪽으로 넘어옴)
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        slideTo(currentIndex + 1);
    });
    
    // 다음 버튼 (왼쪽 썸네일이 오른쪽으로 넘어감)
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        slideTo(currentIndex - 1);
    });
    
    // 초기 상태 설정
    updateActiveState();
    
    // 화면 크기 변경 시 슬라이드 거리 재계산
    window.addEventListener('resize', function() {
        const dimensions = getPosterDimensions();
        posterWidth = dimensions.posterWidth;
        posterGap = dimensions.posterGap;
        slideDistance = posterWidth + posterGap;
        
        // 현재 위치 재조정
        posterScroll.style.transition = 'none';
        posterScroll.style.transform = `translateX(${-currentIndex * slideDistance}px)`;
        setTimeout(() => {
            posterScroll.style.transition = 'transform 0.5s ease';
        }, 50);
    });
    
    // 텍스트 전환 효과를 위한 스타일 추가
    if (featuredTitle) featuredTitle.style.transition = 'opacity 0.2s ease';
    if (featuredDate) featuredDate.style.transition = 'opacity 0.2s ease';
    if (featuredDescription) featuredDescription.style.transition = 'opacity 0.2s ease';
    
    console.log('Infinite poster slider initialized with', totalPosters, 'posters');
}

console.log('Seoul Gallery scripts loaded successfully!');
