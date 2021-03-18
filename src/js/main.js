$(document).ready(function () {
    /* Sticky menu */
    var stickyNav = $(".nav-container");
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            stickyNav.addClass("f-nav");
        } else {
            stickyNav.removeClass("f-nav");
        }
    });

    // Dropdown menu
    $("li.has_submenu").hover(
        function () {
            $(this).children(".submenu").show();
        },
        function () {
            $(this).children(".submenu").hide();
        }
    );
    $(".has_submenu-full-width").hover(
        function () {
            $(this).children(".submenu").show().css("display", "flex");
        },
        function () {
            $(this).children(".submenu").hide();
        }
    );

//Hero section Slider

    $('.c-hero-section_slider').slick({
        slidesToShow: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });
    $('.c-client-section_slider').slick({
        slidesToShow: 4,
        infinite: true,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='icon-arrow_back_ios' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='icon-arrow_forward_ios' aria-hidden='true'></i></button>",
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]

    });
    // Animate main-page
    // Check if element is scrolled into view
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    // If element is scrolled into view, fade it in
    $(window).scroll(function () {
        $(".c-hero-section_icons .c-hero-section_icons-item").each(function () {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass("animate__animated animate__backInDown");
            }
        });
        $(".c-products-section_header h4").each(function () {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass("animate__animated animate__fadeInLeft");
            }
        });
        $(".c-products-section_header .animate-text").each(function () {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass("animate__animated animate__fadeInRight");
            }
        });
        $(".c-products-section_items .c-products-section_items-item").each(function () {
            if (isScrolledIntoView(this) === true) {
                $(this).addClass("animate__animated animate__fadeIn");
            }
        });
    });

    // Products section hover item
    $(".c-products-section_items-item_hover-content").hide();
    $('.c-products-section_items-item').mouseenter(function () {
        $(this).children(".c-products-section_items-item-header").hide();
        $(this).children(".c-products-section_items-item_hover-content").show();
        $('.c-products-section_items-item').mouseleave(function () {
            $(this).children(".c-products-section_items-item_hover-content").hide();
            $(this).children(".c-products-section_items-item-header").show();

        });

    });


    // Mobile menu //
    var $mobileMenu = $("#mobile-menu").mmenu({
        extensions: [
            "pagedim-black",
            "theme-black",
        ],
        "navbars": [
            {
                "position": "top",
                "content": [
                    "searchfield"
                ]
            }
        ],
        navbar: {
            title: "<img src=\"images/logo/logo-header.svg\" alt=\"Logo\">",

        },
        slidingSubmenus: false,
    });

    var $icon = $(".hamburger");
    var menuAPI = $mobileMenu.data("mmenu");

    $icon.on("click", function () {
        menuAPI.open();

        menuAPI.bind("open:finish", function () {
            setTimeout(function () {
                $icon.addClass("is-active");
            }, 100);
        });
        menuAPI.bind("close:finish", function () {
            setTimeout(function () {
                $icon.removeClass("is-active");
            }, 100);
        });
    });

    // Pop-up Form

    $(".popup-with-form").magnificPopup({
        type: "inline",
        focus: "#name",

        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = "#name";
                }
            },
        },
    });

    // Scroll to Top
    var $toTop = $(".toTop");
    $toTop.click(function () {
        $("body,html").animate({scrollTop: 0}, 800);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $toTop.fadeIn();
        } else {
            $toTop.fadeOut();
        }
    });
});
