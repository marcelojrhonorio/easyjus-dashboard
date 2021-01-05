(function($) {
  const ShowFormEdit = {
    start: function() {
      // Aux Inputs.
      this.$subjectId = $('[data-subjects-id]');
      this.$formAction = $('[data-subjects-form-action]');
      // 
      this.$modal = $('[data-subjects-modal]');
      this.$title = $('[data-subjects-title]');
      // 
      this.$table = $('[data-table-subjects]');

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-edit]', $.proxy(this.onBtnEditClick, this));
    },

    onBtnEditClick: function(event) {
      event.preventDefault();
      const $btn       =  $(event.currentTarget);
      const id         =  $.trim($btn.data('id'));
      const title      =  $.trim($btn.data('title'));

      this.$subjectId.val(id);
      this.$title.val(title);
      this.$formAction.val('edit');

      this.$modal.modal('show');
    },
  };
  $(function() {
    ShowFormEdit.start();
  })
})(jQuery);