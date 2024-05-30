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
    Route::get('byCode', [CustomerController::class, 'getByCode']);  
    Route::get('byName', [CustomerController::class, 'getByName']);  
    Route::get('/{id}', [CustomerController::class, 'show']);
});
Route::post('/createcustomer', [CustomerController::class, 'store']);
Route::put('updatecustomer/{id}', [CustomerController::class, 'update']);
Route::delete('/removecutomer/{id}', [CustomerController::class, 'destroy']);
Route::delete('/removeallcutomer', [CustomerController::class, 'deleteall']);
                    
                    
                    
Route::get('/test', function(){
    return 'hello';
});