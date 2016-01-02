<?php

namespace DreamsArk\Models\Translation;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'translations';

    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'mysql-translation';

    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Groups Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    /**
     * Language Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
