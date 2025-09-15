<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
// database/migrations/xxxx_xx_xx_xxxxxx_create_dues_table.php

public function up(): void
{
    Schema::create('dues', function (Blueprint $table) {
        $table->id();
        // GANTI 'name' DENGAN 'user_id'
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('period');
        $table->decimal('amount', 15, 2);
        $table->enum('status', ['paid', 'unpaid'])->default('unpaid');
        $table->date('payment_date')->nullable();
        $table->timestamps();
    });
}
    public function down(): void {
        Schema::dropIfExists('dues');
    }
};