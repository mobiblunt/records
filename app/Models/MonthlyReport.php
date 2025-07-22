<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MonthlyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'month', // Format: YYYY-MM
        'field_hours',
        'return_visits',
        'bible_studies',
        'bible_students',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
