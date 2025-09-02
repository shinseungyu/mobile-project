/*
    window load
*/
$(window).on('load', function () {
    deviceSet.init();
    modeSet.init();
    maxViewSize()

});


/*
    window resize
*/
$(window).on('resize', function () {
    maxViewSize()
});


/*
    global variable
*/
var svDeviceMbData = ['iPhone SE', 'iPhone 5', 'iPhone 11', 'iPhone 13', 'iPhone X', 'iPhone 13 Pro Max', 'Galaxy S10', 'Galaxy S20+', 'Galaxy Note20', 'Galaxy Fold'];
var svDeviceTabData = ['iPad mini', 'iPad', 'iPad Air 3', 'iPad Air 4', 'iPad Pro', 'Galaxy Tab S7'];
var svDeviceDetailData = [
    {
        type: 'mobile',
        os: 'ios',
        name: 'iPhone 11 Pro',
        width: 375,
        height: 812,
    },
    {
        type: 'mobile',
        os: 'ios',
        name: 'iPhone 11',
        width: 414,
        height: 896,
    },
    {
        type: 'mobile',
        os: 'ios',
        name: 'iPhone 12 & Pro',
        width: 390,
        height: 844,
    },
    {
        type: 'mobile',
        os: 'ios',
        name: 'iPhone 12 Mini',
        width: 360,
        height: 780,
    },
    {
        type: 'mobile',
        os: 'ios',
        name: 'iPhone 12 Pro Max',
        width: 428,
        height: 926,
    },

    // 갤럭시
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy S20',
        width: 360,
        height: 800,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy S20+',
        width: 384,
        height: 854,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy S20 Ultra',
        width: 412,
        height: 915,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy S23 & +',
        width: 360,
        height: 780,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy S23 Ultra',
        width: 360,
        height: 722,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Fold(cover)',
        width: 280,
        height: 653,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Fold(main)',
        width: 768,
        height: 1076,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Z Fold 3(cover)',
        width: 320,
        height: 872,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Z Fold 3(main)',
        width: 674,
        height: 842,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Z Fold 4(cover)',
        width: 345,
        height: 881,
    },
    {
        type: 'mobile',
        os: 'android',
        name: 'Galaxy Z Fold 4(main)',
        width: 691,
        height: 829,
    },




    // 테블릿
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad mini',
        width: 768,
        height: 1024,
    },
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad',
        width: 810,
        height: 1080,
    },
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad Air 3',
        width: 834,
        height: 1112,
    },
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad Air 4',
        width: 820,
        height: 1180,
    },
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad Pro 11 inch',
        width: 834,
        height: 1194,
    },
    {
        type: 'tablet',
        os: 'ios',
        name: 'iPad Pro 12.9 inch',
        width: 1024,
        height: 1366,
    },
    {
        type: 'tablet',
        os: 'android',
        name: 'Galaxy Tab S7 ~ S9',
        width: 800,
        height: 1280,
    },
];


/*
    device function
*/
var deviceSet = (function () {
    return {
        init: function () {
            deviceSet.optionAppend();
            deviceSet.optionInit(svDeviceDetailData[0])

        },
        optionInit: function (value) { // 초기 옵션값 설정
            var $option = $('[data-option="device"]').find('option');
            var model = value.name;

            for (var i in $option) {
                if ($option.eq(i).attr('data-model') == model) {
                    $option.eq(i).prop('selected', true)
                }
            };
        },
        optionAppend: function () { // 디바이스 셀렉트 옵션 생성
            var $selectOp = $('[data-option="device"]');

            var mbOptGroup = $('<optgroup>', {
                label: 'Mobile'
            }).appendTo($selectOp);
            var TbOptGroup = $('<optgroup>', {
                label: 'Tablet'
            }).appendTo($selectOp);

            for (var i in svDeviceDetailData) {
                var deviceType = svDeviceDetailData[i].type;
                var deviceName = svDeviceDetailData[i].name;
                var deviceSize = svDeviceDetailData[i].width + '*' + svDeviceDetailData[i].height;

                if (deviceType == 'mobile') {
                    $option = $('<option>', {
                        value: deviceName,
                        'data-model': deviceName,
                        'data-size': deviceSize,
                        'data-type': deviceType,
                        text: deviceSize + ' / ' + deviceName,
                    }).appendTo(mbOptGroup);

                } else if (deviceType == 'tablet') {
                    var $option = $('<option>', {
                        value: deviceName,
                        'data-model': deviceName,
                        'data-size': deviceSize,
                        'data-type': deviceType,
                        text: deviceSize + '/' + deviceName,
                    }).appendTo(TbOptGroup);
                };
            };
        },
    };
})();


