<?php

namespace DreamsArk\Presenters;

use DreamsArk\Presenters\Exceptions\PresenterException;

/**
 * Class PresentableTrait
 *
 * @package DreamsArk\Presenters
 */
trait PresentableTrait
{

    /**
     * Present proper formatted data for a model
     *
     * @return mixed
     * @throws \DreamsArk\Presenters\Exceptions\PresenterException
     */
    public function present()
    {

        if (!$this->presenter or !class_exists($this->presenter)) {
            throw new PresenterException('Please set the protected $presenter to your presenter path.');
        }

        return new $this->presenter($this);
    }

}
