(function($) {
  const SubmitForm = {
    start: function () {

      this.$formAction = $('[data-subjects-form-action]');
      this.$subjectId = $('[data-subjects-id]');      

      this.$title = $('[data-subjects-title]');
      this.$btnConfirm = $('[data-subjects-confirm]');

      this.$alert = $('[data-subjects-alert]');

      this.bind();
    },

    bind: function() {
      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));      
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

    showAlert: function(type, text) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text);
    },

    resetAlert: function() {
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.addClass('sr-only');
      this.$alert.text('');
    },

    onCreateSubmit: function() {
      this.resetAlert();
      const values = this.getValues();

      if ('' === values.title) {
        this.showAlert('alert-danger', 'Por favor, informe o nome da disciplina');
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/subjects',
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
      location.reload();
    },

    onSavingFail: function(error) {
      console.log(error);
    },

    onEditSubmit: function() {
      const values = this.getValues();

      if ('' === values.title) {
        this.showAlert('alert-danger', 'Por favor, informe o nome da disciplina');
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const editing = $.ajax({
        method: 'PUT',
        url: '/subjects/' + this.$subjectId.val(),
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
      console.log(error);
    },

    getValues: function() {
      return {
        title: this.$title.val(),
      }
    },
  };

  $(function() {
    SubmitForm.start();
  })
})(jQuery);