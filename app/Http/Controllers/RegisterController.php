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

class RegisterController extends Controller
{
    use EasyJusStaticApiTrait;

    public function index()
    {
        return view('register');
    }

    public function store(Request $request)
    {
        try {

            $data = $request->all()['values'];

            if (self::adminUserExists($data['email'])) {
                return response()->json([
                    'success'  => false,
                    'status'   => 'user_already_exists',
                    'data' => [],
                ]);
            }

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users',
                $data
            );

            return response()->json([
                'success'  => true,
                'status'   => 'success',
                'data' => $response->data,
            ]);

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

    private static function adminUserExists($email) {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/verify-email',
                ['email' => $email]
            );

            if ('user_exists' === $response->status) {
                return true;
            }

            return false;

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
