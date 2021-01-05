<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">

      <div class="navbar-header">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa fa-bars"></i>
        </button>
        <a class="navbar-brand" href="./"><img src="{{ asset('assets/imgs/logo-easyjus-white-and-red-min.png') }}" style="width: 80px;" alt="Logo"></a>
        <a class="navbar-brand hidden" href="./"><img src="{{ asset('assets/imgs/logo-easyjus-white-and-red-short-min.png') }}" style="width: 180px;" alt="Logo"></a>
      </div>

      <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="/"> <i class="menu-icon fa fa-dashboard"></i>Dashboard </a>
          </li>

          {{-- Render Modules and Menus --}}
          @foreach($modules as $module)
            <h3 class="menu-title">{{ $module->module_name }}</h3>
            @foreach($module->menus as $menu)
              @if(null === $menu->parent_menu_id)
              <li class="menu-item-has-children dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <i class="menu-icon fa {{ $menu->icon }}"></i>{{ $menu->name }}
                </a>
                <ul class="sub-menu children dropdown-menu">
                  @foreach($module->submenus as $submenu)
                    @if($submenu->parent_menu_id == $menu->menu_id)
                        <li><i class="fa fa-genderless"></i><a href="{{ $submenu->route }}">{{ $submenu->name }}</a></li>
                    @endif
                  @endforeach
                </ul>
              </li>
              @endif
            @endforeach
          @endforeach
          
          {{-- <h3 class="menu-title">Icons</h3> --}}<!-- /.menu-title -->

          {{-- <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-tasks"></i>Icons</a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="menu-icon fa fa-fort-awesome"></i><a href="font-fontawesome.html">Font Awesome</a></li>
              <li><i class="menu-icon ti-themify-logo"></i><a href="font-themify.html">Themefy Icons</a></li>
            </ul>
          </li>
          <li>
            <a href="widgets.html"> <i class="menu-icon ti-email"></i>Widgets </a>
          </li>
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Charts</a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="menu-icon fa fa-line-chart"></i><a href="charts-chartjs.html">Chart JS</a></li>
              <li><i class="menu-icon fa fa-area-chart"></i><a href="charts-flot.html">Flot Chart</a></li>
              <li><i class="menu-icon fa fa-pie-chart"></i><a href="charts-peity.html">Peity Chart</a></li>
            </ul>
          </li>

          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-area-chart"></i>Maps</a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="menu-icon fa fa-map-o"></i><a href="maps-gmap.html">Google Maps</a></li>
              <li><i class="menu-icon fa fa-street-view"></i><a href="maps-vector.html">Vector Maps</a></li>
            </ul>
          </li>
          <h3 class="menu-title">Extras</h3><!-- /.menu-title -->
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Pages</a>
            <ul class="sub-menu children dropdown-menu">
              <li><i class="menu-icon fa fa-sign-in"></i><a href="page-login.html">Login</a></li>
              <li><i class="menu-icon fa fa-sign-in"></i><a href="page-register.html">Register</a></li>
              <li><i class="menu-icon fa fa-paper-plane"></i><a href="pages-forget.html">Forget Pass</a></li>
            </ul>
          </li> --}}
        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>
  </aside><!-- /#left-panel -->