<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-changepass-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Alterar Senha</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <div class="alert sr-only" style="position: relative" data-changepass-alert>
          </div>
          <div class="form-group">
            <label for="current-password">Senha Atual</label>
            <input id="current-password" type="password" class="form-control" data-changepass-currentpassword>
            
            {{-- Show Password --}}
            <small id="password" class="form-text text-muted">
              <a href="" data-changepass-show-current-password><i class="fa fa-eye"></i> Mostrar</a>
            </small>
            
            {{-- Hide Password --}}
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-changepass-hide-current-password><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
          <div class="form-group">
            <label for="new-password">Nova Senha</label>
            <input id="new-password" type="password" class="form-control" data-changepass-newpassword>

            {{-- Show Password --}}
            <small id="password" class="form-text text-muted">
              <a href="" data-changepass-show-new-password><i class="fa fa-eye"></i> Mostrar</a>
            </small>

            {{-- Hide Password --}}
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-changepass-hide-new-password><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
          <div class="form-group">
            <label for="new-password-repeat">Repetir Nova Senha</label>
            <input id="new-password-repeat" type="password" class="form-control" data-changepass-newpasswordrepeat>

            {{-- Show Password --}}
            <small id="password" class="form-text text-muted">
              <a href="" data-changepass-show-new-password-repeat><i class="fa fa-eye"></i> Mostrar</a>
            </small>

            {{-- Hide Password --}}
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-changepass-hide-new-password-repeat><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-changepass-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>