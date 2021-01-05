<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/register', [App\Http\Controllers\RegisterController::class, 'store']);
Route::post('/forgot-password', [App\Http\Controllers\ForgotPasswordController::class, 'forgot']);

Route::middleware(['isGuest'])->group(function () {
    Route::group(['prefix' => 'register'], function () {
        Route::get('/', [App\Http\Controllers\RegisterController::class, 'index']);
    });
    
    Route::group(['prefix' => 'login'], function () {
        Route::get('/', [App\Http\Controllers\LoginController::class, 'index']);
        Route::post('/', [App\Http\Controllers\LoginController::class, 'login']);
    });

    Route::group(['prefix' => 'forgot-password'], function () {
        Route::get('/', [App\Http\Controllers\ForgotPasswordController::class, 'index']);

        Route::get('/{token}', [App\Http\Controllers\ResetPasswordController::class, 'resetPassword']);
        Route::post('/reset', [App\Http\Controllers\ResetPasswordController::class, 'storeNewPassword']);
    });

});

Route::middleware(['isLogged'])->group(function () {
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);
    Route::get('/logout', [App\Http\Controllers\LoginController::class, 'logout']);

    Route::group(['prefix' => 'my-account'], function() {
        Route::get('/', [App\Http\Controllers\MyAccountController::class, 'index']);
        Route::post('/', [App\Http\Controllers\MyAccountController::class, 'changeAccount']);
    });

    Route::group(['prefix' => 'change-password'], function () {
        Route::post('/', [App\Http\Controllers\ChangePasswordController::class, 'changeCurrentPassword']);
    });

    Route::group(['prefix' => 'admin-users'], function() {
        Route::get('/', [App\Http\Controllers\AdminUsersController::class, 'index']);
        Route::get('/search', [App\Http\Controllers\AdminUsersController::class, 'search']);
        Route::delete('/{id}', [App\Http\Controllers\AdminUsersController::class, 'destroy']);
        Route::post('/block/{id}', [App\Http\Controllers\AdminUsersController::class, 'blockAdminUser']);
    });

    Route::group(['prefix' => 'students'], function() {
        Route::get('/', [App\Http\Controllers\StudentsController::class, 'index']);
        Route::get('/search', [App\Http\Controllers\StudentsController::class, 'search']);
        Route::post('/', [App\Http\Controllers\StudentsController::class, 'store']);
        Route::delete('/{id}', [App\Http\Controllers\StudentsController::class, 'destroy']);
        Route::put('/{id}', [App\Http\Controllers\StudentsController::class, 'edit']);
        Route::post('/reset-password', [App\Http\Controllers\StudentsController::class, 'resetPassword']);
        Route::post('/block/{id}', [App\Http\Controllers\StudentsController::class, 'blockStudent']);
    });

    Route::group(['prefix' => 'subjects'], function() {
        Route::get('/', [App\Http\Controllers\SubjectsController::class, 'index']);
        Route::get('/search', [App\Http\Controllers\SubjectsController::class, 'search']);
        Route::post('/', [App\Http\Controllers\SubjectsController::class, 'store']);
        Route::delete('/{id}', [App\Http\Controllers\SubjectsController::class, 'destroy']);
        Route::put('/{id}', [App\Http\Controllers\SubjectsController::class, 'edit']);
    });

    Route::group(['prefix' => 'study-objects'], function() {
        Route::get('/', [App\Http\Controllers\StudyObjectsController::class, 'index']);
        Route::get('/search', [App\Http\Controllers\StudyObjectsController::class, 'search']);
        Route::post('/', [App\Http\Controllers\StudyObjectsController::class, 'store']);
        Route::put('/{id}', [App\Http\Controllers\StudyObjectsController::class, 'edit']);
        Route::delete('/{id}', [App\Http\Controllers\StudyObjectsController::class, 'destroy']);
        Route::post('/get-from-subject/{subjectId}', [App\Http\Controllers\StudyObjectsController::class, 'getFromSubjectId']);
    });

    Route::group(['prefix' => 'questions'], function() {
        Route::get('/', [App\Http\Controllers\QuestionsController::class, 'index']);
        Route::get('/search', [App\Http\Controllers\QuestionsController::class, 'search']);
        Route::post('/', [App\Http\Controllers\QuestionsController::class, 'store']);
        Route::delete('/{id}', [App\Http\Controllers\QuestionsController::class, 'destroy']);
        Route::put('/{id}', [App\Http\Controllers\QuestionsController::class, 'edit']);
    });

    Route::group(['prefix' => 'options'], function() {
        Route::post('/', [App\Http\Controllers\OptionsController::class, 'store']);
        Route::post('/get-from-question/{questionId}', [App\Http\Controllers\OptionsController::class, 'getFromQuestionId']);
        Route::delete('/{id}', [App\Http\Controllers\OptionsController::class, 'destroy']);
        Route::put('/{id}', [App\Http\Controllers\OptionsController::class, 'edit']);
    });
});

