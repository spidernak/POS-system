<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'Customer_name',
        'Product_id',
        'Quantity',
        'Total_price',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'Customer_name', 'Customer_code');
    }
}
