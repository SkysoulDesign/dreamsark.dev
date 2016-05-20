<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\ScopeAbleTrait;
use DreamsArk\Models\Traits\VotableTrait;
use DreamsArk\Repositories\Project\Fund\FundRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class Fund extends Model
{
    use ProjectableTrait, VotableTrait, EnrollableTrait, ScopeAbleTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'funds';

    /**
     * Define Which is the next Model
     */
    protected $next = Distribution::class;

    /**
     * Define this model Repository.
     *
     * @var string
     */
    public $repository = FundRepositoryInterface::class;

}
