<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="category" aria-hidden="true" data-adminusers-modal>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal-title">Novo Administrador</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close" data-modal-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form data-changepass-form>
          <div class="alert sr-only" style="position: relative" data-adminusers-alert>
          </div>
          <div class="form-group">
            <label for="fullname">Nome Completo</label>
            <input id="fullname" type="text" class="form-control" data-adminusers-fullname>
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input id="email" type="email" class="form-control" data-adminusers-email>
          </div>

          {{-- PASSWORD --}}
          <div class="form-group">
            <label for="password">Senha</label>
            <input id="password" type="password" class="form-control" data-adminusers-password>

            {{-- Show Password --}}
            <small id="password" class="form-text text-muted">
              <a href="" data-adminusers-show-password><i class="fa fa-eye"></i> Mostrar</a>
            </small>

            {{-- Hide Password --}}
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-adminusers-hide-password><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>

          {{-- PASSWORD CONFIRMATION --}}
          <div class="form-group">
            <label for="password-repeat">Repetir Senha</label>
            <input id="password-repeat" type="password" class="form-control" data-adminusers-passwordrepeat>

            {{-- Show Password --}}
            <small id="password" class="form-text text-muted">
              <a href="" data-adminusers-show-password-repeat><i class="fa fa-eye"></i> Mostrar</a>
            </small>

            {{-- Hide Password --}}
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-adminusers-hide-password-repeat><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-modal-close>Cancelar</button>
        <button type="button" class="btn btn-primary" data-adminusers-confirm>Confirmar</button>
      </div>
    </div>
  </div>
</div>