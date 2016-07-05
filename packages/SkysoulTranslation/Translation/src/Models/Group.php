<?php

namespace SkysoulDesign\Translation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

/**
 * Class Group
 *
 * @package SkysoulDesign\Translation\Models
 */
class Group extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'translation_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Translation Relationship
     *
     * @return belongsToMany
     */
    public function translations() : belongsToMany
    {
        return $this->belongsToMany(Translation::class, 'translation_group_translation');
    }

}
