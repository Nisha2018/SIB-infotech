// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}


// mobile view
if (screen.width <= 800) {

    function parallaxScroll(evt) {
        var touchobj = evt.changedTouches[0];
        var dist = parseInt(touchobj.clientY) - startY;

        if (ticking != true) {
            if (dist <= -scrollSensitivitySetting) {
                //Down scroll
                ticking = true;
                if (currentSlideNumber !== totalSlideNumber - 1) {
                    currentSlideNumber++;
                    nextItem();
                }
                slideDurationTimeout(slideDurationSetting);
            }
            if (dist >= scrollSensitivitySetting) {
                //Up scroll
                if (window.scrollY == 0) {
                    disableScroll();
                    ticking = true;
                    if (currentSlideNumber !== 0) {
                        currentSlideNumber--;
                    }
                    previousItem();
                    slideDurationTimeout(slideDurationSetting);
                }
            }

            if (currentSlideNumber === 1) {
                console.log("enable");
                setTimeout(() => { enableScroll(); }, 60);
            }
        }

    }

        function disableScroll() {
            // Get the current page scroll position 
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

                // if any scroll is attempted, set this to the previous value 
                window.onscroll = function() {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        }

        function enableScroll() {
            window.onscroll = function() {};
        }


        // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
        function slideDurationTimeout(slideDuration) {
            setTimeout(function() {
                ticking = false;
            }, slideDuration);
        }

        // ------------- SLIDE MOTION ------------- //

        function nextItem() {
            var $previousSlide = $(".background").eq(currentSlideNumber - 1);
            $previousSlide.removeClass("up-scroll").addClass("down-scroll");
        }

        function previousItem() {
            var $currentSlide = $(".background").eq(currentSlideNumber);
            $currentSlide.removeClass("down-scroll").addClass("up-scroll");
        }

        var startY = 0;

        var dist = 0;
        window.addEventListener('load', function() {
            window.addEventListener('touchstart', function(e) {
                var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
                startY = parseInt(touchobj.clientY); // get x position of touch point relative to left edge of browser
                e.preventDefault();
            }, false);
            window.addEventListener('touchmove', _.throttle(parallaxScroll, 60), false);
        }, false);
        disableScroll();


    }


// works slider

const slider = document.querySelector('.work-slider');
const slides = document.querySelectorAll('.slide');
var i = 0;

function nextSlide() {
  slides[i].classList.remove('active');
  i = (i + 1) % slides.length;
  slides[i].classList.add('active');
}

function prevSlide() {
  slides[i].classList.remove('active');
  i = (i - 1 + slides.length) % slides.length;
  slides[i].classList.add('active');
}

