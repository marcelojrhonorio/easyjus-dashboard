<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-options-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Alternativas</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <input type="hidden" value=0 data-option-new-input>
          <input type="hidden" value="create" data-option-form-action>
          <input type="hidden" data-option-question-id>
          <input type="hidden" data-option-id>

          <div class="alert sr-only" style="position: relative" data-options-alert>
          </div>
          <div class="form-group">
            <h6 data-option-question-title></h6>
          </div>

          <div class="form-group">
            <button class="btn btn-success btn-sm" data-option-new><i class="fas fa-plus-square"></i> Adicionar</button>
          </div>

          <hr>

          <table class="table table-sm table-borderless" style="font-size: 13px;">
            <tbody data-option-table-body>
            {{-- JS File Here. --}}
            </tbody>
          </table>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-options-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>