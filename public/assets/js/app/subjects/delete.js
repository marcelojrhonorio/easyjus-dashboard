(function($) {
  const Delete = {
    start: function() {
      this.$table = $('[data-table-subjects]');

      this.bind();      
    },

    bind: function() {
      this.$table.on('click', '[data-btn-delete]', $.proxy(this.onBtnDeleteClick, this));
    },

    onBtnDeleteClick: function(event) {
      event.preventDefault();
      const $btn = $(event.currentTarget);
      const id   = $.trim($btn.data('id'));

      Swal.fire({
        title: 'Uma vez excluído, não será possível reverter. Tem certeza?',
        showDenyButton: false,
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: `Confirmar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Get csrf token.
          const token = $('meta[name="csrf-token"]').attr('content');

          const destroy = $.ajax({
            method: 'DELETE',
            url: '/subjects/' + id,
            contentType: 'application/json',
            data: JSON.stringify({
              _token: token,
              action: 'send',
              dataType: 'json',
            }),
          });

          destroy.done($.proxy(this.onDestroySuccess, this));
          destroy.fail($.proxy(this.onDestroyFail, this)); 
        }
      });
    },

    onDestroySuccess: function() {
      location.reload();
    },

    onDestroyFail: function(error) {
      console.log(error);
    },

  };
  $(function() {
    Delete.start();
  })    
})(jQuery);