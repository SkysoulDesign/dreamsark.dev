<?php

namespace DreamsArk\Models\Master\Question\Pivot;

use DreamsArk\Models\Master\Question\Section;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * Class ProfileQuestionPivot
 *
 * @package DreamsArk\Models\Master\Question\Pivot
 */
class ProfileQuestionPivot extends Pivot
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profile_question';

    protected $with = ['section'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['required' => 'boolean'];

    /**
     * Section Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function section()
    {
        return $this->belongsTo(Section::class);
    }

}
