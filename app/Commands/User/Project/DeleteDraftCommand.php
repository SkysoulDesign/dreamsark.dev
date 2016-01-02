<?php

namespace DreamsArk\Commands\User\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Project\Draft\DraftRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class DeleteDraftCommand extends Command implements SelfHandling
{
    /**
     * @var Draft
     */
    private $draft;

    /**
     * Create a new command instance.
     *
     * @param \DreamsArk\Models\Project\Stages\Draft $draft
     */
    public function __construct(Draft $draft)
    {
        $this->draft = $draft;
    }

    /**
     * Execute the command.
     *
     * @param DraftRepositoryInterface $repository
     */
    public function handle(DraftRepositoryInterface $repository)
    {
        /**
         * Delete Draft
         */
        $repository->delete($this->draft->id);
    }
}
