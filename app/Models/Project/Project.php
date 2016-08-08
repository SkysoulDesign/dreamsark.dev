<?php

namespace DreamsArk\Models\Project;

use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Stages\Distribution;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Models\Test\CustomModel;
use DreamsArk\Models\User\User;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\ProjectPresenter;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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
     * @return mixed
     */
//    public function addOrderBy($query, $orderBy = '')
//    {
//        return $query->orderBy('updated_at', ($orderBy ?: 'desc'));
//    }

    /**
     * Scope a query to only show active entries.
     *
     * @param $query
     * @return Builder
     */
    public function scopeActive(Builder $query)
    {
        foreach ($stages = ['idea', 'synapse', 'script'] as $stage) {

            $query->orWhereHas(array_shift($stages), function (Builder $query) {
                $query->where('active', true)->orHas('submission');
            });

            foreach ($stages as $model) {
                $query->whereDoesntHave($model);
            }

        }

        $query->where('active', true);
    }

    /**
     * Scope a query to only show failed entries.
     *
     * @param $query
     * @return Builder
     */
    public function scopeFailed(Builder $query)
    {
        foreach ($stages = ['idea', 'synapse', 'script'] as $stage) {

            $query->orWhereHas(array_shift($stages), function (Builder $query) {
                $query->where('active', false)->doesntHave('submission');
            });

            foreach ($stages as $model) {
                $query->whereDoesntHave($model);
            }

        }

        $query->orWhere('active', false);
    }

//    /**
//     * Filter Down only expenses that can be enroll
//     *
//     * @param \Illuminate\Database\Eloquent\Builder $query
//     */
//    public function scopeEnrollable(Builder $query)
//    {
//        $query->has('expenditure');
//    }

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
     * @param string $type
     * @return mixed
     */
//    public function getNextStageReward($type = '')
//    {
//        return $this->rewards()->where('rewardable_type', ($type ?: get_class($this->stage->next())));
//    }

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
     */
    public function stage() : MorphTo
    {
        return $this->morphTo('stageable');
    }

    public function stageable() : MorphTo
    {
        return $this->morphTo();
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
//    public function enrollable()
//    {
//        return $this->expenditures()->enrollable();
//    }

    /**
     * Expenditure Relationship
     */
    public function expenditures()
    {
        return $this->hasMany(Expenditure::class);
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
     * Alias for backers
     *
     * @return belongsToMany
     */
    public function investors() : belongsToMany
    {
        return $this->belongsToMany(User::class, 'project_investors')->withPivot('amount');
    }

    /**
     * Backers Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
//    public function backers()
//    {
//        return $this->belongsToMany(User::class, 'project_backer')
//            ->withPivot('amount')->withTimestamps()
//            ->orderBy('project_backer.amount', 'desc')->orderBy('project_backer.user_id');
//    }

    /**
     * sum of amount received from "Project Backers" & "voters to enrollers"
     */
    public function totalCollected()
    {
        return $this->backers->sum('pivot.amount') + $this->enrollVoteTotal();
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

}
