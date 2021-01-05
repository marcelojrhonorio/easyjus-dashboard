(function($) {
  const EditOption = {
    start: function() {
      this.$optionTableBody = $('[data-option-table-body]');
      this.$formAction = $('[data-option-form-action]');
      this.$optionId = $('[data-option-id]');
      this.bind();
    },

    bind: function() {
      this.$optionTableBody.on('click', '[data-option-btn-edit]', $.proxy(this.onBtnEditOptionClick, this));
    },

    onBtnEditOptionClick: function (event) {
      event.preventDefault();
      const $btn =  $(event.currentTarget);
      const id   =  $.trim($btn.data('id'));
      const is_correct =  $.trim($btn.data('iscorrect'));
      const description =  $.trim($btn.data('description'));

      var correct = "";

      if(1 == is_correct) {
        correct = "checked";
      }

      this.$formAction.val('edit');
      this.$optionId.val(id);

      $('[data-option-btn-edit]').prop('disabled', true);
      $('[data-option-btn-delete]').prop('disabled', true);
      $('[data-option-new]').prop('disabled', true);

      $(`[data-td=${id}]`).remove();
      $(`[data-option=${id}]`).append(`
        <td>
          <input type="text" class="form-control form-control-sm" data-option-description value="${description}">
          <div class="invalid-feedback" data-option-invalid-feedback></div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="correct-option" ${correct} data-option-correct>
            <label class="form-check-label" for="correct-option">Alternativa correta</label>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-toggle buttons-create-wrap" data-options-buttons-create>
            <label class="btn btn-primary btn-sm" data-option-save>
              <i class="fas fa-save"></i>
            </label>
          </div>
        </td>`);
    },
  };
  $(function() {
    EditOption.start();
  });
})(jQuery);