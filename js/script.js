
/* #################################################################################
    BodyScroll #바디스크롤
################################################################################# */
var stBodyScroll = (function () {
    return {
        lock: function () {
            $('body').addClass('scrlock');
            $('.header-wrap').attr('aria-hidden', true);
            $('.device-frame').attr('aria-hidden', true);
        },
        unlock: function () {
            $('body').removeClass('scrlock');
            $('.header-wrap').attr('aria-hidden', false);
            $('.device-frame').attr('aria-hidden', false);
        }
    }
})();



/* #################################################################################
    Dialog
################################################################################# */
/* 함수 */
var stModal = (function () {
    // panning 이동거리 확인용
    var tsY,
        teY;

    return {
        common: {

        },
        full: {

            open: function (_target) {
                var $thisModal = $(_target);
                var $modalContainer = $thisModal.find('.modal-container');

                if ($thisModal.hasClass('active') === true) return;
                if ($thisModal.attr('data-animation') == 'off') {
                    $thisModal.addClass('active');
                } else {
                    $thisModal.addClass('active');
                    setTimeout(function () {
                        $thisModal.addClass('ani');
                    }, 30);
                }

                // 바디스크롤 제어
                stBodyScroll.lock();

                // 스크롤인터렉션
                $modalContainer.off('scroll.full').on('scroll.full', function () {
                    stModal.full.scroll(_target);
                });

                // 접근성
                $(_target).find('[data-wai-focus="start"]').attr('tabindex', -1).focus();
                // $('.layout').attr('aria-hidden', true);
                console.log('열림');
            },
            close: function (_target) {
                var $thisModal = $(_target).closest('.sl-modal');
                var $modalContainer = $thisModal.find('.modal-container');

                if ($thisModal.hasClass('modal-full') === true) {
                    /* animation option */
                    // default
                    if ($thisModal.attr('data-animation') == 'off') {
                        $thisModal.removeClass('active');
                        // 바디스크롤 제어
                        if ($('body').find('.sl-modal.active').length == 0) stBodyScroll.unlock();
                    } else {
                        // animation
                        $thisModal.removeClass('ani');
                        setTimeout(function () {
                            $thisModal.removeClass('active');
                            // 바디스크롤 제어
                            if ($('body').find('.sl-modal.active').length == 0) stBodyScroll.unlock();
                        }, 300); //.modal-layer의 transition-duration 만큼 값 넣어서 사용
                    }
                }

                // 스크롤인터렉션
                $modalContainer.off('scroll.full');
            },
            scroll: function (_target) {// 스크롤인터렉션
                var $thisModal = $(_target).closest('.sl-modal');
                var $modalHeader = $thisModal.find('.modal-header');
                var $modalContainer = $thisModal.find('.modal-container');
                var scrT = $modalContainer.scrollTop();

                // 일반페이지 헤더고정
                if (scrT > 0) {
                    $modalHeader.addClass('fixed');
                } else {
                    $modalHeader.removeClass('fixed');
                }


                // 인터렉션타이틀
                var $modalMvmtTitle = $thisModal.find('[data-mvmtTitle]');
                var spotTitleMvmt = null;

                if ($modalMvmtTitle.length > 0) {
                    var $mvmtTitleHeader = $modalHeader.find('[data-mvmtTitle="header"]');
                    var $mvmtTitleContents = $thisModal.find('[data-mvmtTitle="contents"]');
                    var spotRange = $modalHeader.outerHeight() / 2;
                    var spotTitleMvmt = ($mvmtTitleContents.offset().top + scrT) - spotRange;

                    if (scrT > spotTitleMvmt) {
                        if (ui_testMode == true) console.log('인터렉션헤더 노출');

                        $mvmtTitleHeader.addClass('mvmt');
                    } else {
                        if (ui_testMode == true) console.log('인터렉션헤더 숨김');

                        $mvmtTitleHeader.removeClass('mvmt');
                    }
                }

            }
        },

    }
})();

// modal-bottom ty-panning
// 터치 방향 감지
$(document).on('touchstart', '.se-btn.btn-modal-panning', function (_event) {
    stModal.bottom.panningStart(_event);
});

$(document).on('touchend', '.se-btn.btn-modal-panning', function (_event) {
    stModal.bottom.panningEnd(_event);
});


/* #################################################################################
    swiper
################################################################################# */
/* 메인화면 */
var offeringSwipe;

function offeringSwiper() {
    offeringSwipe = new Swiper(".offering-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        a11y: {
            enabled: true,
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
        },
        navigation: {
            prevEl: ".offering-swiper-area .swiper-button-prev",
            nextEl: ".offering-swiper-area .swiper-button-next",
        },
        pagination: {
            el: ".offering-swiper-area .swiper-pagination",
            clickable: true,
        },
        on: {
            init: function () {
                updateAriaHidden(this);
                updatePaginationInfo(this);
            },
            slideChange: function () {
                updateAriaHidden(this);
                updatePaginationInfo(this);
            },
            slideChangeTransitionEnd: function () {
                updateAriaHidden(this);
                updatePaginationInfo(this);
            },
            paginationUpdate: function () {
                updatePaginationInfo(this);
            }
        }
    });

    // 활성 슬라이드 제외 aria-hidden 처리
    function updateAriaHidden(swiper) {
        var slides = swiper.slides;

        // 모든 슬라이드 aria-hidden 초기화
        $(slides).attr('aria-hidden', 'true');

        // 현재 활성 슬라이드만 aria-hidden="false"
        $(slides).each(function () {
            if ($(this).hasClass('swiper-slide-active')) {
                $(this).attr('aria-hidden', 'false');
            }
        });
    }

    // pagination 업데이트
    function updatePaginationInfo(swiper) {
        var current = swiper.realIndex + 1;
        var total = swiper.slides.length;
        $('.swiper-pagination').attr('aria-label', `총 ${total}개 슬라이드 중 ${current}번째 슬라이드`);
    }
}



/* #################################################################################
    swiper
################################################################################# */

// e: 20250612 추가 - hsb


// s: 20250701 추가 - hsb
// 간편모드 메인 - 쉬운화면 사용 팁 스와이퍼 추가
var ManualSwiper;

function easyManualSwiper() {
    ManualSwiper = new Swiper('.manual-swipe', {
        slidesPerView: 1,
        speed: 500,
        observer: true,
        observeParents: true,
        a11y: {
            enabled: true,
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
        },
        pagination: {
            el: '.popup-manual .swiper-pagination',
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




// e: 20250701 추가 - hsb