<?php

namespace DreamsArk\Models\Master\Question;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class Option
 *
 * @package DreamsArk\Models\Master\Question
 */
class Option extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'question_options';

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
     * Return Clean Name
     *
     * @return string
     */
    public function getCleanNameAttribute()
    {
        return Str::title(str_replace(['-', '_'], ' ' , $this->name));
    }

    /**
     * Questions Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'question_option');
    }

}