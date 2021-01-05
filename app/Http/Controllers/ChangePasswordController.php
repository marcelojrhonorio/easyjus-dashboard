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

class ChangePasswordController extends Controller
{
    use EasyJusStaticApiTrait;

    public function changeCurrentPassword(Request $request)
    {
        $currentPassword   = $request->all()['values']['current_password']    ?? null;
        $newPassword       = $request->all()['values']['new_password']        ?? null;
        $newPasswordRepeat = $request->all()['values']['new_password_repeat'] ?? null;


        if((null === $currentPassword || null === $newPassword) || null === $newPasswordRepeat) {
            return response()->json([
                'success'  => false,
                'status'   => 'passwords_not_match',
                'message' => 'As senhas não correspondem.',
                'data' => [],
            ]);
        }

        if(false === self::currentPasswordIsCorrect($currentPassword)) {
            return response()->json([
                'success'  => false,
                'status'   => 'passwords_not_match',
                'message' => 'A senha atual é incorreta.',
                'data' => [],
            ]);
        }

        $changePassword = self::changePasswordAPI($newPassword);

        if (null === $changePassword) {
            return response()->json([
                'success'  => false,
                'status'   => 'unkdown_error',
                'message' => 'Ocorreu um erro. Por favor, tente mais tarde ou contacte o administrador da plataforma.',
                'data' => [],
            ]);
        }

        return response()->json([
            'success'  => true,
            'status'   => 'success',
            'message' => 'Senha alterada com sucesso. Use-a na próxima vez que fizer login.',
            'data' => [],
        ]);        

    }

    private static function currentPasswordIsCorrect($currentPassword) {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/password/check',
                [
                    'id' => session('id'),
                    'current_password' => $currentPassword
                ],
            );
    
            return $response->success;

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

    private static function changePasswordAPI($newPassword) {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/password/change',
                [
                    'id' => session('id'),
                    'new_password' => $newPassword
                ],
            );

            return $response->data ?? null;

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
}
