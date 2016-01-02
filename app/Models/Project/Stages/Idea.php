<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use DreamsArk\Models\Traits\VotableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\IdeaPresenter;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use ProjectableTrait, VotableTrait, SubmissibleTrait;

    /**
     * Defines the minimum of submission this model
     * should have to be considered not failed
     */
    const MINIMUM_OF_SUBMISSIONS = 1;

    /**
     * Define this model Repository.
     *
     * @var string
     */
    public $repository = IdeaRepositoryInterface::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ideas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content', 'reward'];

    /**
     * Presenter for this class
     *
     * @var Presenter
     */
    protected $presenter = IdeaPresenter::class;

    /**
     * Define Which is the next Model
     */
    protected $next = Synapse::class;

}
