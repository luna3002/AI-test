/**
 * ============================================
 * Seoul Gallery - Modern JavaScript
 * 깨끗하고 유지보수 가능한 JavaScript 코드
 * ============================================
 */

// ===== 초기화 및 유틸리티 함수 =====

/**
 * DOM이 로드된 후 실행
 */
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initNavigation();
  initCalendar();
  initScrollEffects();
  initHeroAnimation();
  initCircularText();
  initVenueTabs();
  initEventCards();
});

// ===== 히어로 섹션 애니메이션 =====

/**
 * 히어로 이미지 줌 애니메이션 초기화
 */
function initHeroAnimation() {
  const heroImage = document.querySelector('.hero-image');
  if (!heroImage) return;

  // 이미지가 로드되면 애니메이션 시작
  heroImage.addEventListener('load', () => {
    heroImage.style.animation = 'zoomIn 20s ease-in-out infinite alternate';
  });
}

// ===== 원형 텍스트 애니메이션 =====

/**
 * 원형 텍스트 회전 애니메이션
 */
function initCircularText() {
  const circularText = document.querySelector('.circular-text');
  if (!circularText) return;

  // SVG 애니메이션 시작
  circularText.style.animation = 'rotate 20s linear infinite';
}

// ===== 네비게이션 기능 =====

/**
 * 네비게이션 메뉴 및 스크롤 효과
 */
function initNavigation() {
  const nav = document.querySelector('.main-navigation');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (!nav) return;

  // 스크롤 시 네비게이션 배경 조정
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.style.backgroundColor = 'rgba(29, 41, 57, 0.8)';
      nav.style.backdropFilter = 'blur(10px)';
    } else {
      nav.style.backgroundColor = 'rgba(29, 41, 57, 0.6)';
      nav.style.backdropFilter = 'blur(5px)';
    }
  });

  // 네비게이션 링크 클릭 시 부드러운 스크롤
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 140;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 현재 섹션에 따라 active 클래스 업데이트
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * 스크롤 위치에 따라 네비게이션 active 상태 업데이트
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== 캘린더 기능 =====

/**
 * 캘린더 초기화 및 날짜 선택 기능
 */
function initCalendar() {
  const calendarDays = document.querySelectorAll('.calendar-day:not(.header):not(.prev-month):not(.next-month)');
  const prevButton = document.querySelector('.nav-arrow.prev');
  const nextButton = document.querySelector('.nav-arrow.next');
  const currentMonthEl = document.querySelector('.current-month');

  // 날짜 클릭 이벤트
  calendarDays.forEach(day => {
    day.addEventListener('click', () => {
      // 이전 선택 제거
      calendarDays.forEach(d => d.classList.remove('selected'));
      // 현재 날짜 선택
      day.classList.add('selected');
      
      // 해당 날짜의 이벤트 표시 (여기서는 예시)
      updateEventsForDate(day.textContent);
    });
  });

  // 월 네비게이션 (예시 - 실제로는 날짜 계산 필요)
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      // 이전 달로 이동하는 로직
      console.log('Previous month');
    });
  }

  if (nextButton && !nextButton.classList.contains('disabled')) {
    nextButton.addEventListener('click', () => {
      // 다음 달로 이동하는 로직
      console.log('Next month');
    });
  }
}

/**
 * 선택한 날짜의 이벤트 업데이트
 */
function updateEventsForDate(date) {
  console.log(`Showing events for date: ${date}`);
  // 실제로는 해당 날짜의 이벤트를 필터링하여 표시
}

// ===== 스크롤 애니메이션 효과 =====

/**
 * 스크롤 시 요소 페이드인 효과
 */
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // 특정 요소에 대한 커스텀 애니메이션
        if (entry.target.classList.contains('info-cards')) {
          animateInfoCards(entry.target);
        }
      }
    });
  }, observerOptions);

  // 관찰할 요소 선택
  const elementsToAnimate = document.querySelectorAll(`
    .info-cards,
    .urban-hall-section,
    .rental-section,
    .notice-section,
    .event-card,
    .hall-card
  `);

  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

/**
 * 정보 카드 순차 애니메이션
 */
function animateInfoCards(container) {
  const cards = container.querySelectorAll('.info-card, .directions-button');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    }, index * 100);
  });
}

// ===== 일반 애니메이션 =====

/**
 * 페이지 로드 시 초기 애니메이션
 */
function initAnimations() {
  // 플로팅 요소 애니메이션
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });

  // 히어로 텍스트 애니메이션
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    setTimeout(() => {
      heroText.style.opacity = '0';
      heroText.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        heroText.style.transition = 'all 1s ease';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
      }, 100);
    }, 500);
  }
}

// ===== 장소 탭 기능 =====

/**
 * 대관 안내 섹션의 장소 탭 전환
 */
