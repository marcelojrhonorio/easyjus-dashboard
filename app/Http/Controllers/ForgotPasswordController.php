<?php

namespace App\Http\Controllers;

use Log;
use Mail;
use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Traits\EasyJusStaticApiTrait;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\BadResponseException;

class ForgotPasswordController extends Controller
{
    use EasyJusStaticApiTrait;
    
    public function index ()
    {
        return view('forgot-password');
    }

    public function forgot (Request $request)
    {
        $email = $request->all()['values']['email'] ?? null;

        if (null === $email) {
            return response()->json([
                'success'  => false,
                'status'   => 'invalid_email',
                'data' => [],
            ]);
        }

        $adminUser = self::getAdminUserEmail($email);

        if (!isset($adminUser->id)) {
            return response()->json([
                'success'  => false,
                'status'   => 'admin_user_not_exists',
                'data' => $adminUser,
            ]);
        }

        $token = self::getRecoveryPasswordToken($adminUser->id);
        self::sendEmail($adminUser, $token);

        return response()->json([
            'success'  => true,
            'status'   => 'success',
            'data' => $token,
        ]);
    }

    private static function getAdminUserEmail ($email) {
        $response = self::executeEasyJusApi(
            'POST',
            '/api/v1/frontend/admin-users/get-by-email',
            ['email' => $email],
        );

        return $response->data ?? null;
    }

    private static function getRecoveryPasswordToken($adminUserId) {
        $response = self::executeEasyJusApi(
            'POST',
            '/api/v1/frontend/admin-users/get-recovery-password-token',
            ['id' => $adminUserId],
        );

        return $response->data ?? null;
    }

    private static function sendEmail ($adminUser, $token) {
        $firstName = explode(" ", $adminUser->fullname)[0];

        $to_name = $firstName;
        $to_email = $adminUser->email;
        $data = array("name" => $firstName, "token" => $token);
        Mail::send("emails.email-test", $data, function($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
            ->subject("EasyJus | Redefinição de senha");
            $message->from("ti.easyjus@gmail.com", "EasyJus");
        });
    }
}
