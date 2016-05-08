<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Presenters\Presenter;

class UserPresenter extends Presenter
{

    /**
     * @param Profile|int $profile
     * @return float
     */
    public function profileCompletion($profile)
    {
        $profile = $this->model->profiles->find($profile);
        return $profile->answers()->count() * 100 / $profile->questions()->count();
    }

    /**
     * Compose the user name
     *
     * @return string
     */
    public function name()
    {
        return $this->model->username;
    }

    /**
     * Display the user Avatar
     *
     * @return string
     */
    public function avatar()
    {
        return asset('img/avatar/male.png');
    }

}