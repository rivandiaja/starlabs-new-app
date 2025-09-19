<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Syllabus extends Model
{
    use HasFactory;

    /**
     * --- PERBAIKAN DI SINI ---
     * Secara eksplisit memberitahu Laravel nama tabel yang benar.
     */
    protected $table = 'syllabuses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'academy_id',
        'division_id',
        'pertemuan',
        'pemateri',
        'materi_utama',
        'sub_materi',
        'studi_kasus',
        'tujuan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'sub_materi' => 'array',
    ];

    /**
     * Relasi ke Academy.
     */
    public function academy()
    {
        return $this->belongsTo(Academy::class);
    }

    /**
     * Relasi ke Division.
     */
    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}