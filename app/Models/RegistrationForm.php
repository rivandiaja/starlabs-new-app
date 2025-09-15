<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class RegistrationForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'start_date', 'end_date', 
        'is_active', 'show_benefits', 'fields',
    ];

    protected $casts = [
        'fields' => 'array',
        'show_benefits' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = ['image_url'];

    /**
     * --- TAMBAHKAN METHOD INI ---
     * Relasi ke data pendaftar: Satu formulir memiliki banyak pendaftar.
     */
    public function submissions()
    {
        return $this->hasMany(RegistrationSubmission::class);
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? Storage::url($this->image) : null;
    }
}

