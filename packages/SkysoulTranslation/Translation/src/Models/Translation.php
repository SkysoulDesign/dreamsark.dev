<?php

namespace SkysoulDesign\Translation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

/**
 * Class Translation
 *
 * @package SkysoulDesign\Translation\Models
 */
class Translation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'translations';

    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Groups Relationship
     *
     * @return belongsToMany
     */
    public function groups() : belongsToMany
    {
        return $this->belongsToMany(Group::class, 'translation_group_translation');
    }

    /**
     * Language Relationship
     *
     * @return belongsTo
     */
    public function language() : belongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
