(function($) {
  const ChangePassword = {
    start: function() {

      // Modal and show modal.
      this.$modal = $('[data-changepass-modal]');
      this.$btnChange = $('[data-btn-change-password]');

      // Alert.
      this.$alert = $('[data-changepass-alert]');

      // Inputs.
      this.$currentPassword = $('[data-changepass-currentpassword]');
      this.$newPassword = $('[data-changepass-newpassword]');
      this.$newPasswordRepeat = $('[data-changepass-newpasswordrepeat]');

      // Show/Hide Password Buttons.
      // 
      this.$showCurrentPassword = $('[data-changepass-show-current-password]');
      this.$hideCurrentPassword = $('[data-changepass-hide-current-password]');
      // 
      this.$showNewPassword = $('[data-changepass-show-new-password]');
      this.$hideNewPassword = $('[data-changepass-hide-new-password]');
      // 
      this.$showNewPasswordRepeat = $('[data-changepass-show-new-password-repeat]');
      this.$hideNewPasswordRepeat = $('[data-changepass-hide-new-password-repeat]');

      // Confirm Button.
      this.$btnConfirm = $('[data-changepass-confirm]');

      this.bind();
    },

    bind: function() {
      this.$btnChange.on('click', $.proxy(this.onChangePasswordClick, this));
      this.$modal.on('hide.bs.modal', $.proxy(this.onCloseModal, this));
      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));
      // 
      this.$showCurrentPassword.on('click', $.proxy(this.onShowCurrentPasswordClick, this));
      this.$hideCurrentPassword.on('click', $.proxy(this.onHideCurrentPasswordClick, this));
      // 
      this.$showNewPassword.on('click', $.proxy(this.onShowNewPasswordClick, this));
      this.$hideNewPassword.on('click', $.proxy(this.onHideNewPasswordClick, this));
      // 
      this.$showNewPasswordRepeat.on('click', $.proxy(this.onShowNewPasswordRepeatClick, this));
      this.$hideNewPasswordRepeat.on('click', $.proxy(this.onHideNewPasswordRepeatClick, this));
    },

    onHideNewPasswordRepeatClick: function(event) {
      event.preventDefault();
      this.$newPasswordRepeat.removeAttr('type');
      this.$newPasswordRepeat.attr('type', 'password');
      this.$showNewPasswordRepeat.removeClass('sr-only');
      this.$hideNewPasswordRepeat.addClass('sr-only');
    },

    onShowNewPasswordRepeatClick: function(event) {
      event.preventDefault();
      this.$newPasswordRepeat.removeAttr('type');
      this.$newPasswordRepeat.attr('type', 'text');
      this.$showNewPasswordRepeat.addClass('sr-only');
      this.$hideNewPasswordRepeat.removeClass('sr-only');
    },

    onHideNewPasswordClick: function(event) {
      event.preventDefault();
      this.$newPassword.removeAttr('type');
      this.$newPassword.attr('type', 'password');
      this.$showNewPassword.removeClass('sr-only');
      this.$hideNewPassword.addClass('sr-only');
    },

    onShowNewPasswordClick: function(event) {
      event.preventDefault();
      this.$newPassword.removeAttr('type');
      this.$newPassword.attr('type', 'text');
      this.$showNewPassword.addClass('sr-only');
      this.$hideNewPassword.removeClass('sr-only');
    },

    onShowCurrentPasswordClick: function(event) {
      event.preventDefault();
      this.$currentPassword.removeAttr('type');
      this.$currentPassword.attr('type', 'text');
      this.$showCurrentPassword.addClass('sr-only');
      this.$hideCurrentPassword.removeClass('sr-only');
    },

    onHideCurrentPasswordClick: function(event) {
      event.preventDefault();
      this.$currentPassword.removeAttr('type');
      this.$currentPassword.attr('type', 'password');
      this.$showCurrentPassword.removeClass('sr-only');
      this.$hideCurrentPassword.addClass('sr-only');
    },

    onChangePasswordClick: function(event) {
      event.preventDefault();

      this.$modal.modal('show');
    },

    onCloseModal: function() {
      this.resetModal();
    },

    resetModal: function() {
      this.$currentPassword.val('');
      this.$newPassword.val('');
      this.$newPasswordRepeat.val('');

      // back current password hide/show structure
      this.$currentPassword.removeAttr('type');
      this.$currentPassword.attr('type', 'password');
      this.$showCurrentPassword.removeClass('sr-only');
      this.$hideCurrentPassword.addClass('sr-only');

      // back new password hide/show structure
      this.$newPassword.removeClass('type');
      this.$newPassword.attr('type', 'password');
      this.$showNewPassword.removeClass('sr-only');
      this.$hideNewPassword.addClass('sr-only');

      // back new password repeat hide/show structure
      this.$newPasswordRepeat.removeClass('type');
      this.$newPasswordRepeat.attr('type', 'password');
      this.$showNewPasswordRepeat.removeClass('sr-only');
      this.$hideNewPasswordRepeat.addClass('sr-only');

      this.resetAlert();
    },

    resetAlert: function() {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-success');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-danger');
      this.$alert.text('');
    },

    showAlert(type, text) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text)
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      this.resetAlert();

      // Check if current password is empty.
      if ('' === this.$currentPassword.val()) {
        this.$currentPassword.focus();
        this.showAlert('alert-danger', 'Por favor, informe a senha atual.');
        return;
      }

      // Check if new password is empty.
      if ('' === this.$newPassword.val()) {
        this.$newPassword.focus();
        this.showAlert('alert-danger', 'Por favor, informe a nova senha.');
        return;
      }

      // Check if new password confirmation is empty.
      if ('' === this.$newPasswordRepeat.val()) {
        this.$newPasswordRepeat.focus();
        this.showAlert('alert-danger', 'Por favor, confirme a nova senha.');
        return;
      }

      // Check if new passwords don't match.
      if (this.$newPassword.val() != this.$newPasswordRepeat.val()) {
        this.showAlert('alert-danger', 'As novas senhas não correspondem.');
        return;
      }

      // Check if new password is equals current.
      if ((this.$currentPassword.val() == this.$newPassword.val()) && (this.$currentPassword.val() == this.$newPasswordRepeat.val())) {
        this.showAlert('alert-danger', 'A nova senha é igual à atual. Informe uma diferente!');
        return;
      }

      // Get Values.
      values = this.getValues();

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const changingPassword = $.ajax({
        method: 'POST',
        url: '/change-password',
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      changingPassword.done($.proxy(this.onChangePasswordSuccess, this));
      changingPassword.fail($.proxy(this.onChangePasswordFail, this)); 

    },

    onChangePasswordSuccess: function(data) {
      this.resetAlert();
      
      switch (data.status) {
        case 'passwords_not_match': 
          this.showAlert('alert-danger', data.message);
          break;

        case 'unkdown_error':
          this.showAlert('alert-danger', data.message);
          break;

        default:
          this.showAlert('alert-success', data.message);
      }

      window.setTimeout(function(){
        location.reload();
      }, 1500);
    },

    onChangePasswordFail: function(error) {
      console.log(error);
    },

    getValues: function() {
      return {
        current_password: this.$currentPassword.val(),
        new_password: this.$newPassword.val(),
        new_password_repeat: this.$newPasswordRepeat.val(),
      }
    },

  };
  $(function() {
    ChangePassword.start();
  })
})(jQuery);