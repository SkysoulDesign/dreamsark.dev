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
     * @var string
     */
    protected $table = 'questionnaire';

    /**
     * @var array
     */
    protected $fillable = ['question', 'type', 'options', 'order', 'category', 'is_primary'];

    /**
     * @var array
     */
    protected $casts = ['options' => 'array'];

}