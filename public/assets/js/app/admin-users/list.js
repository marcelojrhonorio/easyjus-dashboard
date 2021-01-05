(function($) {
  const ListAdminUsers = {
    start: function() {
      this.$table = $('[data-table-adminusers]');
      this.$btnNew = $('[data-btn-new]');

      this.$datatable = null;

      this.$modal = $('[data-adminusers-modal]');

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
          url: '/admin-users/search',
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
            data: null,
            width: '20%',
            render: function(data, type, full, meta) {

              const btnResetPassword = `
                <button
                  class="btn btn-outline-dark btn-sm"
                  title="Bloquear usuário"
                  type="button"
                  data-btn-resetpassword
                  data-id="${data.id}"
                  data-name="${data.fullname}"
                  data-email="${data.email}"
                  data-enabled="${data.enabled}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Bloquear</span>
                  <i class="fa fa-key" aria-hidden="true"></i>                        
                </button>
              `;

              const btnLock = `
                <button
                  class="btn btn-outline-warning btn-sm"
                  title="Bloquear usuário"
                  type="button"
                  data-btn-lockuser
                  data-id="${data.id}"
                  data-enabled="${data.enabled}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Bloquear</span>
                  <i class="fa fa-lock" aria-hidden="true"></i>                        
                </button>
              `;

              const btnDelete = `
                <button
                  class="btn btn-outline-danger btn-sm"
                  title="Bloquear usuário"
                  type="button"
                  data-btn-delete
                  data-id="${data.id}"
                  style="margin: 2px; border-radius: 5px;";
                >
                  <span class="sr-only">Bloquear</span>
                  <i class="fa fa-trash" aria-hidden="true"></i>                        
                </button>
              `;

              const buttons = `${btnResetPassword} ${btnLock} ${btnDelete} `;

              return buttons;
            },            
          },
        ],
      }) 
    },

    
  };
  $(function() {
    ListAdminUsers.start();
  })  
})(jQuery);