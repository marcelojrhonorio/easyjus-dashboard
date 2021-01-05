(function($) {
  const BlockUser = {
    start: function() {
      this.$table = $('[data-table-adminusers]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-lockuser]', $.proxy(this.onBtnLockUserClick, this));
    },

    onBtnLockUserClick: function(event) {
      event.preventDefault();
      const $btn    = $(event.currentTarget);
      const id      = $.trim($btn.data('id'));
      const enabled = $.trim($btn.data('enabled'));

      if (0 == enabled) {
        Swal.fire('Este usuário já foi bloqueado.', '', 'info')
        return;
      }

      Swal.fire({
        title: 'Tem certeza?',
        html: 'Para reverter, um email deverá ser enviado para <strong>marcelo.campos.honorio@gmail.com</strong>.',
        showDenyButton: false,
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: `Confirmar`,
      }).then((result) => {
        // Get csrf token.
        const token = $('meta[name="csrf-token"]').attr('content');

        const block = $.ajax({
          method: 'POST',
          url: '/admin-users/block/' + id,
          contentType: 'application/json',
          data: JSON.stringify({
            _token: token,
            action: 'send',
            dataType: 'json',
          }),
        });

        block.done($.proxy(this.onBlockSuccess, this));
        block.fail($.proxy(this.onBlockFail, this));
      });

    },

    onBlockSuccess: function(data) {
      Swal.fire('Usuário bloqueado com sucesso!', '', 'success').then(() => {
        location.reload();
      });
    },

    onBlockFail: function(error) {
      console.log(error);
    }
  };
  $(function() {
    BlockUser.start();
  })
})(jQuery);