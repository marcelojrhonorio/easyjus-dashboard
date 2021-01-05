@extends('layouts.login-register')

@section('title', 'Nova Senha | EasyJus')

@section('content')
<div class="sufee-login d-flex align-content-center flex-wrap">
  <div class="container">
      <div class="login-content">
        <div class="login-logo">
          <a href="/">
            <img class="align-content" src="{{ asset('assets/imgs/logo-easyjus-white-and-red-min.png') }}" style="width: 125px;">
          </a>
        </div>
        <div class="login-form">
          <form>
            {{-- Alert Feedback Here. --}}
            <div class="alert sr-only" role="alert" data-reset-alert></div>
            <input type="hidden" value="{{ $user_id }}" data-reset-admin-id>

            <div class="form-group">
              <label>Nova Senha</label>
              <input type="password" class="form-control" placeholder="Senha" data-reset-password>
              <small id="password" class="form-text text-muted">
                <a href="" data-reset-show-password><i class="fa fa-eye"></i> Mostrar</a>
              </small>
              <small id="password" class="form-text text-muted">
                <a class="sr-only" href="" data-reset-hide-password><i class="fa fa-eye-slash"></i> Ocultar</a>
              </small>
            </div>
            <div class="form-group">
              <label>Confirmar Senha</label>
              <input type="password" class="form-control" placeholder="Senha" data-reset-password-confirmation>
              <small id="password" class="form-text text-muted">
                <a href="" data-reset-show-password-confirmation><i class="fa fa-eye"></i> Mostrar</a>
              </small>
              <small id="password" class="form-text text-muted">
                <a class="sr-only" href="" data-reset-hide-password-confirmation><i class="fa fa-eye-slash"></i> Ocultar</a>
              </small>
            </div>
            <button type="submit" class="btn btn-primary btn-flat m-b-15" data-reset-btnconfirm>Confirmar</button>
            <div class="checkbox">
            <label></label>
            <label class="pull-right">
              <a href="/">Voltar para Login</a>
            </label>
          </div>
          </form>
        </div>
      </div>
  </div>
</div>
@endsection

@section('custom-scripts')
{{-- Custom Scripts Here --}}
<script src="{{ asset('assets/js/app/reset-password.js') }}"></script>
@endsection