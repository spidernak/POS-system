<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $order = Order::latest()->get();
            return response()->json([
                'messsage' => 'All orders list',
                'Order list' => $order
            ]);
        } catch(\Exception $e){
            return response()->json(['error' => 'Soomething goes wrong'],500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Customer_name' => 'required|string|max:255|nullable',
            'Customer_code' => 'required|string|max:255|exists:customers,Customer_code',
            'Product_id' => 'required|integer|exists:products,id',
            'Quantity' => 'required|integer|min:1',
            'Total_price' => 'required|numeric|min:0',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation error',
                'messages' => $validator->errors()
            ], 422);
        }
    
        $product = DB::table('products')->where('id', $request->input('Product_id'))->first();
        if (!$product) {
            return response()->json([
                'error' => 'Product not found in the database.',
                'Product_id' => $request->input('Product_id')
            ], 404);
        }
    
        if ($product->Product_Quantity < $request->input('Quantity')) {
            return response()->json([
                'error' => 'Insufficient product quantity available.',
                'available_quantity' => $product->Product_Quantity
            ], 400);
        }
    
        try {
            DB::beginTransaction();
    
            $order = new Order();
            $order->Customer_name = $request->input('Customer_name');
            $order->Customer_code = $request->input('Customer_code');
            $order->Product_id = $request->input('Product_id');
            $order->Quantity = $request->input('Quantity');
            $order->Total_price = $request->input('Total_price');
            $order->save();
    
            DB::table('products')->where('id', $request->input('Product_id'))->decrement('Product_Quantity', $request->input('Quantity'));
    
            DB::commit();
    
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Something went wrong while creating the order',
                'message' => $e->getMessage()
            ], 500);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $order = Order::findOrFail($id);

            return response()->json([
                'Order' =>$order
            ]);

        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json([
                'erro' => 'Ther no order found related with id ' .$id. ' !!!'
            ]);
        }
    }

    public function findOrderByCustomerCode(Request $request)
    {
        try{
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => 'required|string|max:4|exists:customers,Customer_code',
            ]);

            $orderByCustomerName = Order::where('Customer_name', $validateData['Customer_name'])
                                        ->where('Customer_code', $validateData['Customer_code'])
                                        ->get();
            
            if($orderByCustomerName->isEmpty()){
                return response()->json(['error' => 'No order found with this name or code.']);
            }

            return response()->json(['Order list' => $orderByCustomerName]);
        } catch(\Exception $e){
            return response()->json([ 'error' => 'something went wrong', $e->getMessage()]);
        }
    }


    public function getOrderDailyDay(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'date' => 'required|date_format:Y-m-d',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'error' => 'Validation error',
                    'messages' => $validator->errors()
                ], 422);
            }
    
            $date = Carbon::createFromFormat('Y-m-d', $request->input('date'));
    
            $orders = Order::whereDate('created_at', $date)->get();
    
            return response()->json([
                'message' => 'Orders for ' . $date->toDateString(),
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while retrieving orders: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $removeOrder = Order::find($id);

            if(!$removeOrder){
                return response()->json(['error' => 'Ther no Oder found with id '.$id]);
            }

            $removeOrder->delete();
            return response()->json(['message' => 'Order removed successfully...']);
        } catch(\Exception $e){
            return response()->json(['error' => 'Something went wrong!!!']);
        }
    }

    public function DeleteOrderBYCustomerName(Request $request)
    {
        try {
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
            ]);

            DB::beginTransaction();

            $customer = Order::where('Customer_name', $validateData['Customer_name'])->first();

            if (!$customer) {
                return response()->json(['error' => 'Customer not found'], 404);
            }

            Order::where('Customer_name', $validateData['Customer_name'])->delete();

            DB::commit();

            return response()->json(['message' => 'All orders by the customer have been deleted'], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['message' => 'All orders by the customer have been deleted'], 200);
        }
    }
}
