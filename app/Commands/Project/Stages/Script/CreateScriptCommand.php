<?php

namespace DreamsArk\Commands\Project\Stages\Script;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Script\ScriptWasCreated;
use DreamsArk\Repositories\Project\Script\ScriptRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Bus\DispatchesJobs;

class CreateScriptCommand extends Command implements SelfHandling
{
    use DispatchesJobs;

    /**
     * @var int
     */
    private $project_id;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param int $project_id
     * @param array $fields
     */
    public function __construct($project_id, array $fields)
    {
        $this->project_id = $project_id;
        $this->fields = collect($fields);
    }

    /**
     * Execute the command.
     *
     * @param ScriptRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(ScriptRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create Idea
         */
        $script = $repository->create($this->project_id, $this->fields->all());

        /**
         * Announce ScriptWasCreated
         */
        $event->fire(new ScriptWasCreated($script, $this->fields->get('voting_date')));

    }
}
