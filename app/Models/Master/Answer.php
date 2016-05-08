<?php

namespace DreamsArk\Models\Master;

use DreamsArk\Models\Master\Question\Option;
use DreamsArk\Models\Master\Question\Question;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Answer
 *
 * @package DreamsArk\Models\Master
 */
class Answer extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'answers';

    /**
     * @var array
     */
    protected $fillable = ['profile_id'];

    /**
     * Question relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function questions()
    {
        return $this->belongsToMany(Question::class)->withPivot('content');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * Option Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function options()
    {
        return $this->belongsToMany(Option::class, 'answer_question_option');
    }

}
