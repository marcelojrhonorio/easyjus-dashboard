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

class MyAccountController extends Controller
{
    use EasyJusStaticApiTrait;
    use GetModulesAndMenusTrait;
    
    public function index ()
    {
        return view('my-account')->with('modules', self::getAllModules(session('id')));
    }

    public function changeAccount(Request $request)
    {
        $data = $request->all()['values'];

        if ($data['fullname'] == session('fullname')) {
            return response()->json([
                'success'  => false,
                'status'   => 'nothing_changed',
                'data' => [],
            ]);
        }

        $changedAdminUser = self::changeAccountAPI($data);

        self::updateSession($request, $changedAdminUser);

        return response()->json([
            'success'  => true,
            'status'   => 'success',
            'data' => $changedAdminUser,
        ]);
    }

    private static function changeAccountAPI($data) {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/edit/' . session('id'),
                $data
            );

            return $response->data;

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

    private static function updateSession($request, $data) {
        $request->session()->flush();

        session([
            'id' => $data->id,
            'email' => $data->email,
            'fullname' => $data->fullname,
        ]);
    }
}
