<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//==== Cutomer =====
Route::prefix('customers')->group(function(){
    
    Route::get('/', [CustomerController::class, 'index']);
    Route::get('//{id}',[CustomerController::class, 'show']);
    Route::get('/by-name', [CustomerController::class, 'getByName']);
    Route::post('/', [CustomerController::class, 'store']);
    Route::put('//{id}', [CustomerController::class, 'update']);
    Route::delete('//{id}', [CustomerController::class, 'destroy']);

});
