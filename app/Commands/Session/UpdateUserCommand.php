<?php

namespace DreamsArk\Commands\Session;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class UpdateUserCommand extends Command implements SelfHandling
{
    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     * @param User $user
     * @param array $fields
     */
    public function __construct(User $user, array $fields)
    {
        $this->fields = $fields;
        $this->user = $user;
    }

    /**
     * Execute the command.
     *
     * @param UserRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(UserRepositoryInterface $repository, Dispatcher $event)
    {
        $status = $repository->update($this->user->getAttribute('id'), $this->fields);

        if (!$status) {
            dd('user wasnt updated somehow');
        }

        $event->fire(new UserWasUpdated($this->user));


    }
}
