<?php

namespace DreamsArk\Models\User;

use Illuminate\Database\Eloquent\Model;

class Bag extends Model
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'bags';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
