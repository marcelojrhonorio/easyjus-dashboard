<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="pt-BR">
<!--<![endif]-->

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>@yield('title')</title>
  <meta name="description" content="EasyJus - Uma plataforma EdTech">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  {{-- Style --}}
  @include('layouts.includes.styles.style-dashboard')

</head>

<body>
  {{-- Left Panel --}}
  @include('layouts.partials.left-panel')

  {{-- Right Panel --}}
  @include('layouts.partials.right-panel')

  {{-- Scripts --}}
  @include('layouts.includes.scripts.scripts-dashboard')

  @yield('custom-scripts')
</body>

</html>
