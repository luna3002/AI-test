---
# ====================================
# AI search 설정 파일
# ====================================
# 이 파일을 수정하면 디자이너 없이도 웹사이트의 디자인과 컨텐츠를 변경할 수 있습니다.
# 각 섹션별로 친절한 설명이 있으니 천천히 읽고 원하는 값을 변경하세요.

# ====================================
# 1. 디자인 설정 (Design Settings)
# ====================================
design:
  # 색상 설정 (Color Settings)
  # 색상 코드는 # 뒤에 6자리 hex 코드를 사용합니다 (예: #00FF00은 초록색)
  # 색상 코드는 https://htmlcolorcodes.com/ 에서 찾을 수 있습니다.
  colors:
    # AI 검색 카드
    card_border: "#00793b"              # AI 검색 카드 테두리 색상
    card_background: "#ffffff"          # AI 검색 카드 배경 색상
    
    # 타이틀 영역
    title_text: "#00793b"               # "이노디스", "AI 검색" 타이틀 글자 색상
    
    # 검색창 영역
    search_bar_background: "#00793b"    # 검색창 배경 색상
    search_text: "#ffffff"              # 검색창 입력 텍스트 색상
    
    # 검색 결과 영역
    results_background: "#fafafa"       # 검색 결과 전체 배경 (회색 영역)
    results_content_background: "#ffffff"  # 검색 결과 내용 배경 (흰색 카드)
    results_highlight: "#00793b"        # 검색 결과 강조 텍스트 색상 (예: "무장애 공원, 무장애 숲길 자료")
    
    # 추천 질문 영역
    question_chip_background: "rgba(0, 167, 81, 0.1)"  # 질문 칩 배경 색상 (연한 초록)
    question_chip_border: "#ffffff"     # 질문 칩 테두리 색상
    question_chip_icon: "#00793b"       # 질문 칩 아이콘 색상
    
    # 날씨 정보 영역
    weather_date_background: "#00446e"  # 날씨 날짜 카드 배경 (파란색)
    weather_card_border: "#dddddd"      # 날씨 정보 카드 테두리
    weather_temp_low: "#1670f3"         # 최저기온 숫자 색상 (파란색)
    weather_temp_high: "#bc1746"        # 최고기온 숫자 색상 (빨간색)
    
    # 공통 텍스트 색상
    text_dark: "#1a1a1a"                # 진한 텍스트 (제목, 본문)
    text_medium: "#666666"              # 중간 텍스트 (설명, 라벨)
    text_light: "#888888"               # 밝은 텍스트 (보조 정보)
  
  # 배경 설정 (Background Settings)
  background:
    type: "gradient"                    # "gradient" = 그라데이션 / "solid" = 단색
    # 그라데이션 설정 (type이 "gradient"일 때 적용)
    gradient_start: "#eefbf4"           # 그라데이션 시작 색상 (위쪽)
    gradient_end: "rgba(238,251,244,0)" # 그라데이션 끝 색상 (아래쪽, 투명도 가능)
    # 단색 배경 설정 (type이 "solid"일 때 적용)
    solid_color: "#e4e4e4"              # 단색 배경 색상
  
  # 폰트 설정 (Font Settings)
  # 폰트는 눈누(https://noonnu.cc/index)에서 다운로드 받아 사용하세요.
  # 눈누 사이트에서 원하는 폰트를 선택하고 "웹폰트로 사용" 탭에서 @font-face 코드를 복사하세요.
  fonts:
    # 폰트 패밀리 설정
    # 예: "Pretendard", "Noto Sans KR", "나눔스퀘어", "Gmarket Sans" 등
    font_family: "Pretendard"        # 전체 사이트에 적용할 폰트
    
    # 폰트 파일 경로 설정
    # CDN 사용: https://로 시작하는 경로 (예: https://cdn.jsdelivr.net/...)
    # 로컬 파일 사용: resource/fonts/ 폴더에 폰트 파일(.woff, .woff2, .ttf 등)을 업로드하고 경로 입력
    font_path: "https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2"    # 폰트 파일 경로
  
