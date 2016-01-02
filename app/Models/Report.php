<?php

namespace DreamsArk\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'reports';

    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'mysql-report';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['url', 'feedback', 'type'];

}
