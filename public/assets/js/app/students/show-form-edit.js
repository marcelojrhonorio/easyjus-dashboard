(function($) {
  const ShowFormEdit = {
    start: function() {
      // Aux Inputs
      this.$studentId = $('[data-student-id]');
      this.$formAction = $('[data-student-form-action]');
      // 
      this.$modal = $('[data-students-modal]');
      this.$alert = $('[data-students-alert]');
      this.$fullname = $('[data-students-fullname]');
      this.$email = $('[data-students-email]');
      this.$phone = $('[data-students-phone]');
      this.$birthdate = $('[data-students-birthdate]');
      this.$password = $('[data-students-password]');
      this.$passwordRepeat = $('[data-students-passwordrepeat]');
      // 
      this.$btnShowPassword = $('[data-students-show-password]');
      this.$btnHidePassword = $('[data-students-hide-password]');
      // 
      this.$btnShowPasswordRepeat = $('[data-students-show-password-repeat]');
      this.$btnHidePasswordRepeat = $('[data-students-hide-password-repeat]');
      // 
      this.$table = $('[data-table-students]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-edit]', $.proxy(this.onBtnEditClick, this));
    },

    onBtnEditClick: function(event) {
      event.preventDefault();
      const $btn       =  $(event.currentTarget);
      const id         =  $.trim($btn.data('id'));
      const fullname   =  $.trim($btn.data('fullname'));
      const email      =  $.trim($btn.data('email'));
      const phone      =  $.trim($btn.data('phone'));
      const birthdate  =  $.trim($btn.data('birthdate'));
      const enabled    =  $.trim($btn.data('enabled'));

      this.$studentId.val(id);
      this.$formAction.val('edit');
      this.$fullname.val(fullname);
      this.$email.val(email);
      this.$phone.val(phone);
      this.$birthdate.val(birthdate);

      this.$modal.modal('show');
    },

  };
  $(function() {
    ShowFormEdit.start();
  })  
})(jQuery);