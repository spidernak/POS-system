<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


                    //==== Cutomer =====                    
Route::prefix('viewcustomers')->group(function(){
    Route::get('/' , [CustomerController::class , 'index']);
    Route::get('//{id}', [CustomerController::class, 'show']);
    Route::get('/', [CustomerController::class, 'getByName']);  
});
Route::post('/createcustomer', [CustomerController::class, 'store']);
Route::put('updatecustomer', [CustomerController::class, 'update']);
Route::delete('/removecutomer/{id}', [CustomerController::class, 'destroy']);
Route::delete('/removeallcutomer', [CustomerController::class, 'deleteall']);
                    
                    
                    
Route::get('/test', function(){
    return 'hello';
});