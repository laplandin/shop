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
  var counter = 0;

  $('.js-cert-down').on('click', function() {
    if ((counter % 2) === 0 ) {
      event.preventDefault();
      certDiv.css('margin-top', certDivHeight);
      $(this).text('Скрыть');
      counter++;
    } else {
      event.preventDefault();
      certDiv.css('margin-top', '-' + certDivHeight);
      $(this).text('Больше сертификатов');
      counter++;
    }
  });
  // Certificates motion block - end
});
