<?php

namespace DreamsArk\Models\Master;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Questionnaire
 *
 * @package DreamsArk\Models\Master
 */
class Question extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'questions';

    /**
     * @var array
     */
    protected $fillable = ['question', 'category', 'description', 'type', 'options', 'order', 'is_primary'];

    /**
     * @var $casts array
     */
    protected $casts = [
        'options' => 'array'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function answer()
    {
        return $this->hasMany(Answer::class);
    }

}
