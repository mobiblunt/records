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
        Schema::table('bible_studies', function (Blueprint $table) {
            $table->dropForeign(['bible_student_id']);
        
        // Recreate it properly
        $table->foreign('bible_student_id')->references('id')->on('bible_students')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bible_studies', function (Blueprint $table) {
            $table->dropForeign(['bible_student_id']);
        $table->foreignId('bible_student_id')->nullable()->constrained('bible_students')->onDelete('cascade');
        });
    }
};
