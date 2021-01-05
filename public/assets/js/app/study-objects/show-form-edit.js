(function($) {
  const ShowFormEdit = {
    start: function() {
      this.$table = $('[data-table-studyobjects]');
      this.$modal = $('[data-studyobjects-modal]');
      this.$studyObjectId = $('[data-studyobjects-id]');
      this.$formAction = $('[data-studyobjects-form-action]');

      // Modal Inputs
      this.$subject = $('[data-studyobjects-subject]');
      this.$ordering = $('[data-studyobjects-ordering]');
      this.$title = $('[data-studyobjects-title]');
      this.$description = $('[data-studyobjects-description]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-edit]', $.proxy(this.onBtnEditClick, this));
    },

    onBtnEditClick: function(event) {
      event.preventDefault();
      const $btn         =  $(event.currentTarget);
      const id           =  $.trim($btn.data('id'));
      const subject_id   =  $.trim($btn.data('subjectid'));
      const subject      =  $.trim($btn.data('subject'));
      const ordering     =  $.trim($btn.data('ordering'));
      const title        =  $.trim($btn.data('title'));
      const description  =  $.trim($btn.data('description'));

      this.$studyObjectId.val(id);
      this.$subject.val(subject_id + ' - ' + subject);
      this.$ordering.val(ordering);
      this.$title.val(title);
      this.$description.val(description);

      this.$formAction.val('edit');

      this.$modal.modal('show');

    },
  };
  $(function() {
    ShowFormEdit.start();
  })  
})(jQuery);