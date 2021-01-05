(function($) {
  const SubmitForm = {
    start: function() {

      this.$formAction = $('[data-student-form-action]');
      this.$studentId = $('[data-student-id]');

      this.$modal = $('[data-students-modal]');
      this.$alert = $('[data-students-alert]');
      this.$fullname = $('[data-students-fullname]');
      this.$email = $('[data-students-email]');
      this.$phone = $('[data-students-phone]');
      this.$birthdate = $('[data-students-birthdate]');
      this.$password = $('[data-students-password]');
      this.$passwordRepeat = $('[data-students-passwordrepeat]');
      this.$btnConfirm = $('[data-students-confirm]');

      this.bind();
      this.applyMasks();
    },

    applyMasks: function() {
      this.$phone.mask('(00)00000-0000');
      this.$birthdate.mask('00/00/0000');
    },

    bind: function() {
      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));
    },

    onCreateSubmit: function() {
      this.resetAlert();
      const values = this.getValues();

      if ('' === values.fullname) {
        this.showAlert('alert-danger', 'Por favor, informe o nome completo do aluno.');
        this.$fullname.focus();
        return;
      }

      var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      if (!pattern.test(values.email)) {
        this.showAlert('alert-danger', 'Por favor, informe um email válido para o aluno.');
        this.$email.focus();
        return;
      }

      if ('' === values.email) {
        this.showAlert('alert-danger', 'Por favor, informe o email do aluno.');
        this.$email.focus();
        return;
      }

      if ('' === values.phone) {
        this.showAlert('alert-danger', 'Por favor, informe o celular do aluno.');
        this.$phone.focus();
        return;
      }

      if (values.phone.length < 14) {
        this.showAlert('alert-danger', 'Por favor, informe um celular válido para o aluno.');
        this.$phone.focus();
        return;
      }

      if ('' === values.birthdate) {
        this.showAlert('alert-danger', 'Por favor, informe a data de nascimento do aluno.');
        this.$birthdate.focus();
        return;
      }

      if (values.birthdate.length < 10) {
        this.showAlert('alert-danger', 'Por favor, informe uma data de nascimento válida para o aluno.');
        this.$birthdate.focus();
        return;
      }

      if ('' === values.password) {
        this.showAlert('alert-danger', 'Por favor, informe uma senha para o aluno.');
        this.$password.focus();
        return;
      }

      if ('' === values.password_repeat) {
        this.showAlert('alert-danger', 'Por favor, digite a confirmação de senha do aluno.');
        this.$passwordRepeat.focus();
        return;
      }

      if (values.password != values.password_repeat) {
        this.showAlert('alert-danger', 'As senhas não correspondem.');
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/students',
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

    onEditSubmit: function() {
      const values = this.getValues();

      if ('' === values.fullname) {
        this.showAlert('alert-danger', 'Por favor, informe o nome completo do aluno.');
        this.$fullname.focus();
        return;
      }

      var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      if (!pattern.test(values.email)) {
        this.showAlert('alert-danger', 'Por favor, informe um email válido para o aluno.');
        this.$email.focus();
        return;
      }

      if ('' === values.email) {
        this.showAlert('alert-danger', 'Por favor, informe o email do aluno.');
        this.$email.focus();
        return;
      }

      if ('' === values.phone) {
        this.showAlert('alert-danger', 'Por favor, informe o celular do aluno.');
        this.$phone.focus();
        return;
      }

      if (values.phone.length < 14) {
        this.showAlert('alert-danger', 'Por favor, informe um celular válido para o aluno.');
        this.$phone.focus();
        return;
      }

      if ('' === values.birthdate) {
        this.showAlert('alert-danger', 'Por favor, informe a data de nascimento do aluno.');
        this.$birthdate.focus();
        return;
      }

      if (values.birthdate.length < 10) {
        this.showAlert('alert-danger', 'Por favor, informe uma data de nascimento válida para o aluno.');
        this.$birthdate.focus();
        return;
      }

      if (values.password != values.password_repeat) {
        this.showAlert('alert-danger', 'As senhas se correspondem.');
        return;
      }

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const editing = $.ajax({
        method: 'PUT',
        url: '/students/' + this.$studentId.val(),
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: values,
          action: 'send',
          dataType: 'json',
        }),
      });

      editing.done($.proxy(this.onEditSuccess, this));
      editing.fail($.proxy(this.onEditFail, this)); 
    },

    onEditSuccess: function() {
      location.reload();
    },

    onEditFail: function(error) {
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

    onSavingSuccess: function(data) {
      location.reload();
    },

    onSavingFail: function(error) {
      console.log(error);
    },

    getValues: function() {
      return {
        fullname: this.$fullname.val(),
        email: this.$email.val(),
        phone: this.$phone.val(),
        birthdate: this.$birthdate.val(),
        password: this.$password.val(),
        password_repeat: this.$passwordRepeat.val()
      }
    },

    showAlert: function(type, text) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text);
    },

    resetAlert: function() {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.text('');
    },
  };
  $(function() {
    SubmitForm.start();
  })  
})(jQuery);