# ====================================
# 2. 레이아웃 설정 (Layout Settings)
# ====================================
layout:
  # 모듈 활성화/비활성화 (Module Enable/Disable)
  # true = 표시, false = 숨김
  modules:
    header: true                    # 상단 헤더 표시 여부
    footer: true                    # 하단 푸터 표시 여부
    sidebar: true                   # 우측 사이드바 표시 여부
    ai_search: true                 # AI 검색 영역 표시 여부

# ====================================
# 3. 헤더 컨텐츠 (Header Content)
# ====================================
header:
  type: "html"                          # "html" = HTML 파일 불러오기 / "image" = 이미지 파일 불러오기
  file: "modules/header/header.html"    # html 타입: header.html / image 타입: header.png 파일명만 변경


# ====================================
# 4. AI 검색 영역 컨텐츠 (AI Search Content)
# ====================================
ai_search:
  # 메인 타이틀
  title:
    sub: "이노디스"                               # 부제목
    main: "AI 검색"                                 # 주제목
  
  # 검색창 설정
  search:
    placeholder: "이번 주말 데이트코스 짜줘"  # 검색창 안내 문구
    button_icon: "resource/search-button.svg"       # 검색 버튼 아이콘
  
  # 검색 크레딧
  credits:
    line1: "\"당신의 마음을 이해하고 대화하는 AI 친구\""
    line2: "ⓒ SIGMOID AI SEARCH"
  
  # 검색 결과 (Search Results)  \n은 줄바꿈을 의미합니다.
  search_results:
    header:
      highlight: "무장애 공원, 무장애 숲길 자료"          # 강조 텍스트
      intro: "서울의 공원에서 휠체어로 갈 수 있는 여러 여행 코스를 소개합니다. 각 코스는 공원, 정원, 둘레길을 포함하고 있습니다."
    
    results:  # 컨텐츠 추가시 - title 부분 을 더 추가하면 됩니다.
      - title: "1. 개운산 동행정원"
        description: "• 위치 : 서울시 성북구 돈암동산 3-3\n 
                      • 특징 : 어르신, 임산부, 장애인 등 (보행)약자와 함께하는 복지정원\n
                      • 설명 : 대운산 인근 복지시설 (요양원, 경로당, 장애인 복지시설 등) 이용자가 직접 참여하여 함께 식재하는 정원\n
                      • 교통 : 4호선 성신여대입구역 1번 출구로 나온 후 도보 100M 이동"
      
      - title: "2. 경희궁"
        description: "• 위치 : 서울시 종로구 새문안로55 (신문로2가 2-1)\n
                      • 특징 : 인조 이후 10대에 걸쳐 임금들이 머무른 궁궐, 특히 영조는 치세의 절반을 이곳에서 보냈음\n
                      • 설명 : 1617년부터 짓기 시작하여 1623년에 완성. 서울시에서는 경희궁지에 대한 발굴을 거쳐 숭정전 등 정전지역을 복원하여 2002년부터 시민들에게 공개함\n
                      • 교통 : 5호선 서대문역 4번 출구 도보 9분, 5호선 광화문역 1분 출구 도보 10분 , 3호선 경복궁역 7번 출구 도보 14분"
      
      - title: "3. 와룡공원"
        description: "• 위치 : 서울시 종로구 와룡공원길 192\n
                      • 특징 : 용이 길게 누워있는 형상을 하여 와룡동이라고 불림. 토심이 얕아 수목생육이 어렵고, 아카시아 나무 등으로 산림이 조성되었음. 주민들이 생명의나무 천만그루 심기 행사에 스스로 참여하여 수목을 심고 가꾸어 푸르른 공원으로 변모\n
                      • 교통 : 3호선 안국역2번 출구 → 마을버스 종로 02 → 성대후문, 와룡공원 하차 → 도보 5분"

      - title: "4. 두마리고양이공원"
        description: "• 위치 : 서울시 종로구 와룡공원길 192\n
                      • 특징 : 용이 길게 누워있는 형상을 하여 와룡동이라고 불림. 토심이 얕아 수목생육이 어렵고, 아카시아 나무 등으로 산림이 조성되었음. 주민들이 생명의나무 천만그루 심기 행사에 스스로 참여하여 수목을 심고 가꾸어 푸르른 공원으로 변모\n
                    • 교통 : 3호선 안국역2번 출구 → 마을버스 종로 02 → 성대후문, 와룡공원 하차 → 도보 5분"

      - title: "5. 세마리고양이공원"
        description: "• 위치 : 서울시 종로구 와룡공원길 192\n
                      • 특징 : 용이 길게 누워있는 형상을 하여 와룡동이라고 불림. 토심이 얕아 수목생육이 어렵고, 아카시아 나무 등으로 산림이 조성되었음. 주민들이 생명의나무 천만그루 심기 행사에 스스로 참여하여 수목을 심고 가꾸어 푸르른 공원으로 변모\n
                    • 교통 : 3호선 안국역2번 출구 → 마을버스 종로 02 → 성대후문, 와룡공원 하차 → 도보 5분"

      - title: "6. 네마리고양이공원"
        description: "일반 텍스트 설명을 적을 수도 있습니다. 이런 텍스트를 적으면 이렇게 나옵니다."
    
    summary: "고양이공원을 추천합니다."
  
  # 추천 질문 (Suggested Questions)
  suggested_questions:
    title: "혹시 이런 질문은 어떠신가요?"
    bubble_icon: "fa-circle-question"             
    # 말풍선 아이콘 (Font Awesome: https://fontawesome.com/icons 에서 아이콘 검색 후 클래스명 복사 / 예: fa-message, fa-comment-dots 등)
    questions:
      - "낮잠자기 딱 좋은 공원을 알려줘"  
      - "무장애 숲길이 어느지역에 있어?"
      - "유모차 끌고 갈 수 있는 공원이 어디야?"
      - "근처에 장애인 복지시설이 있어?"
  
  # 날씨 정보
  weather:
    enabled: true                                   # 날씨 표시 여부 (true/false)
    title: "날씨가 <흐리고, 비>가 올 가능성이 높아요! 가디건 혹은 재킷 같은 겉옷과 우산을 챙기세요"
    date: "11.29"
    year: "2025"
    condition: "흐림 뒤 비"
    icon: "resource/weather-cloudy-rain.png"
    temp_low: "4˚"
    temp_high: "14˚"
    rain_probability: "80%"

