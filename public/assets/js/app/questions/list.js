(function($) {
  const ListQuestions = {
    start: function() {
      this.$table = $('[data-table-questions]');
      this.$btnNew = $('[data-btn-new]');
      this.$modal = $('[data-questions-modal]');
      this.$formAction = $('[data-questions-form-action]');

      this.dataTable();
      this.bind();
    },

    bind: function() {
      this.$btnNew.on('click', $.proxy(this.onBtnNewClick, this));
    },

    onBtnNewClick: function(event) {
      event.preventDefault();
      this.$modal.modal('show');
      this.$formAction.val('create');
    },

    dataTable: function() {
      this.$datatable = this.$table.DataTable({
        processing: true,
        serverSide: true,
        pageLength: 25,
        searching: true,
        responsive: true,
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json',
        },
        ajax: {
          url: '/questions/search',
        },
        columns: [
          {
            data: null,
            width: '5%',
            render: function(data, type, full, meta) {
              return `${data.id}`
            },
          },
          {
            data: 'subject',
          },
          {
            data: 'study_object',
          },
          {
            data: 'description',
          },
          {
            data: null,
            width: '15%',
            render: function(data, type, full, meta) {
              return `
                <button
                  class="btn btn-outline-primary btn-sm"
                  title="Alternativas"
                  type="button"
                  data-btn-options
                  data-id="${data.id}"
                  data-description="${data.description}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Alternativas</span>
                  <i class="far fa-check-square"></i> <strong> ${data.options} </strong>
                </button>
              `;
            },
          },
          {
            data: null,
            width: '15%',
            render: function(data, type, full, meta) {
              const btnEdit = `
                <button
                  class="btn btn-outline-secondary btn-sm"
                  title="Editar Aluno"
                  type="button"
                  data-btn-edit
                  data-id="${data.id}"
                  data-description="${data.description}"
                  data-subject_id="${data.subject_id}"
                  data-study_object_id="${data.study_object_id}"
                  data-subject="${data.subject}"
                  data-study_object="${data.study_object}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Editar Aluno</span>
                  <i class="fa fa-pen" aria-hidden="true"></i>                        
                </button>
              `;

              const btnDelete = `
                <button
                  class="btn btn-outline-danger btn-sm"
                  title="Excluir Aluno"
                  type="button"
                  data-btn-delete
                  data-id="${data.id}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Excluir Aluno</span>
                  <i class="fa fa-trash" aria-hidden="true"></i>                        
                </button>
              `;

              const buttons = `${btnEdit} ${btnDelete} `;

              return buttons;
            },
          },           
        ],
      });
    },
  };
  $(function() {
    ListQuestions.start();
  })
})(jQuery);