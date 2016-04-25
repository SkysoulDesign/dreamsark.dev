<?php

namespace DreamsArk\Models\Master\Question;

use DreamsArk\Models\Master\Answer;
use DreamsArk\Presenters\PresentableTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Questionnaire
 *
 * @package DreamsArk\Models\Master
 */
class Question extends Model
{

    use PresentableTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'questions';

    /**
     * @var array
     */
    protected $fillable = ['question'];

    /**
     * @var $casts array
     */
    protected $casts = [
        'options' => 'array'
    ];

    /**
     * Answer Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function answer()
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Type Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    /**
     * Options Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function options()
    {
        return $this->belongsToMany(Option::class, 'question_option');
    }

}
