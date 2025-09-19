<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'slug', 'image_path'];
    public function syllabuses() { return $this->hasMany(Syllabus::class); }
}
