{{ $name }}, foi solicitado redefinição de senha. Clique no link abaixo: <br>
{{ env('APP_URL') }}/forgot-password/{{ $token }}