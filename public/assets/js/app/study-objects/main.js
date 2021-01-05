(function($) {
  const Main = {
    start:function() {
      $.getScript('/assets/js/app/study-objects/list.js');
      $.getScript('/assets/js/app/study-objects/submit-form.js');
      $.getScript('/assets/js/app/study-objects/reset-modal.js');
      $.getScript('/assets/js/app/study-objects/show-form-edit.js');
      $.getScript('/assets/js/app/study-objects/delete.js');
    },
  };

  $(function() {
    Main.start();
  });    
})(jQuery);