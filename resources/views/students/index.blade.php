@extends('layouts.dashboard')

@section('title', 'Alunos | EasyJus')

@section('page-title', 'Alunos')
@section('text-right', '')

@section('content')
<div class="card only-text">
  <div class="card-header">
    <div class="row">
      {{-- Card Title --}}
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <strong>Alunos</strong>
      </div>
    </div>
    <div class="row">
      {{-- Card Subtitle --}}
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <small>Editar ou incluir novos alunos na plataforma.</small>
      </div>
    </div>
  </div>
  <div class="card-body">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="white-box">
          <div class="ibox float-e-margins">
            <div class="ibox" style="margin-bottom: 12px;">
              <input class="sr-only" type="text" id="myInput">
              <button id="new" class="btn btn-primary" type="button" name="new" data-btn-new>
                 <i class="fa fa-plus-square" aria-hidden="true"></i> Adicionar Novo
              </button>                  
              <hr>
            </div>
            <div class="ibox-content">
              <div class="table-responsive">
                <table id="example" class="table table-hover" style="width:100%" data-table-students>
                  <thead class="thead-light">
                    <tr>
                      <th>#</th>
                      <th>nome</th>
                      <th>email</th>
                      <th>celular</th>
                      <th>nascimento</th>
                      <th>opções</th>
                    </tr>
                  </thead>
                  <tbody>
                  {{-- JavaScript content --}}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>    
  </div>
</div>

@include('layouts.includes.modals.modal-new-student')

@endsection

@section('custom-scripts')
  <script src="{{ asset('assets/js/app/students/main.js') }}"></script>
@endsection