$(document).ready(function(){
    // 브라우저의 높이 변수 -섹션의 높이로 활용
    var winHeight=0;
    var winWidth;

    // 슬라이더 변수

    // 터치 변수

    // 브라우저의 높이값 얻기 위한 함수
    function $wh(){
        // 브라우저의 높이값 가져오기
        winHeight=$(window).height();
        // 스크롤바의 추가값 계산
        $(".section").css({
            height:winHeight
        })
        console.log("창의 높이:"+winHeight)

        // 헤더가 섹션 밖에 있을 때 처리 방법
        $(".section").eq(0).css({
            height:winHeight
        })
    }
    $wh();


    // 브라우저의 높이가 변경되면 처리할 재설정
    $(window).resize(function(){
        $wh()
        wheel();

        // 높이가 조절될 때, 섹션의 높이를 조절하기 위한 부분
        $("html,body").stop().animate({
            scrollTop:winHeight*activeIndex
        },0)

    })

    // 헤더 네비, 사이드 네비 구성 처리 및
    var $navBool=true;
    $(".nav-button").click(function(){
        if($navBool){
            $(this).addClass("bg-active")
            $(".nav-list").addClass("active")
            $navBool=false;
        }else{
            $(".nav-list").removeClass("active")
            $(this).removeClass("active")
            $navBool=true;
        }
    })

    // 스크롤 애니메이션
    $(window).scroll(function(){
        $scrollTop=$(window).scrollTop();
        if($scrollTop<70){
            $("header").removeClass("headerActive")
        }else{
            $("header").addClass("headerActive")
        }
    })

    // 해시 애니메이션
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            $hash=$(this.hash).offset().top
            $("html,body").stop().animate({
                scrollTop:$hash
            })
            $(".nav-list a").removeClass("clickActive");
            $(this).addClass("clickActive")
            $(".nav-list").removeClass("active")
            $navBool=true;
            $(".side-nav a").removeClass("side-nav-active")
            $(".side nav a").eq(index).addClass("side-nav-active")

        })
    })
    $(".side-nav a").each(function(index){
        $(this).click(function(){
            $hash=$(this.hash).offset().top
            $("html,body").stop().animate({
                scrollTop:$hash
            })
            $(".side-nav a").removeClass("side-nav-active")
            $(this).addClass("side-nav-active");
            $(".nav-list a").removeClass("clickActive");
            $(".nav-list a").eq(index).addClass("clickActive")
        })
    })

    // 활성/비활성

    // 스킬

    // 애니메이션

    // 휠 함수
    function wheel(){
        // 슬라이드 부분 삽입

        // 휠을 올렸을 때의 동작
        $(".section").each(function(index){
            $(this).on("DOMMouseScroll mousewheel", function(e){
                if(e.originalEvent.wheelDelta>0 || e.originalEvent.detail<0){
                    if($(this).prev() !=undefined){
                        var moveTop=$(this).prev().offset().top;
                        console.log("섹션의 위치:"+moveTop)
                        activeIndex=index-1;

                        // 휠을 올렸을 때 애니메이션할 위치
                        if(moveTop<$(".section").eq(1).offset().top){
                            $("header").removeClass("headerActive")
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index-1).addClass("clickActive")
                        $(".side-nav a").eq(index).removeClass("side-nav-active")
                        $(".side-nav a").eq(index-1).addClass("side-nav-active")
                    }
                }else{
                    console.log("내렸어요.");
                    if($(this).next() !=undefined){
                        var moveTop=$(this).next().offset().top;
                        activeIndex=index+1;
                        console.log("섹션의 위치:"+moveTop)

                        // 휠을 내렸을 때 애니메이션할 위치
                        if(moveTop>$(".section").eq(1).offset().top){
                            $("header").addClass("headerActive")
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index+1).addClass("clickActive")
                        $(".side-nav a").eq(index).removeClass("side-nav-active")
                        $(".side-nav a").eq(index+1).addClass("side-nav-active")
                    }
                }

                $("html,body").stop().animate({
                    scrollTop:moveTop
                },800);
                return false;
            })
        })

        // 마우스 무브, 터치 무브
    }
    wheel();
})
// jquery 끝