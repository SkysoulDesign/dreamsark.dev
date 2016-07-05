<?php

namespace SkysoulDesign\Translation\Models;

use Illuminate\Database\Eloquent\Model;

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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->belongsToMany(Translation::class);
    }

}
