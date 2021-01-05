(function($) {
  const Login = {
    start: function() {
      this.$login = $('[data-login-form]');
      this.$email = $('[data-login-email]');
      this.$password = $('[data-login-password]');
      this.$btnLogin = $('[data-login-button]');
      this.$alert = $('[data-login-alert]');
      this.$showPassword = $('[data-login-show-password]');
      this.$hidePassword = $('[data-login-hide-password]');

      this.bind();
    },

    bind: function() {
      this.$btnLogin.on('click', $.proxy(this.onBtnLoginClick, this));
      this.$showPassword.on('click', $.proxy(this.onShowPasswordClick, this));
      this.$hidePassword.on('click', $.proxy(this.onHidePasswordClick, this));
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

    onBtnLoginClick: function(event) {
      event.preventDefault();

      values = this.getValues();

      if('' === values.email) {
        this.showAlert("Por favor, informe um email.", 'danger');
        this.$email.focus();
        return;
      }

      // Validate email.
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (false === pattern.test(values.email)) {
        this.showAlert("Digite um email válido.", 'danger');
        this.$email.focus();
        return;
      }

      if ('' === values.password) {
        this.showAlert("Por favor, informe uma senha.", 'danger');
        this.$password.focus();
        return;
      }

      // Store data Ajax.
      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');
      
      // Call via Ajax.
      const login = $.ajax({
        method: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      login.done($.proxy(this.onLoginSuccess, this));
      login.fail($.proxy(this.onLoginFail, this)); 
    },

    onLoginSuccess: function (data) {
      switch (data.status) {

        case 'login_forbidden':
          this.showAlert("Login não autorizado. Contate o Super Admin.", 'danger');
          break;

        case 'user_not_exists':
          this.showAlert("O usuário não existe. Por favor, cadastre-se primeiro.", 'danger');
          break;

        case 'password_do_not_match':
          this.showAlert("Usuário ou senha incorreta!", 'danger');
          break;

        default: 
          this.showAlert("Sucesso! Redirecionando para a Home...", 'success');
          window.setTimeout(function(){
            window.location.href = '/';
          }, 3000);
      }
    },

    onLoginFail: function (error) {
      console.log(error);
    },

    getValues: function () {
      return {
        email: this.$email.val(),
        password: this.$password.val()
      }
    },

    showAlert: function(msg, type) {
      this.hideAlert();

      if ('danger' === type) {
        this.$alert.addClass('alert-danger');
      }

      if ('success' === type) {
        this.$alert.addClass('alert-success');
      }

      this.$alert.removeClass('sr-only');
      this.$alert.text(msg);
    },

    hideAlert: function () {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-success');
      this.$alert.removeClass('alert-warning');
      this.$alert.text('');
    },
  };
  $(function() {
    Login.start();
  })  
})(jQuery);