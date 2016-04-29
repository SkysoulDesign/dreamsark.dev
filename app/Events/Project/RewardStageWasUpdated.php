<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\SerializesModels;

class RewardStageWasUpdated extends Event
{
    use SerializesModels;
    /**
     * @var Model
     */
    private $model;
    /**
     * @var
     */
    private $chargeAmount;

    /**
     * Create a new event instance.
     *
     * @param Model $model
     * @param $chargeAmount
     */
    public function __construct(Model $model, $chargeAmount)
    {
        $this->model = $model;
        $this->user = $this->model->user;
        $this->chargeAmount = $chargeAmount;
        $this->reward = $chargeAmount;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
