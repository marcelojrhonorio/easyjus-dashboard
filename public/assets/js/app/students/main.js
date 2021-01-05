(function($) {
  const Main = {
    start: function() {
      $.getScript('/assets/js/app/students/list.js');
      $.getScript('/assets/js/app/students/submit-form.js');
      $.getScript('/assets/js/app/students/hide-show-passwords.js');
      $.getScript('/assets/js/app/students/reset-modal.js');
      $.getScript('/assets/js/app/students/delete.js');
      $.getScript('/assets/js/app/students/show-form-edit.js');
      $.getScript('/assets/js/app/students/reset-password.js');
      $.getScript('/assets/js/app/students/block-student.js');
    },
  };
  
  $(function() {
    Main.start();
  });
})(jQuery);