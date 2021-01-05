(function($) {
  const ResetModal = {
    start: function() {
      this.$modal = $('[data-studyobjects-modal]');
      this.$alert = $('[data-studyobjects-alert]');
      this.$subject = $('[data-studyobjects-subject]');
      this.$ordering = $('[data-studyobjects-ordering]');
      this.$title = $('[data-studyobjects-title]');
      this.$description = $('[data-studyobjects-description]');

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
      this.$subject.prop('selectedIndex', 0);
      this.$ordering.val('');
      this.$title.val('');
      this.$description.val('');
    },
  };
  $(function() {
    ResetModal.start();
  })    
})(jQuery);