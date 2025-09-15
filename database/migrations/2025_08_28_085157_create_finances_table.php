<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_finances_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('finances', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('category');
            $table->text('description');
            $table->enum('type', ['income', 'expense']);
            $table->decimal('amount', 15, 2);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('finances');
    }
};