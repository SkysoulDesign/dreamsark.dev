<?php

namespace DreamsArk\Models\User;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\Traits\RolesAndPermissionTrait;
use DreamsArk\Presenters\PresentableTrait;
use DreamsArk\Presenters\Presenter;
use DreamsArk\Presenters\Presenter\UserPresenter;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;

/**
 * Class User
 *
 * @package DreamsArk\Models\User
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{

    use Authenticatable, Authorizable, CanResetPassword, PresentableTrait, RolesAndPermissionTrait;

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
     * Bags Relationship
     */
    public function bag()
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
     * User Profile
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function profiles()
    {
        return $this->belongsToMany(Profile::class)->withPivot('answer_id');
    }

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

}
