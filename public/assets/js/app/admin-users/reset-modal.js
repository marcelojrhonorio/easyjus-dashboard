(function($) {
  const ResetModal = {
    start: function() {
      // Modal
      this.$modal = $('[data-adminusers-modal]');
      this.$alert = $('[data-adminusers-alert]');
      this.$fullname = $('[data-adminusers-fullname]');
      this.$email = $('[data-adminusers-email]');
      this.$password = $('[data-adminusers-password]');
      this.$passwordRepeat = $('[data-adminusers-passwordrepeat]');
      // 
      this.$btnShowPassword = $('[data-adminusers-show-password]');
      this.$btnHidePassword = $('[data-adminusers-hide-password]');
      // 
      this.$btnShowPasswordRepeat = $('[data-adminusers-show-password-repeat]');
      this.$btnHidePasswordRepeat = $('[data-adminusers-hide-password-repeat]');

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