<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-studyobjects-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Novo Objeto de Estudo</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <input type="hidden" value="0" data-studyobjects-id>
          <input type="hidden" value="create" data-studyobjects-form-action>
          <div class="alert sr-only" style="position: relative" data-studyobjects-alert>
          </div>
          <div class="form-group">
            <label for="subject-select">Disciplina</label>
            <select class="form-control" id="subject-select" data-studyobjects-subject>
              <option id="0">selecione a disciplina...</option>
              @foreach($subjects as $subject)
                <option id="{{ $subject->id }}">{{ $subject->id }} - {{ $subject->title }}</option>
              @endforeach
            </select>
          </div>
          <div class="form-group">
            <label for="ordering">Ordem de exibição</label>
            <input id="ordering" class="form-control" type="number" data-studyobjects-ordering>
          </div>
          <div class="form-group">
            <label for="title">Nome</label>
            <input id="title" type="text" class="form-control" data-studyobjects-title>
          </div>
          <div class="form-group">
            <label for="description">Descrição</label>
            <input id="description" type="text" class="form-control" data-studyobjects-description>
          </div>          
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-studyobjects-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>