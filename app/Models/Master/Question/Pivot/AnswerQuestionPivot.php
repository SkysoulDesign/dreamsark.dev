<?php

namespace DreamsArk\Models\Master\Question\Pivot;

use DreamsArk\Models\Master\Question\Option;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Class ProfileQuestionPivot
 *
 * @package DreamsArk\Models\Master\Question\Pivot
 */
class AnswerQuestionPivot extends Pivot
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'answer_question';

    /**
     * Section Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function options()
    {
        return $this->belongsToMany(Option::class, "answer_question_option");
    }

}
