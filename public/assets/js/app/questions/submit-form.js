(function($) {
  const SubmitForm = {
    start: function() {
      this.$questionsId = $('[data-questions-id]');
      this.$formAction = $('[data-questions-form-action]');
      this.$alert = $('[data-questions-alert]');

      this.$subject = $('[data-questions-subject]');
      this.$studyObject = $('[data-questions-object]');
      this.$description = $('[data-questions-description]');

      this.$btnConfirm = $('[data-questions-confirm]');

      this.bind();
    },

    bind: function() {
      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));
    },

    onFormSubmit: function(event) {
      event.preventDefault();

      this.resetAlert();

      switch(this.$formAction.val()) {
        case 'create':
          this.onCreateSubmit();
          break;
        case 'edit':
          this.onEditSubmit();
          break;
      }
    },

    onCreateSubmit: function() {
      const values = this.getValues();
      
      if ("0" == values.subject_id) {
        this.showAlert('alert-danger', 'Por favor, informe a disciplina');
        this.$subject.focus();
        return;
      }

      if ("0" == values.study_object_id) {
        this.showAlert('alert-danger', 'Por favor, informe o objeto de estudo.');
        this.$studyObject.focus();
        return;
      }

      if ("" == values.description) {
        this.showAlert('alert-danger', 'Por favor, informe escreva a questão.');
        this.$description.focus();
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/questions',
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

    showAlert: function(type, message) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(message);
    },

    resetAlert: function() {
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.addClass('sr-only');
      this.$alert.text('');
    },

    getValues: function() {
      return {
        subject_id: this.$subject.find(":selected")[0].id,
        study_object_id: this.$studyObject.find(":selected")[0].id,
        description: this.$description.val(),
      }
    },

    onEditSubmit: function() {
      const values = this.getValues();
      
      if ("0" == values.subject_id) {
        this.showAlert('alert-danger', 'Por favor, informe a disciplina');
        this.$subject.focus();
        return;
      }

      if ("0" == values.study_object_id) {
        this.showAlert('alert-danger', 'Por favor, informe o objeto de estudo.');
        this.$studyObject.focus();
        return;
      }

      if ("" == values.description) {
        this.showAlert('alert-danger', 'Por favor, informe escreva a questão.');
        this.$description.focus();
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const editing = $.ajax({
        method: 'PUT',
        url: '/questions/' + this.$questionsId.val(),
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

    onEditingSuccess: function() {
      location.reload();
    },
    
    onEditingFail: function(error) {
      console.log(error)
    },
  };
  $(function() {
    SubmitForm.start();
  }) 
})(jQuery);