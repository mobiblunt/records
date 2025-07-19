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
        Schema::create('return_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('address');
            $table->string('mobile')->nullable(); // Contact number if available
            $table->string('placement')->nullable();
            $table->date('last_visit_date')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->date('next_visit_date')->nullable();
            $table->integer('visit_count')->default(0); // Number of visits made
            
            $table->string('preferred_days')->nullable(); // Preferred days for visits
            
            $table->string('status')->default('pending'); // e.g., pending, completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_visits');
    }
};
