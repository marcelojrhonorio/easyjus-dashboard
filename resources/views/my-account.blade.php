@extends('layouts.dashboard')

@section('title', 'Minha Conta | EasyJus')

@section('page-title', 'Minha Conta')
@section('text-right', '')

@section('content')
<div class="card only-text">
  <div class="card-header">
    <div class="row">
      {{-- Card Title --}}
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <strong>Minha conta</strong>
      </div>
    </div>
    <div class="row">
      {{-- Card Subtitle --}}
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <small>Alterar meus dados cadastrais.</small>
      </div>
    </div>
  </div>
  <div class="card-body">
    <form action="#">
      {{-- Alert Feedback Here. --}}
      <div class="alert sr-only" role="alert" data-myaccount-alert></div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div class="form-group">
            <label for="fullname">Nome Completo</label>
            <input id="fullname" name="fullname" type="text" class="form-control" value="{{ session('fullname') }}" data-myaccount-fullname>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="text" class="form-control" value="{{ session('email') }}" disabled>
          </div>
        </div>
      </div>
      <div class="row" style="padding-bottom: 12px">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <a class="btn btn-outline-primary" href="#" data-btn-change-password><i class="fa fa-key"></i> Alterar senha</a>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <button type="submit" class="btn btn-primary" data-myaccount-btnsubmit>Salvar</button>
        </div>
      </div>
    </form>
  </div>
</div>

@include('layouts.includes.modals.change-password')

@endsection

@section('custom-scripts')
  <script src="{{ asset('assets/js/app/my-account.js') }}"></script>
  <script src="{{ asset('assets/js/app/change-password.js') }}"></script>
@endsection