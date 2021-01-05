(function($) {
  const Main = {
    start: function() {
      $.getScript('/assets/js/app/subjects/list.js');
      $.getScript('/assets/js/app/subjects/submit-form.js');
      $.getScript('/assets/js/app/subjects/delete.js'); 
      $.getScript('/assets/js/app/subjects/reset-modal.js');
      $.getScript('/assets/js/app/subjects/show-form-edit.js'); 
    },
  };
    
  $(function() {
    Main.start();
  });
})(jQuery);