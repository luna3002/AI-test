$(document).ready(function(){
    tabType01(); // 250331 추가
    
    // 메뉴 액션
    $(".btnmenu").bind('click', function(){
        $("body").toggleClass("openMenu");
    });

    // 탑메뉴 제어
    var fxb;
    $(window).unbind('scroll').bind('scroll',function(){
        var wTop = $(this).scrollTop();
        //상단메뉴 고정
        if(wTop > 50){
            if(fxb != 1){
                $('header').addClass('fx');
                
                fxb = 1;
            }
        }else{
            if(fxb == 1){
                $('header').removeClass('fx');
                fxb = "";
            }
        }
    });

    // 스크롤 탑바/상단가기 버튼
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#topBtn').bind("click", function(e) {
        // Prevents the default action to be triggered.
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    // 스크롤 바로이동
    $(".anchor").click(function(e){
        // Prevents the default action to be triggered.
        e.preventDefault();

        $('html,body').animate({
            scrollTop : $(this.hash).offset().top
        }, 500);
    });

    // 텍스트컬러변경 추가 250331
    if ($(".intro_txt").length > 0) {
        var triggerPoint = 100;
        gsap.to('.intro_txt p', {
            color: '#B7B7B7', 
            scrollTrigger: {
                trigger: ".intro_txt p",
                start: "top 0%",
                scrub: true 
            }
        });
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            
            $('.intro_txt p').each(function (index) {
                var $p = $(this);
    
                if (scrollTop >= triggerPoint * (index + 1)) {
                    $p.css('color', '#000');  
                } else {
                    $p.css('color', '#B7B7B7'); 
                }
            });
        });
    };
    // if ($(".benefit_txt").length > 0) {
    //     var triggerPoint = 150;
    //     gsap.to('.benefit_txt li', {
    //         color: '#B7B7B7', 
    //         scrollTrigger: {
    //             trigger: ".benefit_txt li",
    //             start: "top 0%",
    //             scrub: true,
    //         }
    //     });
    //     $(window).scroll(function () {
    //         var scrollTop = $(window).scrollTop();
            
    //         $('.benefit_txt li').each(function (index) {
    //             var $p = $(this);
    
    //             if (scrollTop >= triggerPoint * (index + 1)) {
    //                 $p.css('color', '#000');  
    //             } else {
    //                 $p.css('color', '#B7B7B7'); 
    //             }
    //         });
    //     });
    // };
    // 텍스트컬러변경 수정 및 추가 250429
    if ($(".benefit_txt").length > 0) {
         var triggerRatio = 0.15; // 페이지 중간 지점
        var triggerPoint = $(document).height() * triggerRatio - $(window).height() / 2;
        gsap.to('.benefit_txt li', {
            color: '#B7B7B7', 
            scrollTrigger: {
                trigger: ".benefit_txt li",
                start: "top 0%",
                scrub: true,
            }
        });
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            
            $('.benefit_txt li').each(function (index) {
                var $p = $(this);
    
                if (scrollTop >= triggerPoint + 100 * index) {
                    $p.css('color', '#000');  
                } else {
                    $p.css('color', '#B7B7B7'); 
                }
            });
        });
    };
    if ($(".benefit_txt.type2").length > 0) {
        var triggerRatio = 0.35; // 페이지 중간 지점
        var triggerPoint = $(document).height() * triggerRatio - $(window).height() / 2;
        gsap.to('.benefit_txt.type2 li', {
            color: '#B7B7B7', 
            scrollTrigger: {
                trigger: ".benefit_txt.type2 li",
                start: "top 0%",
                scrub: true,
            }
        });
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            
            $('.benefit_txt.type2 li').each(function (index) {
                var $p = $(this);
    
                if (scrollTop >= triggerPoint + 100 * index) {
                    $p.css('color', '#000');  
                    
                } else {
                    $p.css('color', '#B7B7B7'); 
                }
            });
        });
    };

    if (window.innerWidth >= 768) { 
        if ($(".benefit_box .img_wrap img").length > 0) {
            var triggerRatio = 0.3; // 트리거 지점 비율
            var triggerPoint = $(document).height() * triggerRatio - $(window).height() / 2;
    
            $(window).on("scroll", function () {
                var scrollTop = $(window).scrollTop();
    
                if (scrollTop >= triggerPoint) {
                    $(".benefit_box .img_wrap img").each(function (i, el) {
                        gsap.to(el, {
                            x: -150 * i,
                            opacity: 1,
                            duration: 1,
                            ease: "power2.out",
                            delay: i * 0.1
                        });
                    });
                }
            });
        }
    }

    // 솔루션카드 250401 추가
    $('.sol_card_list li').first().addClass('on');
    $('.sol_card_list li').first().hover(function() {
        $(this).addClass('on');
        $('.sol_card_list li').last().removeClass('on');
    }, function() {
        $(this).addClass('on');
        $('.sol_card_list li').last().removeClass('on');
    });

    $('.sol_card_list li').last().hover(function() {
        $(this).addClass('on');
        $('.sol_card_list li').first().removeClass('on');
    }, function() {
        $(this).removeClass('on');
        $('.sol_card_list li').first().addClass('on');
    }); 

    //서브탭메뉴 - 250512 제거
    // if (window.innerWidth <= 768) {
    //     if ($(".tab_swiper .tab_list").length > 0) {
    //         var tab_swiper = new Swiper('.tab_swiper', {
    //             loop: false,
    //             slidesPerView: 3,
    //             pagination: {
    //                 el: ".swiper-pagination",
    //                 clickable: true,
    //             },
    //         });
    //     };
    // };

    // 고객사 슬라이드 - 250411 수정
    new Swiper('.con_list01', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 30000,
        breakpoints: {
            0: {
                slidesPerView: '2',
                spaceBetween: 20,
            },
            768: {
                slidesPerView: '4',
                spaceBetween: 40,
            }
        }
    });
    new Swiper('.con_list02', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        speed: 30000,
        breakpoints: {
            0: {
                slidesPerView: '2',
                spaceBetween: 20,
            },
            768: {
                slidesPerView: '4',
                spaceBetween: 40,
            }
        }
    });

    // 250805 문의하기 플로팅 버튼
    $('.inquiry_wrap').hide();
    $('.btn_flot').click(function() {
        $('.inquiry_wrap').toggle();
        $(this).toggleClass('on');
    });
});

// 탭컨텐츠 추가 250331
function tabType01() {
    $('.tab_wrap').each(function() {
        var $tabWrap = $(this);
        var $tabListItems = $tabWrap.find('.tab_list li button, .tab-list li a');
        var $tabContents = $tabWrap.find('.tab_con');

        $tabContents.hide();
        $tabListItems.each(function(index) {
            if ($(this).hasClass('on')) {
                $tabContents.eq(index).show();
            }
        });

        $tabListItems.mouseover(function() {
            var index = $(this).parent().index();
            $tabContents.hide();
            $tabListItems.removeClass('on').find('span.screenOut').remove();
            $(this).addClass('on');
            $tabContents.eq(index).show();
        });
    });
}