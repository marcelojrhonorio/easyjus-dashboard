<?php

namespace App\Http\Controllers;

use Log;
use Mail;
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

class StudentsController extends Controller
{
    use GetModulesAndMenusTrait;
    use EasyJusStaticApiTrait;

    public function index ()
    {
        return view('students.index')->with('modules', self::getAllModules(session('id')));
    }

    public function search()
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/students/search',
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
                '/api/v1/frontend/students/',
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
                '/api/v1/frontend/students/delete/' . $id,
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

    public function edit (Request $request, $id)
    {
        try {
            $data = $request->all()['values'];

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/students/edit/' . $id,
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
    
    public function resetPassword(Request $request)
    {
        $email = $request->all()['values']['email'];

        $student = self::getRecoveryPasswordToken($email);

        self::sendEmai($student);

        return response()->json([
            'success' => true,
            'status' => 'success',
            'data' =>  $student->token
        ]);
    }

    private static function getRecoveryPasswordToken ($email)
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/students/get-recovery-password-token',
                ['email' => $email],
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

    private static function sendEmai($student)
    {
        $firstName = explode(" ", $student->fullname)[0];

        $to_name = $firstName;
        $to_email = $student->email;
        $data = array("name" => $firstName, "token" => $student->token);
        Mail::send("emails.email-test", $data, function($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
            ->subject("EasyJus | Redefinição de senha");
            $message->from("ti.easyjus@gmail.com", "EasyJus");
        });
    }

    public function blockStudent ($id) 
    {
        try {
            
            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/students/block/' . $id,
                [],
            );

            return response()->json([
                'success' => true,
                'status' => 'success',
                'data' => ''
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
