<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void {
    Schema::create('registration_submissions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('registration_form_id')->constrained()->cascadeOnDelete();
        $table->json('data'); // Menyimpan semua data pendaftar
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_submissions');
    }
};
