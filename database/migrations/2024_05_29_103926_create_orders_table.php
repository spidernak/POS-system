<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('Customer_name');
            $table->string('Customer_code');
            $table->foreign('Customer_code')->references('Customer_code')->on('customers')->onDelete('cascade');
            $table->unsignedBigInteger('Product_id'); 
            $table->foreign('Product_id')->references('id')->on('products')->onDelete('cascade');
            $table->integer('Quantity');
            $table->double('Total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
