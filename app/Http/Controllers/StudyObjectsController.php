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

class StudyObjectsController extends Controller
{
    use GetModulesAndMenusTrait;
    use EasyJusStaticApiTrait;

    public function index ()
    {
        return view('study-objects.index')
            ->with([
                'modules' => self::getAllModules(session('id')),
                'subjects' => self::getAllSubjects()
            ]);
    }

    private static function getAllSubjects() {
        try {
            
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/subjects/search',
                [],
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

    public function search ()
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/study-objects/search',
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
                '/api/v1/frontend/study-objects/',
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

    public function edit ($id, Request $request)
    {
        try {

            $data = $request->all()['values'];            

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/study-objects/edit/' . $id,
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
                '/api/v1/frontend/study-objects/delete/' . $id,
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

    public function getFromSubjectId ($subjectId) {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/study-objects/get-from-subject/' . $subjectId,
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
}
