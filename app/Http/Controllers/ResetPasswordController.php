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

class ResetPasswordController extends Controller
{
    use EasyJusStaticApiTrait;

    public function resetPassword ($token) 
    {
        $adminUser = self::getAdminUserByToken($token);

        if ('invalid_token' == $adminUser->status) {
            return view('reset-password.invalid-token');
        }

        return view('reset-password.index')->with(['user_id' => $adminUser->data->id]);
    }

    private static function getAdminUserByToken($token) {
        
        $response = self::executeEasyJusApi(
            'POST',
            '/api/v1/frontend/admin-users/get-user-by-token',
            ['token' => $token],
        );

        return $response;
    }

    public function storeNewPassword (Request $request) {
        $data = $request->all()['values'];

        $changePassword = self::changePassword($data['admin_user_id'], $data['password']);

        return response()->json([
            'success'  => true,
            'status'   => 'success',
            'data' => $changePassword,
        ]);
    }

    private static function changePassword($id, $password) {
        $response = self::executeEasyJusApi(
            'POST',
            '/api/v1/frontend/admin-users/change-password',
            ['id' => $id, 'password' => $password],
        );

        return $response->data ?? null;        
    }
}
