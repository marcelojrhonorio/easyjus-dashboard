@extends('layouts.login-register')

@section('title', 'Cadastro | EasyJus')

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
        <form>
          {{-- Alert Feedback Here. --}}
          <div class="alert sr-only" role="alert" data-register-alert></div>
          <div class="form-group">
            <label for="fullname">Nome completo</label>
            <input id="fullname" name="fullname" type="text" class="form-control" placeholder="Nome Completo" data-register-fullname>
          </div>
          <div class="form-group">
            <label for="email-address">Endereço de email</label>
            <input id="email-address" name="email-address" type="email" class="form-control" placeholder="Endereço de Email" data-register-email>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input id="password" type="password" class="form-control" placeholder="Senha" data-register-password>
            <small id="password" class="form-text text-muted">
              <a href="" data-register-show-password><i class="fa fa-eye"></i> Mostrar</a>
            </small>
            <small id="password" class="form-text text-muted">
              <a class="sr-only" href="" data-register-hide-password><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>
          </div>
          <div class="form-group">
            <label for="password-repeat">Repita a senha</label>
            <input id="password-repeat" type="password" class="form-control" placeholder="Repita a Senha" data-register-password-confirmation>
            <small id="password-repeat" class="form-text text-muted">
              <a href="" data-register-show-password-confirmation><i class="fa fa-eye"></i> Mostrar</a>
            </small>
            <small id="password-repeat" class="form-text text-muted">
              <a class="sr-only" href="" data-register-hide-password-confirmation><i class="fa fa-eye-slash"></i> Ocultar</a>
            </small>            
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" data-register-terms> Concordo com <a href="">Termos e Condições</a>
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30" data-register-btn-confirm>Cadastre-se</button>
          <div class="register-link m-t-15 text-center">
            <p>Já possui uma conta? <a href="/"> Faça login</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@endsection

@section('custom-scripts')
{{-- Custom Scripts Here --}}
<script src="{{ asset('assets/js/app/register.js') }}"></script>
@endsection