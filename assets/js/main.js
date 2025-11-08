jQuery(window).on('load', function () {
    // HIDE PRELOADER
    $('.preloader').addClass('preloader-hidden')

    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function () {
        $('.hero .animation-container').each(function () {
            var e = $(this)
            setTimeout(function () {
                e.addClass('run-animation')
            }, e.data('animation-delay'))
        })
    }, 900)
})

jQuery(document).ready(function ($) {
    'use strict'

    // ✅ Remove scroll reveal class from toggle content BEFORE scrollReveal runs
    $('.toggle-content .scroll-animated-from-bottom').removeClass(
        'scroll-animated-from-bottom'
    )

    // INIT PARALLAX PLUGIN (only if .hero exists)
    if ($('.hero .background-content.parallax-on').length > 0) {
        $('.hero .background-content.parallax-on').parallax({
            scalarX: 24,
            scalarY: 15,
            frictionX: 0.1,
            frictionY: 0.1,
        })
    }

    // SCROLL TOP BUTTON
    $('.scroll-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 400)
        return false
    })

    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal()
    sr.reveal('.scroll-animated-from-bottom', {
        duration: 600,
        delay: 500,
        origin: 'bottom',
        opacity: 0,
        distance: '20vh',
        viewFactor: 0.4,
        scale: 1,
        useDelay: 'onload',
    })

    // IMAGE CAROUSEL
    $('.image-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        responsive: {
            800: {
                items: 2,
            },
        },
    })

    // HERO/BUTTON ON SCROLL ANIMATING
    function onScrollAnimating() {
        var windowHeight = $('.hero').height(),
            frontContent = $('.hero .front-content'),
            backContent = $('.hero .background-content'),
            navigationButton = $('.navigation-button'),
            scrollOffset,
            calculatedTranslateHeader,
            calculatedOpacityBackground

        function navigationButtonHide() {
            if (calculatedTranslateHeader <= 200) {
                navigationButton.css(
                    'transform',
                    'translateX(' +
                        calculatedTranslateHeader +
                        '%) translateY(-50%)'
                )
            } else if (scrollOffset > windowHeight) {
                navigationButton.css(
                    'transform',
                    'translateX(200%) translateY(-50%)'
                )
            }
        }

        function frontContentOpacity() {
            const portfolio = $('.portfolio')
            if (portfolio.length > 0) {
                const fadeOutPoint = portfolio.offset().top - windowHeight / 1.7

                if (scrollOffset < fadeOutPoint) {
                    const fadeProgress = scrollOffset / fadeOutPoint
                    frontContent.css('opacity', 1 - fadeProgress)
                } else {
                    frontContent.css('opacity', '0')
                }
            }
        }

        function backgroundOpacity() {
            if (calculatedOpacityBackground >= 0) {
                backContent.css('opacity', calculatedOpacityBackground)
            } else if (scrollOffset > windowHeight) {
                backContent.css('opacity', '0')
            }
        }

        function runStep() {
            scrollOffset = $(window).scrollTop()

            if (scrollOffset >= 0) {
                calculatedTranslateHeader = (scrollOffset / windowHeight) * 650
                calculatedOpacityBackground =
                    1 - (scrollOffset / windowHeight) * 1.4

                navigationButtonHide()
                frontContentOpacity()
                // backgroundOpacity()
            }
        }

        $(window).on('resize', function () {
            windowHeight = $('.hero').height()
        })

        $(window).scroll(function () {
            runStep()
        })

        runStep()
    }

    onScrollAnimating()

    // ✅ FIXED TOGGLE DROPDOWNS
    $('.toggle-header').on('click', function () {
        const section = $(this).closest('.toggle-section')
        const content = section.find('.toggle-content')
        const icon = section.find('.toggle-icon')

        if (section.hasClass('open')) {
            content.stop(true, true).slideUp(250)
            icon.text('+')
            section.removeClass('open')
        } else {
            content.stop(true, true).slideDown(250)
            icon.text('–')
            section.addClass('open')
        }
    })
})
