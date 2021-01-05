(function($) {
  const SubmitOption = {
    start: function() {
      this.$optionTableBody = $('[data-option-table-body]');
      this.$newInput = $('[data-option-new-input]');
      this.$formAction = $('[data-option-form-action]');
      this.$questionId = $('[data-option-question-id]');
      this.$optionId = $('[data-option-id]');

      this.bind();
    },

    bind: function() {
      this.$optionTableBody.on('click', '[data-option-cancel]', $.proxy(this.onBtnCancelOptionClick, this));
      this.$optionTableBody.on('click', '[data-option-save]', $.proxy(this.onBtnSaveOptionClick, this));
    },

    onBtnCancelOptionClick: function (event) {
      event.preventDefault();
      $('[data-option-new-wrap]').remove();
      this.$newInput.val(0);
    },

    onBtnSaveOptionClick: function (event) {
      event.preventDefault();

      switch(this.$formAction.val()) {
        case "create":
          this.onCreateSubmit();
          break;

        case "edit":
          this.onEditSubmit();
          break;          
      }      
    },

    onCreateSubmit: function() {
      const values = this.getValues();
      $('[data-option-description]').removeClass('is-invalid');

      if ('' === $('[data-option-description]').val()) {
        this.showAlert('Por favor, escreva a alternativa.');
        $('[data-option-description]').focus();
        return;
      }
      
      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/options/',
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      saving.done($.proxy(this.onSavingSuccess, this));
      saving.fail($.proxy(this.onSavingFail, this));      
    },

    onSavingSuccess: function(data) {
      $('[data-option-new-wrap]').remove();
      $('[data-option-option]').remove();
      $('[data-option-btn-edit]').prop('disabled', false);
      $('[data-option-btn-delete]').prop('disabled', false);
      $('[data-option-new]').prop('disabled', false);

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const gettingOptionsList = $.ajax({
        method: 'POST',
        url: '/options/get-from-question/' + this.$questionId.val(),
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

    onGettingOptionsListFail: function (error) {
      console.log(error);
    },    

    onSavingFail: function(error) {
      console.log(error);
    },

    onEditSubmit: function() {

      const values = this.getValues();
      $('[data-option-description]').removeClass('is-invalid');

      if ('' === $('[data-option-description]').val()) {
        this.showAlert('Por favor, escreva a alternativa.');
        $('[data-option-description]').focus();
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const editing = $.ajax({
        method: 'PUT',
        url: `/options/${this.$optionId.val()}`,
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      editing.done($.proxy(this.onSavingSuccess, this));
      editing.fail($.proxy(this.onSavingFail, this));       
      
    },

    getValues: function () {
      return {
        question_id: $('[data-option-question-id]').val(),
        description: $('[data-option-description]').val(),
        is_correct: $('[ data-option-correct]').prop('checked'),
      };
    },

    showAlert: function(message) {
      $('[data-option-description]').addClass('is-invalid');
      $('[data-option-invalid-feedback]').text(message);
    },
  };

  $(function() {
    SubmitOption.start();
  });
})(jQuery);