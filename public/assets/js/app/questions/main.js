(function($) {
  const Main = {
    start: function() {
      $.getScript('/assets/js/app/questions/list.js');
      $.getScript('/assets/js/app/questions/render-study-objects.js');
      $.getScript('/assets/js/app/questions/reset-modal.js');
      $.getScript('/assets/js/app/questions/submit-form.js');
      $.getScript('/assets/js/app/questions/delete.js');
      $.getScript('/assets/js/app/questions/show-form-edit.js');
      $.getScript('/assets/js/app/questions/options/show-modal.js');
      $.getScript('/assets/js/app/questions/options/new-option-click.js');
      $.getScript('/assets/js/app/questions/options/submit-option.js');
      $.getScript('/assets/js/app/questions/options/delete-option.js');
      $.getScript('/assets/js/app/questions/options/hide-modal.js');
      $.getScript('/assets/js/app/questions/options/edit-option.js');
    },
  };

  $(function() {
    Main.start();
  });   
})(jQuery);