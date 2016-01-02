<?php

namespace DreamsArk\Models\Project;

use DreamsArk\Models\Project\Expenditures\Expenditure;
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
use Illuminate\Database\Eloquent\Model;

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
     * Scope a query to only show active entries.
     *
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope a query to only show failed entries.
     *
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFailed($query)
    {
        return $query->where('active', false);
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
     * Idea Relationship
     */
    public function idea()
    {
        return $this->hasOne(Idea::class);
    }

    /**
     * Synapse Relationship
     */
    public function synapse()
    {
        return $this->hasOne(Synapse::class);
    }

    /**
     * Script Relationship
     */
    public function script()
    {
        return $this->hasOne(Script::class);
    }

    /**
     * Script Relationship
     */
    public function review()
    {
        return $this->hasOne(Review::class);
    }

    /**
     * fund Relationship
     */
    public function fund()
    {
        return $this->hasOne(Fund::class);
    }

    /**
     * Returns the right Relationship for the current project stage
     */
    public function stage()
    {
        return $this->{$this->type}();
    }

    /**
     * Get what is the next stage of this project
     */
    public function nextStageName()
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
        return $this->belongsToMany(User::class, 'project_backer')->withPivot('amount')->withTimestamps();
    }

}
