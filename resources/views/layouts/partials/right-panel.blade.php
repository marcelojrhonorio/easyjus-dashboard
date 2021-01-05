<div id="right-panel" class="right-panel">

    {{-- Header --}}
    <header id="header" class="header">
      @include('layouts.partials.header-menu')
    </header>

    @include('layouts.partials.breadcumps')

    <div class="content mt-3">

      @yield('content')

      @include('layouts.partials.from-template-cards')

    </div>
  </div>