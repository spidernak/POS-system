<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class CustomerOrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => [
                    'required',
                    'string',
                    'max:4',
                    'exists:customers,Customer_code',
                ],
                'Customer_loyalty' => 'integer|nullable',
                'Product_id' => 'required|exists:products,id',
                'Quantity' => 'required|integer|min:1',
                'Total_price' => 'required|numeric|min:0'
            ]);

            $validateData['Customer_loyalty'] = $validateData['Customer_loyalty'] ?? 0;

            DB::beginTransaction();

            $customer = Customer::firstOrCreate(
                ['Customer_code' => $validateData['Customer_code']],
                ['Customer_name' => $validateData['Customer_name'], 'Customer_loyalty' => $validateData['Customer_loyalty']]
            );

            $order = Order::create([
                'Customer_name' => $customer->Customer_name, 
                'Product_id' => $request->query('Product_id'),
                'Quantity' => $request->query('Quantity'),
                'Total_price' => $request->query('Total_price')
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Customer and order created successfully.',
                'customer' => [
                    'id' => $customer->id,
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Customer_loyalty' => $customer->Customer_loyalty,
                    'created_at' => $customer->created_at,
                    'updated_at' => $customer->updated_at,
                ],
                'order' => $order,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'An error occurred while creating the customer and order'], 500);
        }
    }
}
