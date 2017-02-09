$(document).ready(function() {
// slider initialization
  $('#slider-main').flexslider({
    animation: "slide"
  });
  $('#slider-cert').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 300,
    itemMargin: 5,
    minItems: 2,
    maxItems: 3
  });
// slider end
  smoothScroll.init();
// accordion goes here
  jQuery(function() {
    jQuery('.ss_button').on('click',function() {
      if (jQuery(this).next('.ss_content').is(':visible')) {
        jQuery('.ss_content').slideUp('fast');
      } else {
        jQuery('.ss_content').slideUp('fast');
        jQuery(this).next('.ss_content').slideDown('fast');
      }
    });
  });
//accordion end
// Certificates motion block
  var certDiv = $('.certificates-list');
  certDivHeight = certDiv.css('height');
  certDiv.css('margin-top', '-' + certDivHeight);
  var counterCert = 0;

  $('.js-cert-down').on('click', function() {
    if ((counterCert % 2) === 0 ) {
      event.preventDefault();
      certDiv.css('margin-top', '0px');
      $(this).text('Скрыть');
      counterCert++;
    } else {
      event.preventDefault();
      certDiv.css('margin-top', '-' + certDivHeight);
      $(this).text('Больше сертификатов');
      counterCert++;
    }
  });
  // Certificates motion block - end

  // review-form
  $('.js-review-in').on('click', function() {
      event.preventDefault();
      // review.css('margin-top', '0px');
      $(this).text('Отправить');
      $(this).removeClass('js-review-down').addClass('review-submit')
      $('.review-form').removeClass('hide');
      $('.review-submit').on('click', function() {
        $('.review-form form').submit();
      });
  });

  // Certificates motion block - end

  //modal cart widget
  $('#cart').on('click', function(event) {
    //стартует аякс
    event.preventDefault();
    var vidget = $('.cart-widget');
    var parent = vidget.parent();
    vidget.fadeIn();
    vidget.mouseleave(function() {
      setTimeout(function(){
        vidget.fadeOut();
      }, 1000);
    });

    timeoutID = setTimeout(function(){
      vidget.mouseover(function() {
        clearTimeout(timeoutID);
      });
      vidget.fadeOut();
    }, 3000);
  });
  // end modal cart widget
  //показать расширенный поиск по фокусу на инпуте
  $('#search').on('focus', function(event) {
    event.preventDefault();
    var target = $('.extended-search');
    target.slideDown();
    $(this).on('blur', function() {
      target.slideUp();
    });
  });
  // конец показать расширенный поиск по фокусу на инпуте
  function totalCalculate(element) {
    var sum = 0;
    var inCart = $('span.card-item-price');
    inCart.each(function() {
      sum += parseInt($(this).text());
    });
    element.text(sum + ' ');
  }
  totalCalculate($('#purchase-total-price'));
});
