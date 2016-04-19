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
    protected $fillable = ['user_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function answer()
    {
        return $this->belongsToMany(Answer::class);
    }

}
