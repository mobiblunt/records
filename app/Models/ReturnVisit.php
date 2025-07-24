<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class ReturnVisit extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'added_to_bible_student' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
