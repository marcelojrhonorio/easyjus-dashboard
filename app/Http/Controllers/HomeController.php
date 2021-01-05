<?php

namespace App\Http\Controllers;

use Log;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Traits\EasyJusStaticApiTrait;
use App\Traits\GetModulesAndMenusTrait;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\BadResponseException;

class HomeController extends Controller
{
    use EasyJusStaticApiTrait;
    use GetModulesAndMenusTrait;
    
    public function index ()
    {
        return view('index')->with('modules', self::getAllModules(session('id')));
    }
}
