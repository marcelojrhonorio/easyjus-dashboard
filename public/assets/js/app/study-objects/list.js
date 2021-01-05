(function($) {
  const ListStudyObjects = {
    start: function() {
      this.$table = $('[data-table-studyobjects]');
      this.$btnNew = $('[data-btn-new]');
      // this.$formAction = $('[data-studyobjects-form-action]');

      this.$datatable = null;

      this.$modal = $('[data-studyobjects-modal]');

      this.dataTable();
      this.bind();
    },

    bind: function() {
      this.$btnNew.on('click', $.proxy(this.onBtnNewClick, this));
    },

    onBtnNewClick: function(event) {
      event.preventDefault();
      this.$modal.modal('show');
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
          url: '/study-objects/search',
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
            data: 'ordering',
          },
          {
            data: 'title',
          },
          {
            data: 'description',
          },
          {
            data: 'subject',
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
                  data-ordering="${data.ordering}"
                  data-title="${data.title}"
                  data-description="${data.description}"
                  data-subjectid="${data.subject_id}"
                  data-subject="${data.subject}"
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
    ListStudyObjects.start();
  })
  })(jQuery);