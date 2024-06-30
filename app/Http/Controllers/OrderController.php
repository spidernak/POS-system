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
                'products.*.id' => 'required|exists:products,id', // Ensure each product id exists in products table
                'products.*.quantity' => 'required|integer|min:1', // Ensure each product quantity is valid
            ]);

            $validateData['Customer_loyalty'] = $validateData['Customer_loyalty'] ?? 0;
            $productsData = $validateData['products'];

            DB::beginTransaction();

            // Create or find the customer
            $customer = Customer::firstOrCreate(
                ['Customer_code' => $validateData['Customer_code']],
                ['Customer_name' => $validateData['Customer_name'], 'Customer_loyalty' => $validateData['Customer_loyalty']]
            );

            $orders = [];
            $totalPrice = 0;

            foreach ($productsData as $productData) {
                $product = Product::findOrFail($productData['id']);

                // Calculate total price for the order item
                $totalPrice += $product->Price * $productData['quantity'];

                // Create order item
                $order = Order::create([
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Quantity' => $productData['quantity'],
                    'Total_price' => $product->Price * $productData['quantity'],
                ]);

                // Attach product to the order with pivot data
                $order->products()->attach($product->id, [
                    'quantity' => $productData['quantity'],
                    'price_at_order' => $product->Price,
                ]);

                // Decrease product quantity (optional if you want to manage stock)
                $product->Product_Quantity -= $productData['quantity'];
                $product->save();

                $orders[] = $order;
            }

            DB::commit();

            return response()->json([
                'message' => 'Customer and orders created successfully.',
                'customer' => [
                    'id' => $customer->id,
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Customer_loyalty' => $customer->Customer_loyalty,
                    'created_at' => $customer->created_at,
                    'updated_at' => $customer->updated_at,
                ],
                'orders' => $orders,
                'total_price' => $totalPrice,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while creating the customer and orders'], 500);
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
