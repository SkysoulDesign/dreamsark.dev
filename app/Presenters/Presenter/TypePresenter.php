<?php

namespace DreamsArk\Presenters\Presenter;

use DreamsArk\Presenters\Presenter;

class TypePresenter extends Presenter
{

    /**
     * Compose the type name
     *
     * @return string
     */
    public function name()
    {
        return $this->display_name;
    }

}