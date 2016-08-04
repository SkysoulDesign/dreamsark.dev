<?php

namespace DreamsArk\Models\User;

use DreamsArk\Models\Game\Item;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Payment\Transaction;
use DreamsArk\Models\Project\Comment;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\Traits\ModelDetentionTrait;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\UserPresenter;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\Access\Authorizable;

/**
 * Class User
 *
 * @package DreamsArk\Models\User
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{

    use Authenticatable, Authorizable, CanResetPassword, PresentableTrait, ModelDetentionTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['username', 'email', 'password', 'name'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Presenter for this class
     *
     * @var Presenter
     */
    protected $presenter = UserPresenter::class;

    /**
     * Hash the Password Before Saving
     *
     * @param $password
     */
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    /**
     * Settings Relationship
     */
    public function settings()
    {
        return $this->hasOne(Setting::class);
    }

    /**
     * Settings Relationship
     */
    public function socialite()
    {
        return $this->hasMany(Socialite::class);
    }

    /**
     * Bags Relationship
     */
    public function bag() : hasOne
    {
        return $this->hasOne(Bag::class);
    }

    /**
     * Draft Relationship
     */
    public function drafts()
    {
        return $this->hasMany(Draft::class);
    }

    /**
     * Project Relationship
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * @param string $name
     *
     * @return mixed|null
     */
    public function __get($name)
    {

        /**
         * First check if the model has the property on it's own
         */
        if ($this->getAttribute($name)) {
            return $this->getAttribute($name);
        }

        /**
         * Check if it has on setting instead
         */
        if ($this->settings->getAttribute($name)) {
            return $this->settings->getAttribute($name);
        }

        return null;

    }

    /**
     * @param $roleName
     *
     * @return bool
     */
    public function is($roleName)
    {
        foreach ($this->roles()->get() as $role) {
            if ($role->name == $roleName) {
                return true;
            }
        }

        return false;
    }

    /**
     * Backers Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function backers()
    {
        return $this->belongsToMany(Project::class, 'project_backer')->withPivot('amount')->withTimestamps();
    }

    /**
     * User to Enroller relation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function enrollers()
    {
        return $this->belongsToMany(Expenditure::class, 'expenditure_enrollers')->withTimestamps();
    }

    /**
     * Profile Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function profiles()
    {
        return $this->belongsToMany(Profile::class)->withPivot('answer_id');
    }

    /**
     * Role Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * @return mixed
     */
    public function submissions()
    {
        return $this->hasMany(Submission::class)->orderBy('updated_at', 'desc');
    }

    /**
     * @return mixed
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class)->orderBy('updated_at', 'desc');
    }

    /**
     * Comments Relationship
     *
     * @return HasMany
     */
    public function comments() : hasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Comments Relationship
     *
     * @return belongsToMany
     */
    public function items() : belongsToMany
    {
        return $this->belongsToMany(Item::class, 'game_item_user')->wherePivot('quantity');
    }
}
