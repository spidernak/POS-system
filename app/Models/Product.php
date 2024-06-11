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
    public function type()
    {
        return $this->belongsTo(Type::class, 'Type');
    }
    
    public function orders()
    {
        return $this->hasMany(Order::class);
    }


}
