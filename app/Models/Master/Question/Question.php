<?php

namespace DreamsArk\Models\Master\Question;

use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Master\Question\Pivot\AnswerQuestionPivot;
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

        /**
         * Construct this Pivot with instance of AnswerQuestionPivot when its instance of Answer
         */
        if ($parent instanceof Answer) {
            return new AnswerQuestionPivot($parent, $attributes, $table, $exists);
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
        /**
         * Check if Pivot relationship has been started
         * otherwise it might be a directly call from the Model
         */
        if ($this->relationLoaded('pivot')) {

            $pivot = $this->getRelation('pivot');

            /**
             * if its instance of AnswerQuestionPivot swap the table,
             * allowing it to get only answered options instead of all
             */
            if ($pivot instanceof AnswerQuestionPivot) {
                return $this->belongsToMany(Option::class, "answer_question_option")
                    ->wherePivot('answer_id', '=', $pivot->getAttribute('answer_id'));
            }

        }

        return $this->belongsToMany(Option::class, "question_option");
    }
}
