(function($) {
  const ResetPassword = { 
    start: function() {
      this.$table = $('[data-table-adminusers]');
      
      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-resetpassword]', $.proxy(this.onBtnResetPasswordClick, this));
    },

    onBtnResetPasswordClick: function(event) {
      event.preventDefault();
      const $btn  = $(event.currentTarget);
      const email = $.trim($btn.data('email'));
      const enabled = $.trim($btn.data('enabled'));

      if (0 == enabled) {
        Swal.fire('Reset de senha indisponível para usuários bloqueados.', '', 'info')
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const reset = $.ajax({
        method: 'POST',
        url: '/forgot-password',
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: {email: email},
          action: 'send',
          dataType: 'json',
        }),
      });

      reset.done($.proxy(this.onResetSuccess, this));
      reset.fail($.proxy(this.onResetFail, this));       
    },

    onResetSuccess: function(data) {
      Swal.fire('Reset Realizado!', '', 'success');
    },

    onResetFail: function(error) {
      console.log(error);
    },
    
  };
  $(function() {
    ResetPassword.start();
  })
})(jQuery);