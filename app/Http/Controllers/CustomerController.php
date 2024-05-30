<?php

namespace App\Http\Controllers;

use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Crypt; 
use Illuminate\Validation\Rule;



class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $customers = Customer::orderBy('id')->get();
    
            return response()->json(['customers' => $customers]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while retrieving the customers'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getByName(Request $request)
    {
        try{
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
            ]);

            $customers = Customer::where('Customer_name', $validateData['Customer_name'])->get();

            if ($customers->isEmpty()){
                return response()->json(['error' => 'No customer found with this name!!!'], 404);
            }

            // $customers->transform(function ($customer) {
            //     $customer->Customer_code = Crypt::decryptString($customer->Customer_code);
            //     return $customer;
            // });

            return response()->json(['Customer status '=> $customers]);
        } catch(\Exception $e){
            return response()->json(['error' => 'An error occurred while retrieving the customers'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validateData = $request->validate([
                'Customer_name' => 'required|string|max:255',
                'Customer_code' => [
                    'required',
                    'string',
                    'max:4',
                    'unique:customers',
                    // Rule::unique('customers')->where(function ($query) use ($request) {
                    //     return $query->where('Customer_name', $request->Customer_name);
                    // })
                ],
                'Customer_loyalty' => 'integer|nullable'
            ]);

            // $validateData['Customer_code'] = Crypt::encryptString($request->Customer_code);
            $validateData['Customer_loyalty'] = $validateData['Customer_loyalty'] ?? 0;

            $customer = Customer::create($validateData);

            return response()->json([
                'message' => 'Customer created successfully....',
                'customer' => [
                    'id' => $customer->id,
                    'Customer_name' => $customer->Customer_name,
                    'Customer_code' => $customer->Customer_code,
                    'Customer_loyalty' => $customer->Customer_loyalty,
                    'created_at' => $customer->created_at,
                    'updated_at' => $customer->updated_at,
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['error' => $e->errors()] ,422);
        } catch (\Exception $e){
            return response()->json(['error' => 'An error occurred while creating the customer'], 500);
        }
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

    public function deleteall(){
        $cus = Customer::all();
        foreach ($cus as $customer) {
            $customer->delete();
        }
        return response()->json(['message' => 'all customers has benn removed.']);
    }

}
