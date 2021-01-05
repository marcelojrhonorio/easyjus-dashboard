(function($) {
  const RenderStudyObjects = {
    start: function() {
      this.$subject = $('[data-questions-subject]');
      this.$studyObject = $('[data-questions-object]');
      this.$studyObjectWrap = $('[data-questions-study-object-wrap]');
      
      this.$alert = $('[data-questions-alert]');
      this.$btnConfirm = $('[data-questions-confirm]');

      this.bind();
    },

    bind: function() {
      this.$subject.on('change', $.proxy(this.onChangeSubject, this));
    },

    onChangeSubject: function() {
      this.resetAlert();
      this.$btnConfirm.prop('disabled', false);

      const subjectId = this.$subject.find(":selected")[0].id;

      $(".option-study-object").remove();

      if (0 != subjectId) {
        // Get csrf token.
        const token = $('meta[name="csrf-token"]').attr('content');

        // Call via Ajax.
        const getStudyObjects = $.ajax({
          method: 'POST',
          url: '/study-objects/get-from-subject/' + subjectId,
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

      } else {
        this.$studyObjectWrap.addClass('sr-only');
      }
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

    },

    showAlert: function(type, text) {
      this.$alert.removeClass('sr-only');
      this.$alert.addClass(type);
      this.$alert.text(text);
    },

    resetAlert: function () {
      this.$alert.addClass('sr-only');
      this.$alert.removeClass('alert-danger');
      this.$alert.removeClass('alert-warning');
      this.$alert.removeClass('alert-success');
      this.$alert.text('');
    },

    onGetStudyObjectsFail: function(error) {
      console.log(error);
    },
  };
  $(function() {
    RenderStudyObjects.start();
  });  
})(jQuery);