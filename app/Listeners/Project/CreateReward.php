<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Event;
use DreamsArk\Events\Project\Reward\RewardWasCreatedOrUpdated;
use DreamsArk\Models\Game\Item;

/**
 * Class CreateReward
 *
 * @package DreamsArk\Listeners\Project
 */
class CreateReward
{
    /**
     * @var \DreamsArk\Models\Game\Item
     */
    private $item;

    /**
     * CreateReward constructor.
     *
     * @param \DreamsArk\Models\Game\Item $item
     */
    public function __construct(Item $item)
    {
        $this->item = $item;
    }

    /**
     * Handle the event.
     *
     * @param  Event $event
     *
     * @return void
     */
    public function handle(Event $event)
    {

        $reward = $event->stage->reward()->create([
            'amount' => $event->amount,
            'project_id' => $event->stage->getAttribute('project')->id,
            'points' => null
        ]);

        $reward->items()->saveMany(
            $this->item->groups(['a', 'b', 'c'])->weighted()->limit(5)->get(['id'])
        );

        /**
         * Announce RewardWasCreated
         */
        event(new RewardWasCreatedOrUpdated(
            $reward, $event->stage->getRelation('project')->user
        ));
    }
}
