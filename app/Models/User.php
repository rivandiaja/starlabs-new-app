<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use NotificationChannels\WebPush\HasPushSubscriptions;
use Illuminate\Support\Facades\Storage; // 1. Import Storage facade

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasPushSubscriptions;

    /**
     * The relationships that should always be loaded.
     * @var array
     */
    protected $with = ['role'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['avatar_url']; // 2. Tambahkan ini

    /**
     * The attributes that are mass assignable.
     * @var list<string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'gender', 'avatar', 'role_id',
        'google_id', 'google_token', 'google_refresh_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * @var list<string>
     */
    protected $hidden = [ 'password', 'remember_token', ];

    /**
     * The attributes that should be cast.
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi ke Role.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * --- 3. GANTI ACCESSOR LAMA DENGAN INI ---
     * Accessor untuk membuat URL avatar lengkap secara otomatis.
     */
    public function getAvatarUrlAttribute(): ?string
    {
        if ($this->avatar) {
            // Menggunakan Storage::url() untuk URL yang lebih andal
            return Storage::url($this->avatar);
        }
        // Kembalikan null jika tidak ada avatar
        return null;
    }
        public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }
    /**
     * Menentukan channel notifikasi privat untuk pengguna.
     */
    public function receivesBroadcastNotificationsOn(): string
    {
        return 'users.'.$this->id;
    }
}

