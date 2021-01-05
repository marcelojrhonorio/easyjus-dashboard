(function($) {
    const Forgot = {
      start: function() {
        this.$email = $('[data-forgot-email]');
        this.$btnConfirm = $('[data-forgot-btnconfirm]');
        this.$alert = $('[data-forgot-alert]');

        this.bind();
      },
  
      bind: function() {
        this.$btnConfirm.on('click', $.proxy(this.onBtnForgotClick, this));
      },

      onBtnForgotClick: function(event) {
        event.preventDefault();

        this.hideAlert();

        if ('' === this.$email.val()) {
          this.showAlert("Por favor, informe um email.", "danger");
          this.$email.focus();
          return;
        }

        // Validate email.
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (false === pattern.test(this.$email.val())) {
          this.showAlert("Digite um email válido.", 'danger');
          this.$email.focus();
          return;
        }        

        values = this.getValues();

        const token = $('meta[name="csrf-token"]').attr('content');

        // Call via Ajax.
        const forgotPassword = $.ajax({
          method: 'POST',
          url: '/forgot-password',
          contentType: 'application/json',
          data: JSON.stringify({
            _token: token,
            values: values,
            action: 'send',
            dataType: 'json',
          }),
        });

        forgotPassword.done($.proxy(this.onForgotSuccess, this));
        forgotPassword.fail($.proxy(this.onForgotFail, this)); 
      },

      onForgotSuccess: function(data) {
        this.hideAlert();
        switch (data.status) {
          case 'admin_user_not_exists': 
            this.showAlert("Usuário desse email não localizado na base de dados.", 'danger');
            break;

          default: 
            this.showAlert("Você receberá o email de redefinição de senha. Aguarde...", 'success');
            window.setTimeout(function(){
              window.location.href = '/';
            }, 3000);
        }
      },

      onForgotFail: function(data) {
        console.log(data);
      },

      showAlert(text, type) {
        this.hideAlert();

        this.$alert.removeClass('sr-only');
        
        if ('success' === type) {
          this.$alert.addClass('alert-success');
        }

        if ('danger' === type) {
          this.$alert.addClass('alert-danger');
        }

        if('warning' === type) {
          this.$alert.addClass('alert-danger');
        }

        this.$alert.text(text);
      },

      hideAlert: function () {
        this.$alert.removeClass('alert-danger');
        this.$alert.removeClass('alert-success');
        this.$alert.removeClass('alert-warning');
        this.$alert.text('');
        this.$alert.addClass('sr-only');
      },

      getValues: function() {
        return {
          email: this.$email.val()
        }
      },
  
    };
    $(function() {
      Forgot.start();
    })  
  })(jQuery);