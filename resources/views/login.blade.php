@extends('layouts.login-register')

@section('title', 'Login | EasyJus')

@section('content')
<div class="sufee-login d-flex align-content-center flex-wrap">
  <div class="container">
    <div class="login-content">
      <div class="login-logo">
        <a>
          <img class="align-content" src="{{ asset('assets/imgs/logo-easyjus-white-and-red-min.png') }}" alt="Logo" style="width: 125px;">
        </a>
      </div>
      <div class="login-form">
        <form data-login-form>
          {{-- Alert Feedback Here. --}}
          <div class="alert sr-only" role="alert" data-login-alert></div>
          <div class="form-group">
            <label>Endereço de email</label>
            <input type="email" class="form-control" placeholder="Email" data-login-email>
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" placeholder="Senha" data-login-password>
            <small id="password" class="form-text text-muted">
              <a href="" data-login-show-password><i class="fa fa-eye"></i> Mostrar</a>
            </small>
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-login-hide-password><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"> Lembrar senha
            </label>
            <label class="pull-right">
              <a href="/forgot-password">Esqueceu a senha?</a>
            </label>
          </div>
          <button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30" data-login-button>Login</button>
          <div class="register-link m-t-15 text-center">
            <p>Não possui uma conta ? <a href="/register"> Cadastre-se aqui</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@endsection

@section('custom-scripts')
{{-- Custom Scripts Here --}}
<script src="{{ asset('assets/js/app/login.js') }}"></script>
@endsection
