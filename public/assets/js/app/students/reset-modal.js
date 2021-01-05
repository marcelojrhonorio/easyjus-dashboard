(function($) {
  const ResetModal = {
    start: function() {
      this.$modal = $('[data-students-modal]');
      this.$alert = $('[data-students-alert]');
      this.$fullname = $('[data-students-fullname]');
      this.$email = $('[data-students-email]');
      this.$phone = $('[data-students-phone]');
      this.$birthdate = $('[data-students-birthdate]');
      this.$password = $('[data-students-password]');
      this.$passwordRepeat = $('[data-students-passwordrepeat]');
      // 
      this.$btnShowPassword = $('[data-students-show-password]');
      this.$btnHidePassword = $('[data-students-hide-password]');
      // 
      this.$btnShowPasswordRepeat = $('[data-students-show-password-repeat]');
      this.$btnHidePasswordRepeat = $('[data-students-hide-password-repeat]');

      this.bind();
    },

    bind: function() {
      this.$modal.on('hide.bs.modal', $.proxy(this.onCloseModal, this));
    },
    
    onCloseModal: function() {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-success');
      this.$alert.removeClass('alert-warning');
      this.$alert.text('');
      this.$fullname.val('');
      this.$email.val('');
      this.$phone.val('');
      this.$birthdate.val('');
      this.$password.val('');
      this.$passwordRepeat.val('');
      this.$password.removeAttr('type');
      this.$password.attr('type', 'password');
      this.$btnShowPassword.removeClass('sr-only');
      this.$btnHidePassword.addClass('sr-only');
      this.$passwordRepeat.removeAttr('type');
      this.$passwordRepeat.attr('type', 'password');
      this.$btnShowPasswordRepeat.removeClass('sr-only');
      this.$btnHidePasswordRepeat.addClass('sr-only');
    },
  };
  $(function() {
    ResetModal.start();
  })
})(jQuery);