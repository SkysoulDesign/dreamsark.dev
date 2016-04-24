<?php

namespace DreamsArk\Models\Master;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Profile
 *
 * @package DreamsArk\Models\Profile
 */
class Profile extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profiles';

    /**
     * @var array
     */
    protected $fillable = ['name', 'display_name', 'description'];

    /**
     * Users Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
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
        return $this->belongsToMany(Question::class)->orderBy('category')->orderBy('order');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasOne
     */
    public function answer()
    {
        return $this->hasOne(Answer::class)->where('answers.id', $this->pivot->answer_id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function answers()
    {
        return $this->answer->questions();
    }

}
