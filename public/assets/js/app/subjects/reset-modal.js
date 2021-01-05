(function($) {
  const ResetModal = {
    start: function() {
      this.$modal = $('[data-subjects-modal]');
      this.$title = $('[data-subjects-title]');
      this.$alert = $('[data-subjects-alert]');

      this.bind();
    },

    bind: function() {
      this.$modal.on('hide.bs.modal', $.proxy(this.onCloseModal, this));      
    },

    onCloseModal: function() {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.text('');
      this.$title.val('');
    },

  };
  $(function() {
        ResetModal.start();
  })
})(jQuery);