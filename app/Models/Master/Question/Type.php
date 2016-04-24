<?php

namespace DreamsArk\Models\Master\Question;

use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter\TypePresenter;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Type
 *
 * @package DreamsArk\Models\Master\Question
 */
class Type extends Model
{

    use PresentableTrait;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'question_types';

    /**
     * The attributes that are mass assignable.
     *
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
     * Presenter for this class
     *
     * @var TypePresenter
     */
    protected $presenter = TypePresenter::class;

    /**
     * Question Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

}
