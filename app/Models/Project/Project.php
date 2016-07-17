<?php

namespace DreamsArk\Models\Project;

use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Stages\Distribution;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Models\User\User;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\ProjectPresenter;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Query\Builder;

/**
 * Class Project
 *
 * @package DreamsArk\Models\Project
 */
class Project extends Model
{
    
    use PresentableTrait;

    /**
     * Define this model Repository.
     *
     * @var string
     */
    public $repository = ProjectRepositoryInterface::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Presenter for this class
     *
     * @var Presenter
     */
    protected $presenter = ProjectPresenter::class;

    /**
     * Add "ORDER BY" to query object
     *
     * @param        $query
     * @param string $orderBy
     *
     * @return mixed
     */
    public function addOrderBy($query, $orderBy = '')
    {
        return $query->orderBy('updated_at', ($orderBy ?: 'desc'));
    }

    /**
     * Scope a query to only show active entries.
     *
     * @param $query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        $query->whereHas('synapse', function ($query) {
            $query->select('id')->where('active', '=', true);
        })->orWhereHas('idea', function ($query) {
            $query->select('id')->where('active', '=', true);
        })->orWhereHas('script', function ($query) {
            $query->select('id')->where('active', '=', true);
        });

        return $this->addOrderBy($query->where('active', true));
    }

    /**
     * Scope a query to only show failed entries.
     *
     * @param $query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFailed($query)
    {
        return $this->addOrderBy($query->where('active', false));
    }

    /**
     * Alias to User Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function creator()
    {
        return $this->user();
    }

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get Reward Relation of Next Stage
     *
     * @return mixed
     */
    public function getNextStageReward($type = '')
    {
        return $this->rewards()->where('rewardable_type', ($type ?: get_class($this->stage->next())));
    }

    /**
     * Relation to ProjectReward Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }

    /**
     * Idea Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function idea() : hasOne
    {
        return $this->hasOne(Idea::class);
    }

    /**
     * Synapse Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function synapse() : hasOne
    {
        return $this->hasOne(Synapse::class);
    }

    /**
     * Script Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function script() : hasOne
    {
        return $this->hasOne(Script::class);
    }

    /**
     * Script Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function review() : hasOne
    {
        return $this->hasOne(Review::class);
    }

    /**
     * Fund Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function fund() : hasOne
    {
        return $this->hasOne(Fund::class);
    }

    /**
     * Distribution Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function distribution() : hasOne
    {
        return $this->hasOne(Distribution::class);
    }

    /**
     * Returns the right Relationship for the current project stage
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function stage() : hasOne
    {
        return $this->{$this->type}();
    }

    /**
     * Get what is the next stage of this project
     *
     * @return string
     */
    public function nextStageName() : string
    {
        return strtolower(class_basename($this->stage->next()));
    }

    /**
     * Alias - Returns all Enrollable Expenditures
     *
     * @return mixed
     */
    public function enrollable()
    {
        return $this->expenditures()->enrollable();
    }

    /**
     * Alias - Returns all Expensable Expenditures
     *
     * @return mixed
     */
    public function expensable()
    {
        return $this->expenditures()->expensable();
    }

    /**
     * Expenditure Relationship
     */
    public function expenditures()
    {
        return $this->hasMany(Expenditure::class);
    }

    /**
     * Backers Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function backers()
    {
        return $this->belongsToMany(User::class, 'project_backer')
            ->withPivot('amount')->withTimestamps()
            ->orderBy('project_backer.amount', 'desc')->orderBy('project_backer.user_id');
    }

    public function enrollVoteTotal()
    {
        /** @var Collection $voteSum */
        $voteSum = $this->enrollable->pluck('enrollers')->map(function ($item) {
            if ($item)
                return $item->pluck('enrollvotes');
        })->flatten();

        return $voteSum->sum('amount');
    }

    /**
     * sum of amount received from "Project Backers" & "voters to enrollers"
     */
    public function totalCollected()
    {
        return $this->backers->sum('pivot.amount') + $this->enrollVoteTotal();
    }

    /**
     * @param Builder $query
     */
    public function scopeActives($query)
    {
        $query->whereHas('synapse', function ($query) {
            $query->where('active', '=', true);
        })->orWhereHas('idea', function ($query) {
            $query->where('active', '=', true);
        })->orWhereHas('script', function ($query) {
            $query->where('active', '=', true);
        });

    }


}
