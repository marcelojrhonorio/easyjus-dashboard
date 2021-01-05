<?php

namespace App\Http\Controllers;

use Log;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Traits\EasyJusStaticApiTrait;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\BadResponseException;

class LoginController extends Controller
{
    use EasyJusStaticApiTrait;

    public function index()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/auth/login',
                $request->all()['values']
            );

            switch ($response->status) {
                case 'login_forbidden':
                    return response()->json([
                        'success'  => false,
                        'status'   => 'login_forbidden',
                        'data' => $response->data,
                    ]);
                    break;
                case 'user_not_exists': 
                    return response()->json([
                        'success'  => false,
                        'status'   => 'user_not_exists',
                        'data' => $response->data,
                    ]);
                    break;
                case 'password_do_not_match':
                    return response()->json([
                        'success'  => false,
                        'status'   => 'password_do_not_match',
                        'data' => $response->data,
                    ]);
                    break;
                default: 
                    self::setCurrentUser($response->data);
                    return response()->json([
                        'success'  => true,
                        'status'   => 'success',
                        'data' => $response->data,
                    ]);
            }

        } catch (RequestException $exception) {
            Log::debug($exception->getMessage());
        } catch (ConnectException $exception) {
            Log::debug($exception->getMessage());
        } catch (ClientException $exception) {
            Log::debug($exception->getMessage());
        } catch (BadResponseException $exception) {
            Log::debug($exception->getMessage());
        }
    }

    private static function setCurrentUser ($user) {
        session([
            'id' => $user->id,
            'email' => $user->email,
            'fullname' => $user->fullname,
        ]);
    }

    public function logout (Request $request)
    {
        $request->session()->flush();
        return redirect('/');
    }
}
