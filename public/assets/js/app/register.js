(function($) {
  const Register = {
    start: function() {
      this.$fullname = $('[data-register-fullname]');
      this.$email = $('[data-register-email]');
      this.$password = $('[data-register-password]');
      this.$passwordConfirmation = $('[data-register-password-confirmation]');
      this.$showPassword = $('[data-register-show-password]');
      this.$hidePassword = $('[data-register-hide-password]');
      this.$showPasswordConfirmation = $('[data-register-show-password-confirmation]');
      this.$hidePasswordConfirmation = $('[data-register-hide-password-confirmation]');
      this.$btnConfirm = $('[data-register-btn-confirm]');
      this.$alert = $('[data-register-alert]');
      this.$terms = $('[data-register-terms]');

      this.bind();
    },

    bind: function() {
      this.$showPassword.on('click', $.proxy(this.onShowPasswordClick, this));
      this.$hidePassword.on('click', $.proxy(this.onHidePasswordClick, this));
      this.$showPasswordConfirmation.on('click', $.proxy(this.onShowPasswordConfirmationClick, this));
      this.$hidePasswordConfirmation.on('click', $.proxy(this.onHidePasswordConfirmationClick, this));
      this.$btnConfirm.on('click', $.proxy(this.onBtnConfirmClick, this));
    },

    // Show password method.
    onShowPasswordClick: function(event) {
      event.preventDefault();
      this.$showPassword.addClass('sr-only');
      this.$hidePassword.removeClass('sr-only');
      this.$password.removeAttr('type');
      this.$password.attr('type', 'text');
    },

    // Hide password method.
    onHidePasswordClick: function(event) {
      event.preventDefault();
      this.$hidePassword.addClass('sr-only');
      this.$showPassword.removeClass('sr-only');
      this.$password.removeAttr('type');
      this.$password.attr('type', 'password');
    },

    // Show password confirmation.
    onShowPasswordConfirmationClick: function(event) {
      event.preventDefault();
      this.$showPasswordConfirmation.addClass('sr-only');
      this.$hidePasswordConfirmation.removeClass('sr-only');
      this.$passwordConfirmation.removeAttr('type');
      this.$passwordConfirmation.attr('type', 'text');
    },

    // Hide password confirmation.
    onHidePasswordConfirmationClick: function(event) {
      event.preventDefault();
      this.$hidePasswordConfirmation.addClass('sr-only');
      this.$showPasswordConfirmation.removeClass('sr-only');
      this.$passwordConfirmation.removeAttr('type');
      this.$passwordConfirmation.attr('type', 'password');
    },

    // Store new user in database. 
    onBtnConfirmClick: function(event) {
      event.preventDefault();
      
      // Get all form data.
      const values = this.getValues();

      // Hide Alert.
      this.hideAlert();

      // Validate Fullname.
      if ('' == values.fullname) {
        this.showAlert("Por favor, informe o nome.", 'danger');
        this.$fullname.focus();
        return;
      }

      // Validate email.
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (false === pattern.test(values.email)) {
        this.showAlert("Digite um email válido.", 'danger');
        this.$email.focus();
        return;
      }

      // Validate Password.
      if ('' == values.password) {
        this.showAlert("Digite uma senha.", 'danger');
        this.$password.focus();
        return;
      }

      // Validate Password Confirmation.
      if ('' == values.password_confirmation) {
        this.showAlert("Digite a confirmação de senha.", 'danger');
        this.$passwordConfirmation.focus();
        return;
      }

      // Verify if passwords match.
      if (values.password != values.password_confirmation) {
        this.showAlert("As senhas não correspondem.", 'danger');
        this.$passwordConfirmation.focus();
        return;
      }

      // Verify if conditions and termos is checked.
      if (false == this.$terms.prop('checked')) {
        this.showAlert("É necessário concordar com os termos e condições.", 'danger');
        this.$terms.focus();
        return;
      }

      // Store data Ajax.
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

    // Redirect user to login page if success.
    onSavingSuccess: function(data) {
      this.hideAlert();
      
      switch(data.status) {
        case 'user_already_exists':
          this.showAlert("O usuário já existe.", 'danger');
          break;
        default:
          this.showAlert("Usuário cadastrado com sucesso! Redirecionando para login...", 'success');
          window.setTimeout(function(){
            window.location.href = '/';
          }, 3000);
      }
    },

    // Display error message after try store data.
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

    // Get all input values.
    getValues: function() {
      return {
        fullname: this.$fullname.val(),
        email: this.$email.val(),
        password: this.$password.val(),
        password_confirmation: this.$passwordConfirmation.val()
      }
    },
  };

  $(function() {
    Register.start();
  })  
})(jQuery);