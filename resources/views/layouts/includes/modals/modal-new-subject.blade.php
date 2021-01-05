<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-subjects-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Nova Disciplina</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <input type="hidden" value="0" data-subjects-id>
          <input type="hidden" value="create" data-subjects-form-action>
          <div class="alert sr-only" style="position: relative" data-subjects-alert>
          </div>
          <div class="form-group">
            <label for="fullname">Nome da Disciplina</label>
            <input id="fullname" type="text" class="form-control" data-subjects-title>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-subjects-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>