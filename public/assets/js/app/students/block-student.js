(function($) {
  const BlockStudent = {
    start: function() {
      this.$table = $('[data-table-students]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-lockstudent]', $.proxy(this.onBtnLockStudentClick, this));
    },

    onBtnLockStudentClick: function(event) {
      event.preventDefault();
      const $btn    = $(event.currentTarget);
      const id      = $.trim($btn.data('id'));
      const enabled = $.trim($btn.data('enabled'));

      if (0 == enabled) {
        Swal.fire('Este aluno já foi bloqueado.', '', 'info')
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
          url: '/students/block/' + id,
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
      location.reload();
    },

    onBlockFail: function(error) {
      console.log(error);
    },
  };
  $(function() {
    BlockStudent.start();
  })
})(jQuery);