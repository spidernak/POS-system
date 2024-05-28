<?php

namespace App\Http\Controllers;

use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customer = Customer::all();
        return response()->json(['all customer ' => $customer]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getByName(Request $request)
    {
        $request->validate([
            'Customer_name' => 'required|string|max:255',
        ]);

        $customerName = $request->input('Customer_name');
        $customers = Customer::where('Customer_name', $customerName)->get();

        if ($customers->isEmpty()) {
            return response()->json(['message' => 'No customers found with this name'], 404);
        }

        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // try{
            $validdateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'product_name' => 'required|string|max:255',
                'size' => 'required|in:small,medium,big',
                'quantity' => 'required|integer',
                'total_price' => 'required|numeric',
            ]);
            $customer = Customer::create($validdateData);
            return response()->json(['message' => 'Customer created succesfully...']);
        // }catch(ValidationException $e){
        //     return response()->json(['error' => ])
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $customer = Customer::findOrFail($id);
            return response()->json(['Client status with id '.$id => $customer]);
        }catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json(['error' => 'Customer with id '.$id.' not found!!!!']);
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
        $customer = Customer::find($id);
        if(!$customer){
            return response()->json(['error' => 'No customer found with id '.$id], 404);
        }

        $validateData = $request->validate([
            'Customer_name' => 'sometimes|required|string|max:255',
            'product_name' => 'sometimes|required|string|max:255',
            'size' => 'sometimes|required|in:small,medium,big',
            'quantity' => 'sometimes|required|integer',
            'total_price' => 'sometimes|required|numeric',
        ]);

        $customerName = $customer->Customer_name;
        $customer->update($validateData);

        return response()->json([
            'message' => 'Customer name ' .$customerName.' with id '.$id.' status has updated...', 
            'customer' => $customer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $customer = Customer::find($id);
    if (!$customer) {
        return response()->json(['error' => 'No Customer found with id ' . $id], 404);
    }

    $customerName = $customer->Customer_name;
    $customer->delete();

    return response()->json([
        'message' => 'Customer id ' . $id . ' has been removed from this system',
        'customer_id' => $id,
        'customer_name' => $customerName
    ]);
}

}
