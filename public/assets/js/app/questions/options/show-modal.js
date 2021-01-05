(function($) {
  const ResetModal = {
    start: function() {
      this.$table = $('[data-table-questions]');
      this.$modal = $('[data-options-modal]');
      this.$question = $('[data-option-question-title]');
      this.$questionId = $('[data-option-question-id]');

      this.$optionTableBody = $('[data-option-table-body]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-options]', $.proxy(this.onBtnOptionsClick, this));
    },

    onBtnOptionsClick: function(event) {
      event.preventDefault();
      const $btn =  $(event.currentTarget);
      const id          =  $.trim($btn.data('id'));
      const description =  $.trim($btn.data('description'));

      this.$question.text(description);
      this.$questionId.val(id);
      
      this.renderOptions(id);
    },

    renderOptions: function (questionId) {

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const gettingOptionsList = $.ajax({
        method: 'POST',
        url: '/options/get-from-question/' + questionId,
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: {},
          action: 'send',
          dataType: 'json',
        }),
      });

      gettingOptionsList.done($.proxy(this.onGettingOptionsListSuccess, this));
      gettingOptionsList.fail($.proxy(this.onGettingOptionsListFail, this));
    },

    onGettingOptionsListSuccess: function (data) {
      values = data.data;
      
      console.log(values);

      $('[data-option-new-wrap]').remove();
      $('[data-option-option]').remove();
      
      for (var i=0; i < values.length; i++) {
        this.$optionTableBody.append(`
          <tr data-option=${values[i].id} data-option-option>
            <td data-td=${values[i].id}>${values[i].description}</td>
            <td data-td=${values[i].id}>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary btn-sm" data-option-btn-delete 
                 data-id=${values[i].id}>
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

      this.$modal.modal('show');      
    },

    onGettingOptionsListFail: function (error) {
      console.log(error);
    },

  };
  $(function() {
    ResetModal.start();
  });
})(jQuery);