(function($) {
  const ListStudents = {
    start: function() {
      this.$table = $('[data-table-students]');
      this.$btnNew = $('[data-btn-new]');
      this.$formAction = $('[data-student-form-action]');

      this.$datatable = null;

      this.$modal = $('[data-students-modal]');

      this.dataTable();
      this.bind();
    },

    bind: function() {
      this.$btnNew.on('click', $.proxy(this.onBtnNewClick, this));
    },

    onBtnNewClick: function(event) {
      event.preventDefault();
      this.$formAction.val('create');
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
          url: '/students/search',
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
            data: 'fullname',
          },
          {
            data: 'email',
          },
          {
            data: 'phone',
          },
          {
            data: 'birthdate',
          },
          {
            data: null,
            width: '20%',
            render: function(data, type, full, meta) {

              const btnResetPassword = `
                <button
                  class="btn btn-outline-dark btn-sm"
                  title="Resetar senha do Aluno"
                  type="button"
                  data-btn-resetpassword
                  data-id="${data.id}"
                  data-name="${data.fullname}"
                  data-email="${data.email}"
                  data-enabled="${data.enabled}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Resetar senha do Aluno</span>
                  <i class="fa fa-key" aria-hidden="true"></i>                        
                </button>
              `;

              const btnLock = `
                <button
                  class="btn btn-outline-warning btn-sm"
                  title="Bloquear Aluno"
                  type="button"
                  data-btn-lockstudent
                  data-id="${data.id}"
                  data-enabled="${data.enabled}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Bloquear Aluno</span>
                  <i class="fa fa-lock" aria-hidden="true"></i>                        
                </button>
              `;

              const btnEdit = `
                <button
                  class="btn btn-outline-secondary btn-sm"
                  title="Editar Aluno"
                  type="button"
                  data-btn-edit
                  data-id="${data.id}"
                  data-fullname="${data.fullname}"
                  data-email="${data.email}"
                  data-phone="${data.phone}"
                  data-birthdate="${data.birthdate}"
                  data-enabled="${data.enabled}"
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

              const buttons = `${btnResetPassword} ${btnLock} ${btnEdit} ${btnDelete} `;

              return buttons;
            },            
          },
        ],
      }) 
    },    
  };
  $(function() {
    ListStudents.start();
  })  
})(jQuery);