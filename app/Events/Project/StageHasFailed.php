<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class StageHasFailed extends Event
{
    use SerializesModels;

    /**
     * @var Model
     */
    public $model;

    /**
     * @var
     */
    public $amount;

    /**
     * @var User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Model $model
     * @param User $user
     * @param int $amount
     */
    public function __construct(Model $model, User $user, $amount)
    {
        $this->model = $model;
        $this->user = $user;
        $this->amount = $amount;
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
