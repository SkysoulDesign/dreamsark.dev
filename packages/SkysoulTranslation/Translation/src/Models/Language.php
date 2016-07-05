<?php

namespace SkysoulDesign\Translation\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Language
 *
 * @package SkysoulDesign\Translation\Models
 */
class Language extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'translation_languages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];
}
