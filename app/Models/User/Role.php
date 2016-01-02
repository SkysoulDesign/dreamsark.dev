<?php

namespace DreamsArk\Models\User;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'display_name', 'description'];

    /**
     * Users Relationship
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
