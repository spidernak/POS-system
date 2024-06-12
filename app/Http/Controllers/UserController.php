<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::get();
        return response()->json(['User' => $user]);
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
        try{
            $validateData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|max:8',
            ]);

            $user = User::create($validateData);

            return response()->json(['message' => 'New User creaetd successfully..', 'User ' => $user]);
        } catch(\Illuminate\Validation\ValidationException $e){
            return response()->json([ 'message' => 'Validation error.',
            'errors' => $e->errors()],422);
        } catch(\Exception $e){
            return response()->json([
                'message' => 'An error occureed while creating new user',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function login(Request $request)
{
    $validateData = $request->validate([
        'name' => 'required|string|max:255',
        'password' => 'required|string|max:255',
    ]);

    // Find the user by name
    $user = User::where('name', $validateData['name'])->first();

    // Check if the user exists and the provided password matches the hashed password
    if ($user && Hash::check($validateData['password'], $user->password)) {
        return response()->json(['message' => 'Login successful', 'user' => $user]);
    } else {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $user = User::findOrFail($id);
            return response()->json(['User' => $user]);
        } catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return response()->json(['error' => 'There no product found relate with id '.$id],404);
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
        try{
            $validateData = $request->validate([
                'password' => 'sometimes|required|string|max:8',
            ]);

            $user = User::find($id);
            if(!$user){
                return response()->json([
                    'error' => 'There no user found with id '.$id
                ]);
            }

            $user->update($validateData);
            return response()->json(['message' => 'User has been updated successfully...']);
        } catch(\Illuminate\Validation\ValidationException $e){
            return response()->json(['error' => $e->errors()],422);
        } catch(\Exception $d){
            return response()->json([
                'message' => 'Something went wrong while retrieving ...',
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            if ($id == 1) {
                return response()->json([
                    'error' => 'Deletion of user with ID 1 is not allowed.',
                ], 403); 
            }
    
            $removeUser = User::find($id);
    
            if (!$removeUser) {
                return response()->json([
                    'error' => 'No user found with ID ' . $id,
                ], 404); 
            }
    
            $removeUser->delete();
            return response()->json(['message' => 'User ID ' . $id . ' has been removed successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong while deleting the user.'], 500); // 500 Internal Server Error status
        }
    }
    

    public function removeUserByEmail(Request $request)
    {
        try{
            $validateData = $request->validate([
                'email' => 'required|email|max:255',
            ]);

            DB::beginTransaction();

            $user = User::where('email', $validateData['email']);

            if(!$user){
                return response()->json(['error' => 'Customer not found'], 404);
            }

            User::where('email', $validateData['email'])->delete();
            DB::commit();
            return response()->json(['message' => 'User have been deleted'], 200);
        } catch(\Exception $d){
            DB::rollBack();
            return response()->json(['message' => 'All orders by the customer have been deleted'], 200);
        }
    }
}
