<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'Product_name',
        'Type_of_product',
        'Image',
        'size',
        'Price',
        'Product_Quantity',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class)
                    ->withPivot('quantity', 'price_at_order');
    }


    public function type()
    {
        return $this->belongsTo(Type::class, 'Type');
    }
    
    

}
