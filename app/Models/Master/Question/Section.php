<?php

namespace DreamsArk\Models\Master\Question;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Section
 *
 * @package DreamsArk\Models\Master\Question
 */
class Section extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'question_sections';

    /**
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Hash the Password Before Saving
     *
     * @param $name
     */
    public function setNameAttribute($name)
    {
        $this->attributes['name'] = snake_case(studly_case($name));
    }

    /**
     * Question Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'profile_question');
    }

}