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

class SubjectsController extends Controller
{
    use GetModulesAndMenusTrait;
    use EasyJusStaticApiTrait;

    public function index ()
    {
        return view('subjects.index')->with('modules', self::getAllModules(session('id')));
    }

    public function search()
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/subjects/search',
                [],
            );

            return datatables()->of($response->data)->toJson();

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

    public function store (Request $request)
    {
        try {

            $data = $request->all()['values'];

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/subjects/',
                $data,
            );
    
            return response()->json([
                'success' => true,
                'status' => 'success',
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

    public function destroy ($id) 
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/subjects/delete/' . $id,
                [],
            );

            return response()->json([
                'success' => true,
                'status' => 'success',
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

    public function edit ($id, Request $request)
    {
        try {

            $data = $request->all()['values'];            

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/subjects/edit-subject/' . $id,
                $data,
            );

            return response()->json([
                'success' => true,
                'status' => 'success',
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
