<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\ProducstController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Checkrole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


                    //==== Cutomer =====                    
// Route::middleware('Checkrole')->prefix('viewcustomers')->group(function() {
Route::prefix('viewcustomers')->group(function() {
    Route::get('/', [CustomerController::class, 'index']);
    Route::get('/byCode', [CustomerController::class, 'getByCode']);  
    Route::get('/byName', [CustomerController::class, 'getByName']);  
    Route::get('/{id}', [CustomerController::class, 'show']);
  });
Route::post('/createcustomer', [CustomerController::class, 'store']);
Route::put('updatecustomer/{id}', [CustomerController::class, 'update']);
Route::delete('/removecutomer/{id}', [CustomerController::class, 'destroy']);
Route::delete('/removeallcutomer', [CustomerController::class, 'deleteall']);

                    //===== Type of proudct
Route::get('/viewtypeofpro', [TypeController::class, 'index']);   
Route::get('/viewtypeofpro/{id}', [TypeController::class, 'show']);
Route::post('/createtypofpro' , [TypeController::class, 'store']);
Route::put('/updatetypeofpro/{id}', [TypeController::class, 'update']);
Route::delete('/removetypeofpro/{id}', [TypeController::class, 'destroy']);
                    


// Route::middleware(['auth:sanctum',Checkrole::class])->group(function(){
    Route::get('/listproducts' , [ProducstController::class, 'index']);
    Route::get('/findprobyName', [ProducstController::class, 'findByName']);
    Route::get('/listproducts/{id}', [ProducstController::class, 'show']);
    Route::post('/createpro', [ProducstController::class, 'store']);
    Route::put('/updatepro/{id}', [ProducstController::class, 'update']);
    Route::delete('/removepro/{id}', [ProducstController::class , 'destroy']);
    Route::get('/viewquantityofpro' , [ProducstController::class, 'viewQuantityOfProduct']);
    Route::get('/viewquantityofprobytype' , [ProducstController::class, 'viewQuantityOfProductbytype']);
    Route::get('/viewproductByType', [ProducstController::class, 'getProductByType']);
// });



Route::get('/getorder', [OrderController::class, 'index']);
Route::get('/getorder/{customer_id}', [OrderController::class, 'indexes']);
Route::post('/crateorder', [OrderController::class, 'store']);
Route::get('/getorder/{id}', [OrderController::class, 'show']);
Route::get('findOrderByCustomerName', [OrderController::class, 'findOrderByCustomerCode']);
Route::get('getorderDailyDay', [OrderController::class, 'getOrderDailyDay']);
Route::delete('removeOder/{id}', [OrderController::class, 'destroy']);
Route::delete('/removeOderByCustomerName', [OrderController::class, 'DeleteOrderBYCustomerName']);
Route::get('/orders/{orderId}', [OrderController::class, 'getOrderWithProducts']);





Route::get('orders/{orderId}', [OrderController::class, 'getOrderWithProducts']);











Route::middleware('Checkrole')->get('/gettest', function(){
    return 'test';
});
// Route::middleware('auth:api')->get('/gettest', function(){
//     return 'test';
// });
Route::get('/testing', function(){
    return 'hello test';
});

use App\Http\Controllers\CustomerOrderController;

// Route::post('/customer-order', [CustomerOrderController::class, 'store']);



//user
Route::get('/getuser', [UserController::class, 'index']);
Route::get('/getuser/{id}', [UserController::class, 'show']);
Route::put('/updateuser/{id}', [UserController::class, 'update']);
Route::post('/createUser', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::delete('/removeuser/{id}', [UserController::class, 'destroy']);
Route::delete('/removeuserBYEmail', [UserController::class, 'removeUserByEmail']);