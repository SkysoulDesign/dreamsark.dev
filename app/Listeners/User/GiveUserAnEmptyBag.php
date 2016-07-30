<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Models\User\Bag;

/**
 * Class GiveUserAnEmptyBag
 *
 * @package DreamsArk\Listeners\User
 */
class GiveUserAnEmptyBag
{
    /**
     * @var \DreamsArk\Models\User\Bag
     */
    private $bag;

    /**
     * Create the event listener.
     *
     * @param \DreamsArk\Models\User\Bag $bag
     */
    public function __construct(Bag $bag)
    {
        $this->bag = $bag;
    }

    /**
     * Handle the event.
     *
     * @param  UserWasCreated $event
     *
     * @return void
     */
    public function handle(UserWasCreated $event)
    {
        /**
         * Give the user an empty bag
         */
        $this->bag->user()->associate($event->user);
        $this->bag->fill(['coins' => config('defaults.coins')]);
        $this->bag->save();
    }
}
