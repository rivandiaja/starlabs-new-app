<?php
// app/Models/Schedule.php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description', 'date', 'start_time', 'end_time', 'location'];
    protected $casts = ['date' => 'date'];
}