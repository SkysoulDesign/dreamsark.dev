<?php

namespace DreamsArk\Models\Master\Question;

use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Pivot\ProfileQuestionPivot;
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
     * Create a new pivot model instance.
     *
     * @param  \Illuminate\Database\Eloquent\Model $parent
     * @param  array $attributes
     * @param  string $table
     * @param  bool $exists
     * @return \Illuminate\Database\Eloquent\Relations\Pivot
     */
    public function newPivot(Model $parent, array $attributes, $table, $exists)
    {

        /**
         * Construct this Pivot with instance of ProfileQuestionPivot
         * Also Load Section along
         */
        if ($parent instanceof Profile) {
            return (new ProfileQuestionPivot($parent, $attributes, $table, $exists))->load('section');
        }

        return parent::newPivot($parent, $attributes, $table, $exists);

    }

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
