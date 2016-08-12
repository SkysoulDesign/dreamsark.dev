<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\ExpenditurePresenter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * Class Crew
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Crew extends Model
{

    use PresentableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_crews';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * Presenter for this class
     *
     * @var Presenter
     */
    protected $presenter = ExpenditurePresenter::class;

    /**
     * Expenditure Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\morphOne
     */
    public function expenditure() : morphOne
    {
        return $this->morphOne(Expenditure::class, 'expenditurable');
    }

    /**
     * Cast Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function profile() : belongsTo
    {
        return $this->belongsTo(Profile::class, 'expenditure_profile_id');
    }

    /**
     * Enroller Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function enroller() : belongsTo
    {
        return $this->belongsTo(Enroller::class, 'enroller_id');
    }

    /**
     * Enroller Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function dispenses() : hasMany
    {
        return $this->hasMany(Dispense::class);
    }
}
