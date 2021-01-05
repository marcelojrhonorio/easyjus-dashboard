(function($) {
  const DeleteOption = {
    start: function() {
      this.$optionTableBody = $('[data-option-table-body]');
      this.$newInput = $('[data-option-new-input]');

      this.bind();
    },

    bind: function () {
      this.$optionTableBody.on('click', '[data-option-btn-delete]', $.proxy(this.onBtnDeleteClick, this));
    },

    onBtnDeleteClick: function(event) {
      event.preventDefault();
      const $btn =  $(event.currentTarget);
      const id =  $.trim($btn.data('id'));

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const deletingOption = $.ajax({
        method: 'DELETE',
        url: `/options/${id}`,
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: {},
          action: 'send',
          dataType: 'json',
        }),
      });

      deletingOption.done($.proxy(this.onDeletingOptionSuccess, this));
      deletingOption.fail($.proxy(this.onDeletingOptionFail, this));
    },

    onDeletingOptionSuccess: function(data) {
      values = data.data;
      $('[data-option-new-wrap]').remove();
      $('[data-option-option]').remove();
      
      for (var i=0; i < values.length; i++) {
        this.$optionTableBody.append(`
          <tr data-option=${values[i].id} data-option-option>
            <td data-td=${values[i].id}>${values[i].description}</td>
            <td data-td=${values[i].id}>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary btn-sm" data-option-btn-delete data-id=${values[i].id}>
                  <i class="fas fa-trash"></i>
                </label>
                <label class="btn btn-secondary btn-sm" data-option-btn-edit data-id=${values[i].id}
                data-iscorrect=${values[i].is_correct}
                data-description="${values[i].description}">
                  <i class="fas fa-edit"></i>
                </label>
              </div>
            </td>
          </tr>
        `);
      }

      this.$newInput.val(0);
    },

    onDeletingOptionFail: function(error) {
      console.log(error);
    },
  };
  $(function() {
    DeleteOption.start();
  });
})(jQuery);