/*
    frame mode
*/
var modeSet = (function () {
    return {
        init: function () {
            var $frameView = $('.frame-view');
            var activeMode = $frameView.attr('data-active-mode')

            if (activeMode == 'default') {
                modeSet.check($frameView, 'default')
            } else if (activeMode == 'device') {
                modeSet.check($frameView, 'device')
            }
        },
        check: function (target, mode) {
            var $btnMode = $('[data-func="mode"]');
            var $btnModeDefault = $('[data-func="mode"][data-mode="default"]');
            var $btnModeDevice = $('[data-func="mode"][data-mode="device"]');
            $btnMode.removeClass('active')

            if (mode == 'default') {
                $(target).removeClass('active');
                // $btnMode.attr('data-mode','default').removeClass('active');
                $btnModeDevice.addClass('active');
                defaultViewSet.init();
            }
            if (mode == 'device') {
                $(target).addClass('active');
                // $btnModeDevice.attr('data-mode','device').addClass('active');
                $btnModeDefault.addClass('active');
                deviceViewSet.init();
            }

        },
        toggle: function (ev) {
            var $frameView = $('.frame-view');
            var $ev = $(ev);
            var evMode = $ev.attr('data-mode');

            if (evMode == 'default') {
                modeSet.check($frameView, 'device')
            }
            if (evMode == 'device') {
                modeSet.check($frameView, 'default')
            }
        }
    };
})();


/*
    default view
*/
var defaultViewSet = (function () {
    return {
        init: function () {
            var $frame = $('[data-device="target"]'),
                $iframe = $('[data-device="frame"]');

            $frame.css({
                'width': '100%',
                'height': '100%'
            });

            $iframe.css({
                'width': '100%',
                'height': '100%'
            })
        },

    };
})();


/*
    device view
*/
var deviceViewSet = (function () {
    return {
        init: function () {
            var $option = $('[data-option="device"]').find('option:selected'),
                $rotate = $('[data-func="rotate"]')

            var type = $option.attr('data-type'),
                model = $option.attr('data-model'),
                size = $option.attr('data-size');

            deviceViewSet.frameChange(type, model, size);
        },
        frameChange: function (type, model, size) { // 디바이스 교체
            var $frame = $('[data-device="target"]'),
                $rotateBtn = $('[data-func="rotate"]');

            var sizeW = size.split('*')[0],
                sizeH = size.split('*')[1];

            if ($rotateBtn.hasClass('active')) {
                // $rotateBtn.trigger('click');
            };

            if (type == 'custom') {
                $('.option-size').addClass('active')
                $('.option-size').find('.custom-size .btn-confirm').prop('disabled', false)
                $('.option-size').find('.custom-size input').prop('disabled', false)
                $('input[data-custom="width"]').val($frame.attr('data-width'))
                $('input[data-custom="height"]').val($frame.attr('data-height'))
            } else {
                $('.option-size').removeClass('active')
                $('.option-size').find('.custom-size .btn-confirm').prop('disabled', true)
                $('.option-size').find('.custom-size input').prop('disabled', true)

                $frame.attr({
                    'data-type': type,
                    'data-model': model,
                    'data-width': sizeW,
                    'data-height': sizeH,
                });
            };

            deviceViewSet.changeSize()
        },
        changeSize: function () { // 디바이스 사이즈 변경
            var $target = $('[data-device="target"]'),
                $iframe = $target.find('[data-device="frame"]')

            var w = $target.attr('data-width'),
                h = $target.attr('data-height'),
                idcH = $target.find('.indicator').height();

            $target.css({
                'width': w + 'px',
                'height': h + 'px',
            });
            $iframe.css({
                'width': w + 'px',
                'height': (h - idcH) + 'px',
            });
        },
        frameRotate: function (ev) { // 디바이스 프레임 회전
            var $rotateBtn = $(ev),
                $frame = $('[data-device="target"]'),
                $iframe = $frame.find('iframe'),
                isRotated = $rotateBtn.attr('data-mode');

            var idcH = $frame.find('.indicator').height();

            $('.btn-rotate').removeClass('active')
            $rotateBtn.addClass('active')
            if (isRotated == 'portrait') {
                $frame.removeClass('rotate')
                var sizeW = $frame.attr('data-width'),
                    sizeH = $frame.attr('data-height');
            }
            if (isRotated == 'landscape') {
                $frame.addClass('rotate')
                var sizeW = $frame.attr('data-height'),
                    sizeH = $frame.attr('data-width');
            };

            $frame.css({
                'width': sizeW + 'px',
                'height': sizeH + 'px'
            })
            $iframe.css({
                'width': sizeW + 'px',
                'height': (sizeH - idcH) + 'px',
            });
        },
    }

})();

