(function($) {
  const Reset = {
    start: function() {
      this.$alert = $('[data-reset-alert]');
      this.$password = $('[data-reset-password]');
      this.$btnShowPassword = $('[data-reset-show-password]');
      this.$btnHidePassword = $('[data-reset-hide-password]');
      this.$passwordConfirmation = $('[data-reset-password-confirmation]');
      this.$btnShowPasswordConfirmation = $('[data-reset-show-password-confirmation]');
      this.$btnHidePasswordConfirmation = $('[data-reset-hide-password-confirmation]');
      this.$btnConfirm = $('[data-reset-btnconfirm]');
      this.$adminUserId = $('[data-reset-admin-id]');

      this.bind();
    },

    bind: function() {
      this.$btnShowPassword.on('click', $.proxy(this.onShowPasswordClick, this));
      this.$btnHidePassword.on('click', $.proxy(this.onHidePasswordClick, this));
      this.$btnShowPasswordConfirmation.on('click', $.proxy(this.onShowPasswordConfirmationClick, this));
      this.$btnHidePasswordConfirmation.on('click', $.proxy(this.onHidePasswordConfirmationClick, this));
      this.$btnConfirm.on('click', $.proxy(this.onBtnConfirmClick, this));
    },

    // Store data.
    onBtnConfirmClick: function (event) {
      event.preventDefault();
      
      this.hideAlert();

      const values = this.getValues();

      if('' == values.password) {
        this.showAlert("Por favor, digite uma senha!", "danger");
        return;
      }

      if('' == values.password_confirmation) {
        this.showAlert("Por favor, digite a confirmação!", "danger");
        return;
      }

      if (values.password != values.password_confirmation) {
        this.showAlert("As senhas não conferem!", "danger");
        return;
      }

      // Store data Ajax.
      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/forgot-password/reset',
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      saving.done($.proxy(this.onSavingSuccess, this));
      saving.fail($.proxy(this.onSavingFail, this));
      
    },

    onSavingSuccess: function(data) {
      this.showAlert("Senha alterada com sucesso! Redirecionando para login...", 'success');
      window.setTimeout(function(){
        window.location.href = '/';
      }, 3000);
    },

    onSavingFail: function(error) {
      console.log(error);
    },

    // Render alert at top of page.
    showAlert: function(msg, type) {
      if ('danger' === type) {
        this.$alert.addClass('alert-danger');
      }

      if ('success' === type) {
        this.$alert.addClass('alert-success');
      }

      this.$alert.removeClass('sr-only');
      this.$alert.text(msg);
      
    },

    // Hide alert.
    hideAlert: function() {
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-success');
      this.$alert.text('');
      this.$alert.addClass('sr-only');
    },

    // Get all values.
    getValues: function () {
      return {
        password: this.$password.val(),
        password_confirmation: this.$passwordConfirmation.val(),
        admin_user_id: this.$adminUserId.val(),
      }
    },

    // Show password confirmation method.
    onShowPasswordConfirmationClick: function (event) {
      event.preventDefault();
      this.$btnShowPasswordConfirmation.addClass('sr-only');
      this.$btnHidePasswordConfirmation.removeClass('sr-only');
      this.$passwordConfirmation.removeAttr('type');
      this.$passwordConfirmation.attr('type', 'text');
    },

    // Hide password confirmation method.
    onHidePasswordConfirmationClick: function (event) {
      event.preventDefault();
      this.$btnHidePasswordConfirmation.addClass('sr-only');
      this.$btnShowPasswordConfirmation.removeClass('sr-only');
      this.$passwordConfirmation.removeAttr('type');
      this.$passwordConfirmation.attr('type', 'password');
    },

    // Show password method.
    onShowPasswordClick: function (event) {
      event.preventDefault();
      this.$btnShowPassword.addClass('sr-only');
      this.$btnHidePassword.removeClass('sr-only');
      this.$password.removeAttr('type');
      this.$password.attr('type', 'text');
    },

    // Hide password method.
    onHidePasswordClick: function(event) {
      event.preventDefault();
      this.$btnHidePassword.addClass('sr-only');
      this.$btnShowPassword.removeClass('sr-only');
      this.$password.removeAttr('type');
      this.$password.attr('type', 'password');
    },
  };
  $(function() {
    Reset.start();
  }) 
})(jQuery);