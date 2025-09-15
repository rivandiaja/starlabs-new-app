<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationSubmission extends Model
{
    protected $fillable = ['registration_form_id', 'data'];
    protected $casts = ['data' => 'array'];
}
