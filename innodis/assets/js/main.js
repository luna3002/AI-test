$(document).ready(function(){
    // 슬라이드 관련
    $('.mainslider').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        pauseOnHover: false,
        fade: true,
        cssEase: 'linear'
    });
    
    // 페이지가 새로 리로드 될때만 실행
    var top_space = 0;
    if ($('#header').length) {
        top_space = $('#header').outerHeight();
    }  //해더에 바가 있는 경우 오프셋 하는 경우 필요

    var hash = window.location.hash;
    if (hash && document.getElementById(hash.slice(1))) { // #값이 있을때만 실행됨
        var $this = $(hash);
        $('html, body').animate({
            scrollTop: $this.offset().top - top_space
        }, 1000, 'easeInOutExpo', function () {
            window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
        });
    }
  
    $('.scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1000, 'easeOutCubic'); 

                return false;
            }
        }
    });
});