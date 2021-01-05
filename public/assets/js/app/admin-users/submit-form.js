(function($) {
  const SubmitForm = {
    start: function() {
      // Modal
      this.$modal = $('[data-adminusers-modal]');
      this.$alert = $('[data-adminusers-alert]');
      this.$fullname = $('[data-adminusers-fullname]');
      this.$email = $('[data-adminusers-email]');
      this.$password = $('[data-adminusers-password]');
      this.$passwordRepeat = $('[data-adminusers-passwordrepeat]');
      this.$btnConfirm = $('[data-adminusers-confirm]');

      this.bind();
    },

    bind: function() {
      this.$btnConfirm.on('click', $.proxy(this.onShowPasswordClick, this));
    },

    onShowPasswordClick: function(event) {
      event.preventDefault();

      this.resetAlert();
      const values = this.getValues();

      /**
       * Validate Inputs
       */
      if ('' === values.fullname) {
        this.showAlert('alert-danger', 'Por favor, informe o nome completo.');
        return;
      }

      if ('' === values.email) {
        this.showAlert('alert-danger', 'Por favor, informe o email.');
        return;
      }

      var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      if (!pattern.test(values.email))
      {
        this.showAlert('alert-danger', 'Por favor, informe um endereço de email válido.');
        return;
      }

      if ('' === values.password) {
        this.showAlert('alert-danger', 'Por favor, informe uma senha.');
        return;
      }

      if ('' === values.password_repeat) {
        this.showAlert('alert-danger', 'Por favor, digite novamente a senha para confirmar.');
        return;
      }

      if (values.password != values.password_repeat) {
        this.showAlert('alert-danger', 'As senhas não correspondem.');
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/register',
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
      this.resetAlert();
      
      switch(data.status) {
        case 'user_already_exists':
          this.showAlert('alert-danger', "O usuário já existe.");
          break;
        default:
          location.reload();
          this.$modal.modal('hide');
      }
    },

    onSavingFail: function(error) {
      console.log(error);
    },

    getValues: function() {
      return {
        fullname: this.$fullname.val(),
        email: this.$email.val(),
        password: this.$password.val(),
        password_repeat: this.$passwordRepeat.val()
      }
    },

    showAlert: function(type, text) {
      this.resetAlert();
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text);
    },

    resetAlert: function() {
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-success');
      this.$alert.removeClass('alert-warning');
      this.$alert.text('');
      this.$alert.addClass('sr-only');
    }

  };
  $(function() {
    SubmitForm.start();
  })  
})(jQuery);