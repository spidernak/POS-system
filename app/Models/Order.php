<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'Customer_name',
    //     'Customer_code',
    //     'Product_id',
    //     'Quantity',
    //     'Total_price',
    // ];

    // public function customer()
    // {
    //     return $this->belongsTo(Customer::class, 'Customer_code', 'Customer_code');
    // }

    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }

    protected $fillable = [
        'Customer_name',
        'Customer_code',
        'Quantity',
        'Total_price',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)
                    ->withPivot('quantity', 'price_at_order')
                    ->withTimestamps();
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'Customer_code', 'Customer_code');
    }
}