function initVenueTabs() {
  const venueTabs = document.querySelectorAll('.venue-tab');
  const venueInfoCard = document.querySelector('.venue-info-card');

  // 장소 정보 데이터
  const venueData = {
    '공연장': {
      title: '공연장',
      description: '서울 갤러리는 다양한 장르의 공연과 예술 이벤트가 열리는 공간입니다. 관람객들은 특별한 경험을 통해 문화와 예술을 가까이에서 느낄 수 있습니다.',
      buttonText: '공연장 대관예약'
    },
    '워크숍룸': {
      title: '워크숍룸',
      description: '창의적인 워크숍과 세미나를 위한 전문 공간입니다. 최신 설비와 편안한 환경에서 효과적인 교육과 협업이 가능합니다.',
      buttonText: '워크숍룸 대관예약'
    },
    '동그라미방': {
      title: '동그라미방',
      description: '소규모 그룹을 위한 아늑한 회의 공간입니다. 편안한 분위기에서 창의적인 아이디어를 나눌 수 있는 최적의 환경을 제공합니다.',
      buttonText: '동그라미방 대관예약'
    },
    '회의실': {
      title: '회의실',
      description: '전문적인 비즈니스 미팅과 회의를 위한 공간입니다. 최첨단 프레젠테이션 장비와 쾌적한 환경을 갖추고 있습니다.',
      buttonText: '회의실 대관예약'
    }
  };

  venueTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 모든 탭에서 active 제거
      venueTabs.forEach(t => t.classList.remove('active'));
      
      // 현재 탭에 active 추가
      tab.classList.add('active');
      
      // 장소 정보 업데이트
      const venueName = tab.textContent.trim();
      const data = venueData[venueName];
      
      if (data && venueInfoCard) {
        updateVenueInfo(venueInfoCard, data);
      }
    });
  });
}

/**
 * 장소 정보 카드 업데이트 (애니메이션 포함)
 */
function updateVenueInfo(card, data) {
  // 페이드 아웃
  card.style.opacity = '0';
  card.style.transform = 'translateX(-20px)';
  
  setTimeout(() => {
    // 내용 업데이트
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const button = card.querySelector('.reserve-button span');
    
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (button) button.textContent = data.buttonText;
    
    // 페이드 인
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateX(0)';
  }, 300);
}

// ===== 이벤트 카드 인터랙션 =====

/**
 * 이벤트 카드 호버 및 클릭 효과
 */
function initEventCards() {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    // 클릭 시 상세 정보로 이동 (예시)
    card.addEventListener('click', () => {
      const eventTitle = card.querySelector('.event-title').textContent;
      console.log(`Viewing event: ${eventTitle}`);
      // 실제로는 이벤트 상세 페이지로 이동
    });
    
    // 호버 효과 강화
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== 유틸리티 함수 =====

/**
 * 요소가 뷰포트에 보이는지 확인
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * 디바운스 함수 (성능 최적화)
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
 * 스로틀 함수 (성능 최적화)
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

// ===== 성능 최적화 =====

// 스크롤 이벤트 최적화
const optimizedScrollHandler = throttle(() => {
  // 스크롤 관련 처리
  updateActiveNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== 반응형 처리 =====

/**
 * 창 크기 변경 시 레이아웃 조정
 */
const handleResize = debounce(() => {
  // 반응형 처리 로직
  const width = window.innerWidth;
  
  if (width < 768) {
    // 모바일 레이아웃
    adjustMobileLayout();
  } else if (width < 1440) {
    // 태블릿 레이아웃
    adjustTabletLayout();
  } else {
    // 데스크톱 레이아웃
    adjustDesktopLayout();
  }
}, 250);

window.addEventListener('resize', handleResize);

/**
 * 모바일 레이아웃 조정
 */
function adjustMobileLayout() {
  console.log('Adjusting for mobile layout');
  // 모바일에 맞는 추가 조정
}

/**
 * 태블릿 레이아웃 조정
 */
function adjustTabletLayout() {
  console.log('Adjusting for tablet layout');
  // 태블릿에 맞는 추가 조정
}

/**
 * 데스크톱 레이아웃 조정
 */
function adjustDesktopLayout() {
  console.log('Adjusting for desktop layout');
  // 데스크톱에 맞는 추가 조정
}

// ===== 접근성 개선 =====

/**
 * 키보드 네비게이션 지원
 */
document.addEventListener('keydown', (e) => {
  // ESC 키로 모달 닫기 등
  if (e.key === 'Escape') {
    // 열린 모달이나 팝업 닫기
    console.log('ESC pressed');
  }
  
  // Tab 키로 포커스 이동 시 visible 표시
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// 마우스 클릭 시 키보드 네비게이션 모드 해제
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// ===== 에러 처리 =====

/**
 * 전역 에러 핸들러
 */
window.addEventListener('error', (event) => {
  console.error('Error occurred:', event.error);
  // 프로덕션 환경에서는 에러 로깅 서비스로 전송
});

/**
 * Promise rejection 처리
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // 프로덕션 환경에서는 에러 로깅 서비스로 전송
});

// ===== 개발자 콘솔 메시지 =====
console.log('%c서울갤러리 웹사이트', 'color: #278352; font-size: 24px; font-weight: bold;');
console.log('%c깨끗하게 재구성된 코드로 구동 중입니다.', 'color: #666; font-size: 14px;');
console.log('%cSeoul Gallery - Clean & Maintainable Code', 'color: #111; font-size: 12px;');

// ===== Export (모듈 사용 시) =====
// export { initAnimations, initNavigation, initCalendar, initScrollEffects };
