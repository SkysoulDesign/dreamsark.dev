<?php

namespace DreamsArk\Models\Master\Question;

use Illuminate\Database\Eloquent\Model;

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
    protected $fillable = ['name', 'display_name'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

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