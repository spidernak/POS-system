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
            $orders = Order::with('products')
                           ->select('id', 'Customer_name', 'Customer_code', 'Quantity', 'Total_price', 'created_at', 'updated_at')
                           ->latest()->get();
    
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
        $order = Order::with('products')
                      ->where('id', $orderId)
                      ->first();
    
        // Accessing products with pivot data
        foreach ($order->products as $product) {
            echo "Product Name: {$product->Product_name}<br>";
            echo "Quantity: {$product->pivot->quantity}<br>";
            echo "Price at Order: {$product->pivot->price_at_order}<br>";
        }
    
        return $order;
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
    try {
        $validateData = $request->validate([
            'Customer_name' => 'required|string|max:255',
            'Customer_code' => 'required|string|max:4',
            'Customer_loyalty' => 'integer|nullable',
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $validateData['Customer_loyalty'] = $validateData['Customer_loyalty'] ?? 0;
        $productsData = $validateData['products'];

        DB::beginTransaction();

        $customer = Customer::firstOrCreate(
            ['Customer_code' => $validateData['Customer_code']],
            ['Customer_name' => $validateData['Customer_name'], 'Customer_loyalty' => $validateData['Customer_loyalty']]
        );

        $orders = [];
        $totalProductsOrdered = 0;
        $existingOrder = null;

        $existingOrder = Order::where('Customer_code', $validateData['Customer_code'])
            ->where('Customer_name', $validateData['Customer_name'])
            ->first();

        if (!$existingOrder) {
            $existingOrder = Order::create([
                'Customer_name' => $customer->Customer_name,
                'Customer_code' => $customer->Customer_code,
                'Quantity' => 0,
                'Total_price' => 0,
            ]);
        }

        foreach ($productsData as $productData) {
            $product = Product::findOrFail($productData['id']);

            if ($product->Product_Quantity < $productData['quantity']) {
                DB::rollBack();
                return response()->json([
                    'error' => 'Insufficient product quantity available.',
                    'available_quantity' => $product->Product_Quantity
                ], 400);
            }

            $product->decrement('Product_Quantity', $productData['quantity']);

            $totalProductsOrdered += $productData['quantity'];

            $existingOrderProduct = $existingOrder->products()->where('product_id', $productData['id'])->first();

            if ($existingOrderProduct) {
                $existingOrderProduct->pivot->quantity += $productData['quantity'];
                $existingOrderProduct->pivot->save();
            } else {
                $existingOrder->products()->attach($product->id, [
                    'quantity' => $productData['quantity'],
                    'price_at_order' => $product->Price,
                ]);
            }

            $existingOrder->Quantity += $productData['quantity'];
            $existingOrder->Total_price += $product->Price * $productData['quantity'];
            $existingOrder->save();
        }

        $orders[] = [
            'id' => $existingOrder->id,
            'Customer_name' => $existingOrder->Customer_name,
            'Customer_code' => $existingOrder->Customer_code,
            'Quantity' => $existingOrder->Quantity,
            'Total_price' => $existingOrder->Total_price,
            'created_at' => $existingOrder->created_at,
            'updated_at' => $existingOrder->updated_at,
            'products' => $existingOrder->products, 
        ];

        if ($totalProductsOrdered > 3) {
            $customer->Customer_loyalty += 2;  
        } elseif ($totalProductsOrdered > 2) {
            $customer->Customer_loyalty += 1;  
        }

        $customer->save();

        DB::commit();

        return response()->json($orders, 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'An error occurred while creating the customer and orders'], 500);
    }
}




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
