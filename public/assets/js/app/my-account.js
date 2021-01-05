(function($) {
  const MyAccount = {
    start: function() {
      this.$fullname = $('[data-myaccount-fullname]');
      this.$btn = $('[data-myaccount-btnsubmit]');
      this.$alert = $('[data-myaccount-alert]');

      this.bind();
    },

    bind: function() {
      this.$btn.on('click', $.proxy(this.onBtnConfirmClick, this));
    },

    onBtnConfirmClick: function(event) {
      event.preventDefault();

      // Get Form Data.
      const values = this.getValues();

      // Get CSRF Token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call Controller via Ajax.
      const saving = $.ajax({
        method: 'POST',
        url: '/my-account',
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
      this.resetAlert();

      if ('nothing_changed' == data.status) {
        this.showAlert('alert-warning', 'Nada foi alterado.');
        return;
      }

      this.showAlert('alert-success', 'Sucesso!');

      window.setTimeout(function(){
        window.location.href = '/';
      }, 1500);

    },

    onSavingFail: function(error) {
      console.log(error);
    },

    getValues: function() {
      return {
        fullname: this.$fullname.val(),
      }
    },

    resetAlert: function() {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.text('');
    },

    showAlert: function(type, msg) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(msg);
    },
  
  };

  $(function() {
    MyAccount.start();
  })
})(jQuery);