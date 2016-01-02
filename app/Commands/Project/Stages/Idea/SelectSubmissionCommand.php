<?php

namespace DreamsArk\Commands\Project\Stages\Idea;

use DreamsArk\Commands\Command;
use DreamsArk\Models\Idea\Submission;
use Illuminate\Contracts\Bus\SelfHandling;

class SelectSubmissionCommand extends Command implements SelfHandling
{
    /**
     * @var Submission
     */
    private $submission;

    /**
     * Create a new command instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Execute the command.
     *
     * @return void
     */
    public function handle()
    {
        //
    }
}
