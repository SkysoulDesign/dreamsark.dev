<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Presenters\Presenter;

class UserPresenter extends Presenter
{

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