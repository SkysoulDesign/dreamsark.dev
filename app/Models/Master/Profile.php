<?php

namespace DreamsArk\Models\Master;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Profile
 * @package DreamsArk\Models\Profile
 */
class Profile extends Model
{
    /**
     * @var string
     */
    protected $table = 'profile';

    /**
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function questions()
    {
        return $this->belongsToMany(Questionnaire::class, 'profile_questionnaire');
    }
}
