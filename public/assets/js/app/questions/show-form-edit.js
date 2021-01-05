(function($) {
  const ShowFormEdit = {
    start: function() {
      this.$table = $('[data-table-questions]');

      this.$modal = $('[data-questions-modal]');

      // Auxiliar Modal Inputs
      this.$questionId = $('[data-questions-id]');
      this.$formAction = $('[data-questions-form-action]');

      // Modal Inputs
      this.$subject = $('[data-questions-subject]');
      this.$studyObject = $('[data-questions-object]');
      this.$studyObjectWrap = $('[data-questions-study-object-wrap]');
      this.$description = $('[data-questions-description]');

      // Auxiliar Inputs
      this.$studyObjectId = '';
      this.$studyObjectString = '';

      this.bind();
    },

    bind: function() {
      this.$table.on('click', '[data-btn-edit]', $.proxy(this.onBtnEditClick, this));
    },

    onBtnEditClick: function(event) {
      event.preventDefault();
      const $btn =  $(event.currentTarget);
      const id              =  $.trim($btn.data('id'));
      const description     =  $.trim($btn.data('description'));
      const subject_id      =  $.trim($btn.data('subject_id'));
      const study_object_id =  $.trim($btn.data('study_object_id'));
      const subject         =  $.trim($btn.data('subject'));
      const study_object    =  $.trim($btn.data('study_object'));

      // Store data in auxiliar inputs
      this.$studyObjectId     = study_object_id;
      this.$studyObjectString = study_object;

      this.renderStudyObjects(subject_id);
      this.$formAction.val('edit');
      this.$questionId.val(id);
      this.$description.val(description);
      this.$subject.val(subject_id + ' - ' + subject);

      this.$modal.modal('show');
    },

    renderStudyObjects: function (subject_id) {
      $(".option-study-object").remove();

      // Get csrf token.
      const token = $('meta[name="csrf-token"]').attr('content');

      // Call via Ajax.
      const getStudyObjects = $.ajax({
        method: 'POST',
        url: '/study-objects/get-from-subject/' + subject_id,
        contentType: 'application/json',
        data: JSON.stringify({
          _token: token,
          values: {},
          action: 'send',
          dataType: 'json',
        }),
      });

      getStudyObjects.done($.proxy(this.onGetStudyObjectsSuccess, this));
      getStudyObjects.fail($.proxy(this.onGetStudyObjectsFail, this));
    },

    onGetStudyObjectsSuccess: function(data) {
      const values = data.data;

      if (0 == values.length) {
        this.$studyObjectWrap.addClass('sr-only');
        this.showAlert('alert-danger', 'Para prosseguir, você precisa cadastrar um objeto de estudo para essa disciplina.');
        this.$btnConfirm.prop('disabled', true);
        return;
      }

      for(var i = 0; i < values.length; i++) {
        this.$studyObject.append(`<option class="option-study-object" id='${values[i].id}'>${values[i].title}</option>`)
      }
  
      this.$studyObjectWrap.removeClass('sr-only');
      this.$studyObject.val(this.$studyObjectString);
    },
    
    onGetStudyObjectsFail: function(error) {
      console.log(error);
    },
  };

  $(function() {
    ShowFormEdit.start();
  })
})(jQuery);