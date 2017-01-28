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
});