function customSize() {
    var $target = $('[data-device="target"]');

    var width = $('[data-custom="width"]').val(),
        height = $('[data-custom="height"]').val(),
        size = width + '*' + height;

    $target.attr({
        'data-type': 'custom',
        'data-model': 'custom',
        'data-width': width,
        'data-height': height,
    })

    deviceViewSet.frameChange('custom', 'custom', size);
}



/*
    event
*/
$(document).on('click', '[data-func="mode"][data-mode="default"]', function () {
    $('.device-frame').removeClass('rotate');
    $('iframe[name="frameView"]').removeAttr('style');
    modeSet.toggle($(this))
    // console.log('default')
});

$(document).on('click', '[data-func="mode"][data-mode="device"]', function () {
    $('iframe[name="frameView"]').removeAttr('style');
    modeSet.toggle($(this))
    // console.log('device')

});

$(document).on('click', '[data-option="custom"]', function () {
    customSize();
});

$(document).on('click', '[data-func="rotate"]', function () {
    deviceViewSet.frameRotate($(this))
});

$(document).on('change', '[data-option="device"]', function () {
    var $option = $(this).find("option:selected");

    var dataType = $option.attr('data-type'),
        dataModel = $option.attr('data-model'),
        dataSize = $option.attr('data-size');

    $('iframe[name="frameView"]').removeAttr('style');
    deviceViewSet.frameChange(dataType, dataModel, dataSize);
});

function maxViewSize() {
    var $max = $('.frame-view .max-val');
    var viewW = $('.frame-view').outerWidth();

    $max.text('최대: ' + viewW)

    return viewW;
}

