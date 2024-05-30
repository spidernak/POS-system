<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TypeController;
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
                    
Route::get('/viewtypeofpro', [TypeController::class, 'index']);   
Route::get('/viewtypeofpro/{id}', [TypeController::class, 'show']);
Route::post('/createtypofpro' , [TypeController::class, 'store']);
Route::put('/updatetypeofpro/{id}', [TypeController::class, 'update']);
Route::delete('/removetypeofpro/{id}', [TypeController::class, 'destroy']);
                    
Route::get('/test', function(){
    return 'hello';
});