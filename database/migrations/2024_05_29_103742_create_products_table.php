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
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->string('Product_name');
                $table->string('Type_of_product'); 
                $table->foreign('Type_of_product')->references('Type')->on('types')->onDelete('cascade');
                $table->string('Image');
                $table->enum('size',['small','medium','large']);
                $table->double('Price');
                $table->integer('Product_Quantity');
                $table->timestamps();
            });
        }
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
