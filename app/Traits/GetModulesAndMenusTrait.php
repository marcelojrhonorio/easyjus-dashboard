<?php

namespace App\Traits;

use GuzzleHttp\Psr7;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use App\Traits\EasyJusStaticApiTrait;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\BadResponseException;

trait GetModulesAndMenusTrait
{
    use EasyJusStaticApiTrait;

    private static function getAllModules($adminUserId)
    {
        try {

            $response = self::executeEasyJusApi(
                'POST',
                '/api/v1/frontend/modules/allowed-modules/' . $adminUserId,
                []
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
}
