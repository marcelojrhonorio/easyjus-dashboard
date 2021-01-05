<?php

namespace App\Http\Controllers;

use Log;
use DataTables;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Traits\EasyJusStaticApiTrait;
use App\Traits\GetModulesAndMenusTrait;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\BadResponseException;

class AdminUsersController extends Controller
{
    use GetModulesAndMenusTrait;
    use EasyJusStaticApiTrait;

    public function index ()
    {
        return view('admin-users.index')->with('modules', self::getAllModules(session('id')));
    }

    public function search ()
    {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/search',
                [],
            );
    
            return datatables()->of(self::removeCurrentUserArray($response->data))->toJson();

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

    private static function removeCurrentUserArray ($adminUsers)
    {
        $adminUsersArray = [];

        foreach($adminUsers as $adminUser) {
            if ($adminUser->email != session('email')) {
                array_push($adminUsersArray, $adminUser);
            }
        }

        return $adminUsersArray;
    }

    public function destroy($id)
    {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/delete/' . $id,
                [],
            );
    

            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => '',
                'data' => $response->data
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

    public function blockAdminUser ($id)
    {
        try {
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/admin-users/block/' . $id,
                [],
            );

            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => '',
                'data' => $response->data
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

}