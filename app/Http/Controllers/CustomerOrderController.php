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
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => 'required|string|max:4',
                'Customer_loyalty' => 'integer|nullable',
                'products' => 'required|array|min:1',
                'products.*.Product_id' => 'required|exists:products,id',
                'products.*.Quantity' => 'required|integer|min:1',
            ]);

            $validateData['Customer_loyalty'] = $validateData['Customer_loyalty'] ?? 0;
            $productsData = $validateData['products'];

            DB::beginTransaction();

            $customer = Customer::firstOrCreate(
                ['Customer_code' => $validateData['Customer_code']],
                ['Customer_name' => $validateData['Customer_name'], 'Customer_loyalty' => $validateData['Customer_loyalty']]
            );

            $orders = [];
            $totalPrice = 0;

            foreach ($productsData as $productData) {
                $product = Product::findOrFail($productData['Product_id']);

                // Calculate total price for the order item
                $totalPrice += $product->Price * $productData['Quantity'];

                // Create order item
                $order = Order::create([
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Product_id' => $product->id,
                    'Quantity' => $productData['Quantity'],
                    'Total_price' => $product->Price * $productData['Quantity'],
                ]);

                // Decrease product quantity
                $product->Product_Quantity -= $productData['Quantity'];
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


}