<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Presenters\Presenter;

class ExpenditurePresenter extends Presenter
{


    /**
     * Return User Age
     *
     * @return string
     */
    public function position()
    {
        return trans('positions.' . str_replace(' ', '-', strtolower($this->model->position->name)));
    }

}