$(document).on('change', '[data-func="viewSize"] input', function () {
    var val = $(this).val();

    if (maxViewSize() >= val) {
        $('.frame-view > .inner').css({
            'width': val + 'px'
        })
    } else {
        alert('최대 크기를 확인해주세요')
    }

});















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
        alert: {
            open: function (_target) {
                if ($(_target).hasClass('active') === true) return;

                if ($(_target).attr('data-animation') == 'off') {
                    $(_target).addClass('active');
                } else {
                    $(_target).addClass('active');
                    setTimeout(function () {
                        $(_target).addClass('ani');
                    });
                }

                // 바디스크롤 제어
                stBodyScroll.lock();

                // 접근성
                $(_target).find('[data-wai-focus="start"]').attr('tabindex', -1).focus();
                // $('.layout').attr('aria-hidden', true);
            },
            close: function (_target) {
                var $thisModal = $(_target).closest('.sl-modal');

                if ($thisModal.hasClass('modal-alert')) {
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
            }
        },
        popup: {
            open: function (_target) {
                if ($(_target).hasClass('active')) return;
                if ($(_target).attr('data-animation') == 'off') {
                    $(_target).addClass('active');
                } else {
                    $(_target).addClass('active');
                    setTimeout(function () {
                        $(_target).addClass('ani');
                    });
                }

                // 바디스크롤 제어
                stBodyScroll.lock();

                // 접근성
                $(_target).find('[data-wai-focus="start"]').attr('tabindex', -1).focus();
                // $('.layout').attr('aria-hidden', true);


            },
            close: function (_target) {
                var $thisModal = $(_target).closest('.sl-modal');
                if ($thisModal.hasClass('modal-popup') === true) {
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
            }
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
                    });
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

                // 테스트모드
                if (typeof ui_testMode !== 'undefined' && ui_testMode) {
                    console.log('------------------------------------------');
                    console.log('target : ' + _target);
                    console.log('scrT : ' + scrT);
                    console.log('spotTitleMvmt2 : ' + spotTitleMvmt);
                }
            }
        },
        bottom: {
            open: function (_target) {
                var $thisModal = $(_target).closest('.sl-modal'),
                    $modalLayer = $thisModal.find('.modal-layer');

                if ($(_target).hasClass('active')) return;
                if ($(_target).attr('data-animation') == 'off') {
                    $(_target).addClass('active');
                    $modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
                    setTimeout(function () {
                        $modalLayer.css('bottom', 0);
                    });
                } else {
                    $(_target).addClass('active');
                    $modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
                    setTimeout(function () {
                        $modalLayer.css('bottom', 0);
                        $(_target).addClass('ani');
                    });
                }

                // 바디스크롤 제어
                stBodyScroll.lock();

                // 접근성
                $(_target).find('[data-wai-focus="start"]').attr('tabindex', -1).focus();
                // $('.layout').attr('aria-hidden', true);
            },
            close: function (_target) {
                var $thisModal = $(_target).closest('.sl-modal'),
                    $modalLayer = $thisModal.find('.modal-layer');

                if ($thisModal.hasClass('modal-bottom')) {
                    /* animation option */
                    // default
                    if ($thisModal.attr('data-animation') == 'off') {
                        $modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
                        $thisModal.removeClass('active on');
                        // 바디스크롤 제어
                        if ($('body').find('.sl-modal.active').length == 0) stBodyScroll.unlock();
                    } else {
                        // animation
                        $thisModal.removeClass('ani');
                        $modalLayer.css('bottom', -stModal.bottom.modalHeight(_target));
                        setTimeout(function () {
                            $thisModal.removeClass('active on');
                            // 바디스크롤 제어
                            if ($('body').find('.sl-modal.active').length == 0) stBodyScroll.unlock();
                        }, 300); //.modal-layer의 transition-duration 만큼 값 넣어서 사용
                    }
                }
            },
            panningStart: function (_event) {
                tsY = _event.originalEvent.changedTouches[0].screenY;
            },
            panningEnd: function (_event) {
                teY = _event.originalEvent.changedTouches[0].screenY;
                var movement = tsY - teY;
                if (movement > 50) {
                    $('body').find('.sl-modal.ty-panning').addClass('on');
                } else if (movement < 0) {
                    $('body').find('.sl-modal.ty-panning').removeClass('on');
                }
            },
            modalHeight: function (_target) {
                /**
                 *  커스텀 셀렉트를 사용 할 경우 애니메이션을 transform으로 조절하면
                    modal-layer에 있는 overflow: hidden; 으로 인해서
                    모달 바깥 커스텀 셀렉트 영역이 안보이는 현상이 있음.
                    그러므로 modla-bottom을 transition으로 이용해 조절하기 위해 필요한 함수
                 */
                var $thisModal = $(_target).closest('.sl-modal');
                var modalH = $thisModal.find('.modal-layer').outerHeight();

                return modalH;
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