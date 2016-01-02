<?php

namespace DreamsArk\Models\Translation;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'languages';

    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'mysql-translation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];
}
