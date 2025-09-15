<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dues extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id', // Pastikan user_id ada di sini
        'period', 
        'amount', 
        'status', 
        'payment_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'payment_date' => 'date',
        'amount' => 'float',
    ];

    /**
     * Mendefinisikan relasi bahwa Dues ini "milik" satu User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}