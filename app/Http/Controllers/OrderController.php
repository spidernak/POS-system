<?php

namespace App\Http\Controllers;

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
            'Customer_name' => 'required|string|max:255',
            'Customer_code' => 'required|string|max:255|exists:customers,Customer_code',
            'Product_id' => 'required',
            'Quantity' => 'required|integer|min:1',
            'Total_price' => 'required|numeric|min:0',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation error',
                'messages' => $validator->errors()
            ], 422);
        }
    
        try {
            $order = new Order();
            $order->Customer_name = $request->input('Customer_name');
            $order->Customer_code = $request->input('Customer_code');
            $order->Product_id = $request->input('Product_id');
            $order->Quantity = $request->input('Quantity');
            $order->Total_price = $request->input('Total_price');
            $order->save();
    
            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order
            ], 201);
        } catch (\Exception $e) {
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
    try {
        $validateData = $request->validate([
            'Customer_code' => 'required|string|max:255|exists:customers,Customer_code',
        ]);

        $orderByCustomer = Order::where('Customer_code', $validateData['Customer_code'])->get();
        $customerCode = $validateData['Customer_code'];

        if ($orderByCustomer->isEmpty()) {
            return response()->json([
                'error' => 'There is no order found related to the name: ' . $customerCode,
            ], 404);
        }

        return response()->json([
            'Order list' => $orderByCustomer,
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Something went wrong while retrieving orders: ' . $e->getMessage()], 422);
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
                'Customer_name' => 'required|string|max:255|exists:customers,Customer_name',
            ]);

            DB::beginTransaction();

            $customer = Customer::where('Customer_name', $validateData['Customer_name'])->first();

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
