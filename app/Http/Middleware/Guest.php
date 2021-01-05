<?php

namespace App\Http\Middleware;

use Log;
use Closure;
use Session;
use Illuminate\Http\Request;

class Guest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       
        if (false === Session::has('email')){
            return $next($request);
        }
        
        return redirect('/');
        
    }
}
