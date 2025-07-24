<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('return_visits', function (Blueprint $table) {
            $table->boolean('added_to_bible_student')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('return_visits', function (Blueprint $table) {
            $table->dropColumn('added_to_bible_student');
        });
    }
};
