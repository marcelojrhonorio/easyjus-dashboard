(function($) {
  const NewOptionClick = {
    start: function () {
      
      this.$optionTableBody = $('[data-option-table-body]');
      this.$btnNewOption = $('[data-option-new]');

      this.$newInput = $('[data-option-new-input]');

      this.bind();
    },

    bind: function () {
      this.$btnNewOption.on('click', $.proxy(this.onBtnNewClick, this));
    },

    onBtnNewClick: function (event) {
      event.preventDefault();

      if (0 == this.$newInput.val()) {
        this.$optionTableBody.append(`
        <tr data-option-new-wrap>
          <td>
            <input type="text" class=" form-control form-control-sm" data-option-description>
            <div class="invalid-feedback" data-option-invalid-feedback></div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="correct-option" data-option-correct>
              <label class="form-check-label" for="correct-option">Alternativa correta</label>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-toggle buttons-create-wrap" data-options-buttons-create>
              <label class="btn btn-danger btn-sm" data-option-cancel>
                <i class="fas fa-times-circle"></i>
              </label>
              <label class="btn btn-primary btn-sm" data-option-save>
                <i class="fas fa-save"></i>
              </label>
            </div>
          </td>
        </tr>
      `);
      }

      this.$newInput.val(1);
    }
  };
  $(function() {
    NewOptionClick.start();
  });
})(jQuery);