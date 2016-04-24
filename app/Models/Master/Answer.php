<?php

namespace DreamsArk\Models\Master;

use DreamsArk\Models\Master\Question\Question;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Questionnaire
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
    protected $fillable = ['question', 'type', 'options', 'order', 'category', 'is_primary', 'user_id', 'profile_id', 'question_id'];

    /**
     * @var array
     */
    protected $casts = ['options' => 'array'];

    /**
     * Question relationship
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


}
