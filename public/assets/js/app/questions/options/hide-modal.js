(function($) {
  const HideModal = {
    start: function () {
      this.$modal = $('[data-options-modal]');
      this.$btnConfirm = $('[data-options-confirm]');

      this.bind();
    },

    bind: function () {
      this.$modal.on('hide.bs.modal', $.proxy(this.onCloseModal, this));
      this.$btnConfirm.on('click', $.proxy(this.onCloseModal, this));
    },

    onCloseModal: function (event) {
      event.preventDefault();
      location.reload();
    },
  };
  $(function() {
    HideModal.start();
  });    
})(jQuery);