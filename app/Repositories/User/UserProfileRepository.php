<?php

namespace DreamsArk\Repositories\User;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Repositories\Repository;
use Illuminate\Support\Collection;

class UserProfileRepository extends Repository implements UserProfileRepositoryInterface
{

    /**
     * @var Profile
     */
    public $model;

    /**
     * @param Profile $profile
     */
    public function __construct(Profile $profile)
    {
        $this->model = $profile;
    }

}