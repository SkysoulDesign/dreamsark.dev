<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Comment;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CreateCommentJob
 *
 * @package DreamsArk\Jobs\Project
 */
class CreateCommentJob extends Job
{
    /**
     * @var \DreamsArk\Models\User\User
     */
    private $user;

    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    private $model;

    /**
     * @var string
     */
    private $content;

    /**
     * Create a new job instance.
     *
     * @param \DreamsArk\Models\User\User $user
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param string $content
     */
    public function __construct(User $user, Model $model, string $content)
    {
        $this->user = $user;
        $this->model = $model;
        $this->content = $content;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->model->comments()->create([
            'user_id' => $this->user->id,
            'content' => $this->content
        ]);
    }
}
