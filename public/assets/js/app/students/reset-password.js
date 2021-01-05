(function($) {
  const ResetPassword = {
    start: function() {
      this.$table = $('[data-table-students]');

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
        Swal.fire('Não é possível resetar a senha de aluno bloqueado.', '', 'info')
        return;
      }

      Swal.fire({
        title: 'Deseja mesmo resetar a senha do aluno? Ele receberá por email um link de redefinição.',
        showDenyButton: false,
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: `Confirmar`,
        }).then((result) => {
          if (result.isConfirmed) {

            // Get csrf token.
            const token = $('meta[name="csrf-token"]').attr('content');

            // Call via Ajax.
            const reset = $.ajax({
              method: 'POST',
              url: '/students/reset-password',
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

          }
      });
    },

    onResetSuccess: function(data) {
      Swal.fire('Reset Realizado!', '', 'success');
    },

    onResetFail: function(error) {
      Swal.fire('Ocorreu um erro desconhecido!', '', 'success');
    },

  };
  $(function() {
    ResetPassword.start();
  })    
})(jQuery);