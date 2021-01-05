(function($) {
  const SubmitForm = {
    start: function() {
      // Aux Inputs
      this.$studyObjectId = $('[data-studyobjects-id]');
      this.$formAction = $('[data-studyobjects-form-action]');

      // Alert
      this.$alert = $('[data-studyobjects-alert]');

      // Form inputs
      this.$subject = $('[data-studyobjects-subject]');
      this.$ordering = $('[data-studyobjects-ordering]');
      this.$title = $('[data-studyobjects-title]');
      this.$description = $('[data-studyobjects-description]');

      this.$btnConfirm = $('[data-studyobjects-confirm]');

      this.bind();
    },

    bind: function() {
      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));
    },

    resetAlert: function() {
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.addClass('sr-only');
      this.$alert.text('');
    },

    showAlert: function (type, text) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text);
    },

    onCreateSubmit: function() {
      this.resetAlert();
      const values = this.getValues();

      if (0 == values.subject) {
        this.showAlert('alert-danger', 'Por favor, selecione uma disciplina.');
        this.$subject.focus();
        return;
      }

      if('' == values.ordering) {
        this.showAlert('alert-danger', 'Por favor, informe uma ordem de exibição.');
        this.$ordering.focus();
        return;
      }

      if ('' == values.title) {
        this.showAlert('alert-danger', 'Por favor, informe o nome do objeto de estudo.');
        this.$title.focus();
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/study-objects',
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

    onSavingSuccess: function() {
      location.reload();
    },

    onSavingFail: function(error) {
      console.log(error);
    },

    onEditSubmit: function() {
      this.resetAlert();
      const values = this.getValues();

      if (0 == values.subject) {
        this.showAlert('alert-danger', 'Por favor, selecione uma disciplina.');
        this.$subject.focus();
        return;
      }

      if('' == values.ordering) {
        this.showAlert('alert-danger', 'Por favor, informe uma ordem de exibição.');
        this.$ordering.focus();
        return;
      }

      if ('' == values.title) {
        this.showAlert('alert-danger', 'Por favor, informe o nome do objeto de estudo.');
        this.$title.focus();
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const editing = $.ajax({
        method: 'PUT',
        url: '/study-objects/' + this.$studyObjectId.val(),
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      editing.done($.proxy(this.onEditingSuccess, this));
      editing.fail($.proxy(this.onEditingFail, this)); 
    },

    onEditingSuccess: function () {
      location.reload();
    },

    onEditingFail: function (error) {
      console.log(error);
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      switch(this.$formAction.val()) {
        case 'create':
          this.onCreateSubmit();
          break;
        case 'edit':
          this.onEditSubmit();
          break;
      }
    },

    getValues: function() {
      return {
        subject: this.$subject.find(":selected")[0].id,
        ordering: this.$ordering.val(),
        title: this.$title.val(),
        description: this.$description.val()
      }; 
    },
  };
  $(function() {
    SubmitForm.start();
  }) 
})(jQuery);