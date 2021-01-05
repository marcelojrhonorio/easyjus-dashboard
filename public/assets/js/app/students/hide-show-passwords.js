(function($) {
  const HideShowPasswords = {
    start: function() {
      this.$password = $('[data-students-password]');
      this.$passwordRepeat = $('[data-students-passwordrepeat]');
      // 
      this.$btnShowPassword = $('[data-students-show-password]');
      this.$btnHidePassword = $('[data-students-hide-password]');
      // 
      this.$btnShowPasswordRepeat = $('[data-students-show-password-repeat]');
      this.$btnHidePasswordRepeat = $('[data-students-hide-password-repeat]');

      this.bind();
    },

    bind: function() {
      this.$btnShowPassword.on('click', $.proxy(this.onShowPasswordClick, this));
      this.$btnHidePassword.on('click', $.proxy(this.onHIdePasswordClick, this));
      this.$btnShowPasswordRepeat.on('click', $.proxy(this.onShowPasswordRepeatClick, this));
      this.$btnHidePasswordRepeat.on('click', $.proxy(this.onHidePasswordRepeatClick, this));
    },
    
    onShowPasswordClick: function(event) {
      event.preventDefault();

      this.$password.removeAttr('type');
      this.$password.attr('type', 'text');
      this.$btnShowPassword.addClass('sr-only');
      this.$btnHidePassword.removeClass('sr-only');
    },

    onHIdePasswordClick: function(event) {
      event.preventDefault();

      this.$password.removeAttr('type');
      this.$password.attr('type', 'password');
      this.$btnShowPassword.removeClass('sr-only');
      this.$btnHidePassword.addClass('sr-only');
    },

    onShowPasswordRepeatClick: function(event) {
      event.preventDefault();

      this.$passwordRepeat.removeAttr('type');
      this.$passwordRepeat.attr('type', 'text');
      this.$btnShowPasswordRepeat.addClass('sr-only');
      this.$btnHidePasswordRepeat.removeClass('sr-only');
    },

    onHidePasswordRepeatClick: function(event) {
      event.preventDefault();

      this.$passwordRepeat.removeAttr('type');
      this.$passwordRepeat.attr('type', 'password');
      this.$btnShowPasswordRepeat.removeClass('sr-only');
      this.$btnHidePasswordRepeat.addClass('sr-only');
    },
    
  };    
  $(function() {
    HideShowPasswords.start();
  })
})(jQuery);