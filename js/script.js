$(document).ready(function () {
    // 데이터 포커스 처리시킴 

    $(_target).find('[data-wai-focus="start"]').attr('tabindex', -1).focus();


    // 스판 클릭했을때 버튼처럼 동작하게 작업
    document.querySelector('.sbottom-fir-spa').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // 스페이스 눌렀을 때 스크롤 방지
            this.click();       // 클릭 동작 실행
        }
    });
});
/* #################################################################################
    swiper
################################################################################# */

var ManualSwiper;

function easyManualSwiper() {
    ManualSwiper = new Swiper('.manual-swipe', {
        slidesPerView: 2.5, // 슬라이드 폭 기준으로 자동 계산
        spaceBetween: 5,       // 슬라이드 사이 간격
        speed: 500,
        observer: true,
        observeParents: true,
        a11y: {
            enabled: true,
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
        },
        pagination: {
            el: '.swiper-nav .swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                // 초기화 후 불릿 aria-label 덮어쓰기
                setTimeout(() => {
                    updatePaginationLabels(this);
                }, 100);

                updateAriaHidden();
                updatePaginationInfo(this);
            },
            slideChange: function () {
                updateAriaHidden();
                updatePaginationInfo(this);
                updatePaginationLabels(this);
            },
            slideChangeTransitionEnd: function () {
                updateAriaHidden();
                updatePaginationInfo(this);

                const $activeSlide = $('.manual-swipe .swiper-slide').eq(this.activeIndex);
                $activeSlide.find('.swiper-titl').attr('tabindex', '-1').focus();
            },
            paginationUpdate: function () {
                updatePaginationInfo(this);
                updatePaginationLabels(this);
            }
        }
    });
}

function updateAriaHidden() {
    $('.manual-swipe .swiper-slide').attr('aria-hidden', 'true');
    $('.manual-swipe .swiper-slide-active').attr('aria-hidden', 'false');
}

function updatePaginationInfo(swiper) {
    const current = swiper.realIndex + 1;
    const total = swiper.slides.length;
    $('.swiper-pagination-info').text(`총 ${total}개 슬라이드 중 ${current}번째 슬라이드`);
}

function updatePaginationLabels(swiper) {
    if (!swiper.pagination || !swiper.pagination.bullets) return;

    swiper.pagination.bullets.forEach(function (el, index) {
        const isActive = el.classList.contains('swiper-pagination-bullet-active');
        const label = `${index + 1}번째 슬라이드로 이동` + (isActive ? ', 선택됨' : '');
        el.setAttribute('aria-label', label);
    });
}



