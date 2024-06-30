<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Customer;
use Illuminate\Database\QueryException;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of all orders with product details.
     */
    public function index()
    {
        try {
            // Retrieve orders with their associated products
            $orders = Order::with('products')
                           ->select('id', 'Customer_name', 'Customer_code', 'Quantity', 'Total_price', 'created_at', 'updated_at')
                           ->get();
    
            return response()->json([
                'message' => 'All orders list',
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function getOrderWithProducts($orderId)
{
    // Fetch the order with products and pivot data
    $order = Order::with('products')->find($orderId);

    // Check if order exists
    if (!$order) {
        return response()->json(['error' => 'Order not found'], 404);
    }

    // Access products and pivot data
    foreach ($order->products as $product) {
        echo "Product Name: {$product->Product_name}<br>";
        echo "Quantity: {$product->pivot->quantity}<br>";
        echo "Price at Order: {$product->pivot->price_at_order}<br>";
    }

    return response()->json(['order' => $order], 200);
}



    /**
     * Display a listing of orders for a specific customer by customer code with product details.
     */
    public function indexes($customer_id)
    {
        try {
            $orders = Order::with('products')
                           ->where("Customer_code", $customer_id)
                           ->latest()
                           ->get();

            return response()->json([
                'message' => 'Orders for customer ' . $customer_id,
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'Customer_name' => 'required|string|max:255',
        'Customer_code' => 'required|string|max:255',
        'products' => 'required|array|min:1', // Ensure products are provided
        'products.*.id' => 'required|exists:products,id', // Validate each product ID
        'products.*.quantity' => 'required|integer|min:1', // Quantity for each product
        'Total_price' => 'required|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'error' => 'Validation error',
            'messages' => $validator->errors()
        ], 422);
    }

    try {
        DB::beginTransaction();

        // Create the order
        $order = new Order();
        $order->Customer_name = $request->input('Customer_name');
        $order->Customer_code = $request->input('Customer_code');
        $order->Quantity = $request->input('products')[0]['quantity']; // Example, adjust as per needs
        $order->Total_price = $request->input('Total_price');
        $order->save();

        // Attach products to the order with pivot data
        foreach ($request->input('products') as $productData) {
            $product = Product::find($productData['id']);
            if ($product) {
                $order->products()->attach($product->id, [
                    'quantity' => $productData['quantity'],
                    'price_at_order' => $product->Price,
                ]);
            }
        }

        DB::commit();

        // Return response with order and associated products
        $orderWithProducts = Order::with('products')->find($order->id);

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $orderWithProducts,
        ], 201);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => 'Something went wrong while placing the order',
            'message' => $e->getMessage()
        ], 500);
    }
}


    /**
     * Display the specified order with product details.
     */
    public function show(string $id)
    {
        try {
            $order = Order::with('products')->findOrFail($id);

            return response()->json([
                'message' => 'Order details',
                'order' => $order
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Order not found'
            ], 404);
        }
    }

    /**
     * Retrieve orders by customer name and customer code with product details.
     */
    public function findOrderByCustomerCode(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => 'required|string|max:255|exists:customers,Customer_code',
            ]);

            $orders = Order::with('products')
                            ->where('Customer_name', $validatedData['Customer_name'])
                            ->where('Customer_code', $validatedData['Customer_code'])
                            ->get();

            return response()->json([
                'message' => 'Orders found for customer',
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Retrieve orders for a specific date with product details.
     */
    public function getOrderDailyDay(Request $request)
    {
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

            $orders = Order::with('products')
                           ->whereDate('created_at', $date)
                           ->get();

            return response()->json([
                'message' => 'Orders for ' . $date->toDateString(),
                'orders' => $orders
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while retrieving orders',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(string $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->delete();

            return response()->json([
                'message' => 'Order deleted successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Order not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong while deleting the order',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove all orders for a specific customer by customer name.
     */
    public function deleteOrdersByCustomerName(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'Customer_name' => 'required|string|max:255',
            ]);

            DB::beginTransaction();

            $ordersDeleted = Order::where('Customer_name', $validatedData['Customer_name'])->delete();

            DB::commit();

            return response()->json([
                'message' => 'All orders by the customer have been deleted',
                'orders_deleted' => $ordersDeleted
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Something went wrong while deleting orders',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
