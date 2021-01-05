(function($) {
  const Main = {
    start: function() {
      $.getScript('/assets/js/app/admin-users/list.js');
      $.getScript('/assets/js/app/admin-users/hide-show-passwords.js');
      $.getScript('/assets/js/app/admin-users/reset-modal.js');
      $.getScript('/assets/js/app/admin-users/submit-form.js');
      $.getScript('/assets/js/app/admin-users/delete.js');
      $.getScript('/assets/js/app/admin-users/reset-password.js');
      $.getScript('/assets/js/app/admin-users/block-user.js');
    },
  };

  $(function() {
    Main.start();
  });
})(jQuery);