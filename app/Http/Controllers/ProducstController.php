<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


class ProducstController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $pro = Product::latest()->get();
            return response()->json([
                'message' => 'Here all created product',
                'Product_information' =>$pro
            ]);
        } catch(\Exception $e){
            return response()->json(['error' => 'There are no products found!!!!']);
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
        try {
            $validatedData = $request->validate([
                'Product_name' => 'required|string|max:255',
                'Type_of_product' => 'required|string|exists:types,Type',
                'Image' => 'required|image|max:2048',  
                'size' => 'required|in:small,medium,large',
                'Price' => 'required|numeric',
                'Product_Quantity' => 'required|integer',
            ]);
    
            if ($request->hasFile('Image')) {
                $file = $request->file('Image');
                $originalName = $file->getClientOriginalName();
                $filePath = $file->storeAs('product_images', $originalName, 'public');
                $validatedData['Image'] = $filePath;
            }
    
            $product = Product::create($validatedData);
    
            return response()->json([
                'message' => 'New product created successfully',
                'Product' => $product
            ]);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error.',
                'errors' => $e->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the product.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    


    public function findByName(Request $request)
    {
        try{
            $validateData = $request->validate([
                'Product_name' => 'required|string|max:255',
            ]);

            $product = Product::where('Product_name', $validateData['Product_name'])->get();

            if($product->isEmpty()){
                return response()->json(['error' => 'There no Product found!!!'],404);
            }

            return response()->json(['Product status' => $product]);
        } catch(\Exception $e){
            return response()->json(['error' => 'An error occurred while retrieving the product'], 500);
        }
   }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $pro = Product::findOrFail($id);
            return response()->json(['Product status' => $pro]);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json(['erro' => 'No product found with id '.$id],404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }


    public function getProductByType(Request $request)
    {
        try{
            $validateData = $request->validate([
                'Type_of_product' => 'required|string|max:255',
                'size' => 'required|in:small,medium,large',
            ]);

            $findProductByName = Product::where('Type_of_product', $validateData['Type_of_product'])
                                        ->where('size' , $validateData['size'])
                                        ->get();

            if ($findProductByName->isEmpty()){
                return response()->json(['error' => 'No product found!!!'],404);
            }

            return response()->json(['Product list' => $findProductByName]);
        } catch(\Exception $d){
            return response()->json(['error' => 'Something went wrong while retrieving product'],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{

            $validatedData = $request->validate([
                'Product_name' => 'sometimes|required|string|max:255',
                'Type_of_product' => 'sometimes|required|string|max:255|exists:types,Type',
                'Image' => 'sometimes|required|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'size' => 'sometimes|required|in:small,medium,large',
                'Price' => 'sometimes|required|numeric',
                'Product_Quantity' => 'sometimes|required|integer',
            ]);

            $product = Product::find($id);
            if (!$product){
                return response()->json(['error' => 'There no product found!!!'],404);
            }
            $product->update($validatedData);

            return response()->json([
                'message' => 'Product updated successfully....',
                'Product status' => $product,
            ],200);
        } catch(\Illuminate\Validation\ValidationException $e){
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the product.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function viewQuantityOfProduct()
    {
        try{
            $quatities = DB::table('products')
                ->select('Product_name', 'size', 'Price', 'Image', DB::raw('SUM(Product_Quantity) as total_quantity'))
                ->groupBy('Product_name', 'size', 'Price', 'Image')->get();

                return response()->json($quatities , 200);
        } catch(\Exception $e){
            return response()->json(['
                message' => 'Somethings went wrong while retieving',
                'error' => $e->getMessage()
            ],500);
        }
    }
    public function viewQuantityOfProductbytype()
    {
        try{
            $quatities = DB::table('products')
                ->select('Type_of_product', DB::raw('SUM(Product_Quantity) as total_quantity'))
                ->groupBy('Type_of_product')->get();

                return response()->json($quatities , 200);
        } catch(\Exception $e){
            return response()->json(['
                message' => 'Somethings went wrong while retieving',
                'error' => $e->getMessage()
            ],500);
        }
    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $pro = Product::find($id);

            if(!$pro){
                return response()->json(['error' => 'There no product found!!!']);
            }
            $proName = $pro->Product_name;
            $pro->delete();
            return response()->json(['message' => 'Product name ' .$proName. ' remove successfully...'],200);
        } catch(\Exception $e){
            return response()->json(['error' => 'somthing went wrong!!!!']);
        }
    }
}