# ====================================
# 5. 사이드바 컨텐츠 (Sidebar Content)
# ====================================
sidebar:
  type: "html"                          # "html" = HTML 파일 불러오기 / "image" = 이미지 파일 불러오기
  file: "modules/sidebar/sidebar.html"    # html 타입: header.html / image 타입: header.png 파일명만 변경


# ====================================
# 6. 푸터 컨텐츠 (Footer Content)
# ====================================
footer:
  type: "html"                          # "html" = HTML 파일 불러오기 / "image" = 이미지 파일 불러오기
  file: "modules/footer/footer.html"    # html 타입: header.html / image 타입: header.png 파일명만 변경


# ====================================
# 사용 가이드 (How to Use)
# ====================================
# 1. 색상 변경하기:
#    design.colors 섹션에서 원하는 색상 코드를 변경하세요.
#    색상 코드는 https://htmlcolorcodes.com/ 에서 찾을 수 있습니다.
#
# 2. 텍스트 수정하기:
#    각 모듈(header, ai_search, sidebar, footer)의 내용을 수정하세요.
#
# 3. 헤더/푸터 변경하기:
#    header.type 또는 footer.type을 "html" 또는 "image"로 변경하고
#    header.file 또는 footer.file에 파일명을 입력하세요.
#
# 4. 저장 후 AI에게 요청하기:
#    이 파일을 저장하고 AI에게 "config.md 적용해줘"라고 요청하면
#    실제 HTML/CSS 파일들이 자동으로 수정됩니다.
#
# 💡 팁: 작은 변경부터 시작하세요. 
#    한 번에 하나씩 변경하고 결과를 확인하는 것이 안전합니다!
---
