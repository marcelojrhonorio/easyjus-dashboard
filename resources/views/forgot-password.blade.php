@extends('layouts.login-register')

@section('title', 'Esqueci minha senha | EasyJus')

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
            <div class="alert sr-only" role="alert" data-forgot-alert></div>

            <div class="form-group">
              <label>Endereço de Email</label>
              <input type="email" class="form-control" placeholder="Email" data-forgot-email>
            </div>
            <button type="submit" class="btn btn-primary btn-flat m-b-15" data-forgot-btnconfirm>Confirmar</button>
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
<script src="{{ asset('assets/js/app/forgot-password.js') }}"></script>
@endsection