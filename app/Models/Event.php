<?php
// app/Models/Event.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'tag',
        'image',
    ];

    // Accessor untuk mendapatkan URL gambar lengkap
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return Storage::url($this->image);
        }
        // Gambar default jika tidak ada gambar yang di-upload
        return 'https://placehold.co/426x242/1E293B/FFFFFF?text=Event';
    }
}