<?php

namespace DreamsArk\Models\User;

use Illuminate\Database\Eloquent\Model;

class Socialite extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_socialite';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['auth_type', 'user_id', 'auth_id', 'auth_email', 'auth_token', 'avatar_path'];

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
