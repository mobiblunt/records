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
        // First, backup any existing data
    $existingData = DB::table('bible_studies')->get();
    
    // Drop the problematic table
    Schema::dropIfExists('bible_studies');
    
    // Recreate without foreign key constraints
    Schema::create('bible_studies', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('user_id');
        $table->unsignedBigInteger('bible_student_id')->nullable();
        $table->string('name');
        $table->date('date');
        $table->string('publication');
        $table->text('notes')->nullable();
        $table->timestamps();
        
        // Just indexes, no foreign key constraints
        $table->index('user_id');
        $table->index('bible_student_id');
    });
    
    // Restore the data if any existed
    if ($existingData->isNotEmpty()) {
        foreach ($existingData as $record) {
            DB::table('bible_studies')->insert((array) $record);
        }
    }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_studies');
    }
};
