<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;
use App\Models\Product;
use Illuminate\Validation\ValidationException;
use Exception;


class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //list all types of products
    {
        $type = Type::latest()->get();
        return response()->json(['Type' =>$type]);
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
    public function store(Request $request) //creaet new type of product
    {
        try {
            $validatedData = $request->validate([
                'Type' => 'required|string|max:255|unique:types,Type',
            ]);
    
            $type = new Type();
            $type->Type = $validatedData['Type'];
            $type->save();
    
            return response()->json([
                'message' => 'This type of product created successfully.',
                'Type' => $type
            ]);
    
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error.',
                'errors' => $e->errors()
            ], 422);
    
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the type.',
                'error' => $e->getMessage()
            ], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) //find type of product by its ID
    {
        try{
            $type = Type::findOrFail($id);
            return response()->json(['Type'=> $type]);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json(['error'=> 'No Type of product found relate with id '.$id],404);
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
    public function update(Request $request, string $id) //update type of product
    {
        try {
            $validatedData = $request->validate([
                'Type' => 'sometimes|required|string|max:255|unique:types,Type,' . $id,
            ]);
    
            $type = Type::find($id);
    
            if (!$type) {
                return response()->json(['error' => 'No Type found with id ' . $id], 404);
            }
    
            $oldName = $type->Type;
            $type->update($validatedData);
            $newName = $type->Type;
    
            return response()->json([
                'message' => 'Type of product updated successfully...',
                'Old Type name' => $oldName,
                'New Type name' => $newName,
            ]);
    
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } 
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) // remove type of product from system 
    {
        try {
            $type = Type::find($id);
    
            if (!$type) {
                return response()->json(['error' => 'No Type found with id ' . $id], 404);
            }
    
            $relatedProductsCount = Product::where('Type_of_product', $type->Type)->count();
            if ($relatedProductsCount > 0) {
                return response()->json(['error' => 'Cannot delete type ' . $type->Type . ' because there are ' . $relatedProductsCount . ' products associated with it.'], 400);
            }
    
            $name = $type->Type;
            $type->delete();
    
            return response()->json(['message' => 'The type name ' . $name . ' removed successfully.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while trying to remove the type.'], 500);
        }
    }
}


