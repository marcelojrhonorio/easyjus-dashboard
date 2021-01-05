@extends('layouts.login-register')

@section('title', 'Token Inválido | EasyJus')

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
            <div class="alert alert-danger" role="alert">
              Token inválido. 
            </div>

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

@endsection