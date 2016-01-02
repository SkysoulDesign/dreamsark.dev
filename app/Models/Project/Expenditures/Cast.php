<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\ExpenditurePresenter;
use Illuminate\Database\Eloquent\Model;

class Cast extends Model
{

    use PresentableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_casts';

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
    public function position()
    {
        return $this->belongsTo(Position::class, 'expenditure_position_id');
    }

}
