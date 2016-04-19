<?php

namespace DreamsArk\Models\Master;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Questionnaire
 * @package DreamsArk\Models\Master
 */
class Questionnaire extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'questionnaires';

    /**
     * @var array
     */
    protected $fillable = ['user_id'];

    /**
     * @var array
     */
    protected $casts = ['options' => 'array'];

    public function answer(){
        return $this->belongsTo(Answer::class);
    }

}
