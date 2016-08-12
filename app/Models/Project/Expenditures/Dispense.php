<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Dispense
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Dispense extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_crew_dispenses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'description'];

    /**
     * Crew Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function crew() : belongsTo
    {
        return $this->belongsTo(Crew::class);
    }

}
