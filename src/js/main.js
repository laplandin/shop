$(document).ready(function() {
// slider initialization
  $('.flexslider').flexslider({
    animation: "slide"
  });

  $('.your-class').slick();
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
