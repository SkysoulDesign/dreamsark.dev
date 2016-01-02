<?php

namespace DreamsArk\Commands\Session;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateUserCommand extends Command implements SelfHandling
{
    /**
     * @var array
     */
    private $fields;
    /**
     * @var
     */
    private $role;

    /**
     * Create a new command instance.
     * @param array $fields
     * @param string $role
     */
    public function __construct(array $fields, $role = 'user')
    {
        $this->fields = $fields;
        $this->role = $role;
    }

    /**
     * Execute the command.
     *
     * @param UserRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(UserRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create User
         */
        $user = $repository->create($this->fields);

        /**
         * Announce UserWasCreated
         */
        $event->fire(new UserWasCreated($user, $this->role));

    }
}
