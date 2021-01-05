(function($) {
  const ResetModal = {
    start: function() {
      this.$modal = $('[data-questions-modal]');

      // Aux inputs
      this.$questionId = $('[data-questions-id]');
      this.$formAction = $('[data-questions-form-action]');
      this.$alert = $('[data-questions-alert]');

      // 
      this.$subject = $('[data-questions-subject]');
      this.$studyObjectsWrap = $('[data-questions-study-object-wrap]');
      this.$studyObject = $('[data-questions-object]');
      this.$description = $('[data-questions-description]');

      this.bind();
    },

    bind: function () {
      this.$modal.on('hide.bs.modal', $.proxy(this.onCloseModal, this));
    },

    onCloseModal: function() {
      $(".option-study-object").remove();
      this.$studyObjectsWrap.addClass('sr-only');
      this.$subject.prop('selectedIndex', 0);
      this.$studyObject.prop('selectedIndex', 0);
      this.$description.val('');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.addClass('sr-only');
      this.$alert.text('');
    },
  };
  $(function() {
    ResetModal.start();
  }); 
})(jQuery);