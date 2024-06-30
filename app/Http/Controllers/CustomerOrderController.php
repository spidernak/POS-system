<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CustomerOrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => 'required|string|max:4',
                'Customer_loyalty' => 'integer|nullable',
                'products' => 'required|array|min:1',
                'products.*.id' => 'required|exists:products,id',
                'products.*.quantity' => 'required|integer|min:1',
            ]);

            // Ensure Customer exists or create a new one
            $customer = Customer::firstOrCreate(
                ['Customer_code' => $validatedData['Customer_code']],
                [
                    'Customer_name' => $validatedData['Customer_name'],
                    'Customer_loyalty' => $validatedData['Customer_loyalty'] ?? 0
                ]
            );

            // Start a database transaction
            DB::beginTransaction();

            // Initialize total price
            $totalPrice = 0;

            // Create each order item and attach products
            $orders = [];
            foreach ($validatedData['products'] as $productData) {
                $product = Product::find($productData['id']);

                // Calculate total price for this order item
                $itemTotalPrice = $product->Price * $productData['quantity'];
                $totalPrice += $itemTotalPrice;

                // Create order and attach product
                $order = new Order([
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Quantity' => $productData['quantity'],
                    'Total_price' => $itemTotalPrice,
                ]);
                $customer->orders()->save($order);
                $order->products()->attach($product->id, [
                    'quantity' => $productData['quantity'],
                    'price_at_order' => $product->Price,
                ]);

                // Decrease product quantity
                $product->Product_Quantity -= $productData['quantity'];
                $product->save();

                // Add the order to the response array
                $orders[] = $order;
            }

            // Commit the transaction
            DB::commit();

            // Return success response with created customer, orders, and total price
            return response()->json([
                'message' => 'Customer and orders created successfully.',
                'customer' => $customer,
                'orders' => $orders,
                'total_price' => $totalPrice,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while creating the customer and orders'], 500);
        }
    }
}
