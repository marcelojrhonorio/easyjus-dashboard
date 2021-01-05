<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-questions-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Nova Questão</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <input type="hidden" value="0" data-questions-id>
          <input type="hidden" value="create" data-questions-form-action>
          <div class="alert sr-only" style="position: relative" data-questions-alert>
          </div>
          <div class="form-group">
            <label for="subject-select">Disciplina</label>
            <select class="form-control" id="subject-select" data-questions-subject>
              <option id="0">selecione a disciplina...</option>
              @foreach($subjects as $subject)
              <option id="{{ $subject->id }}">{{ $subject->id }} - {{ $subject->title }}</option>
              @endforeach
            </select>
          </div>
          <div class="study-object-wrap sr-only" data-questions-study-object-wrap>
            <div class="form-group">
                <label for="obj-select">Objeto de Estudo</label>
                <select class="form-control" id="obj-select" data-questions-object>
                <option id="0">selecione o objeto de estudo...</option>
                </select>
            </div>
          </div>
          <div class="form-group">
            <label for="title">Questão</label>
            <textarea id="title" type="text" class="form-control" data-questions-description></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-questions-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>