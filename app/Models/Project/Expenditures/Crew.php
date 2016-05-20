<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\ExpenditurePresenter;
use Illuminate\Database\Eloquent\Model;

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
    protected $fillable = ['name', 'cost', 'description'];

    /**
     * Presenter for this class
     *
     * @var Presenter
     */
    protected $presenter = ExpenditurePresenter::class;

    /**
     * Expenditure Relationship
     */
    public function expenditure()
    {
        return $this->morphMany(Expenditure::class, 'expenditurable');
    }

    /**
     * Cast Relationship
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class, 'expenditure_profile_id');
    }

    /**
     * Enroller Relationship
     */
    public function enroller()
    {
        return $this->belongsTo(Enroller::class, 'enroller_id');
    }


}
