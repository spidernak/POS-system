<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'Customer_name',
        'Customer_code',
        'Customer_loyalty',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'Customer_name', 'Customer_code');
    }
    
}
