<?php

namespace DreamsArk\Models\Master;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Questionnaire
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
    protected $fillable = ['question', 'type', 'options', 'order', 'category', 'is_primary'];

    /**
     * @var array
     */
    protected $casts = ['options' => 'array'];


}
