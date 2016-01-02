<?php

namespace DreamsArk\Repositories\Project\Submission;


use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class SubmissionRepository implements SubmissionRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Submission
     */
    public $model;

    /**
     * @param Submission $submission
     */
    function __construct(Submission $submission)
    {
        $this->model = $submission;
    }

    /**
     * Return All Submissions for set model
     *
     * @param bool $real
     * @return $this
     */
    public function all($real = false)
    {
        return $real ? $this->model->all() : $this->model->submissions;
    }

    /**
     * Vote on a Submission
     *
     * @param int $amount
     * @param int $submission_id
     * @param int $user_id
     */
    public function vote($amount, $submission_id, $user_id)
    {
        $this->model($submission_id)->votes()->attach($user_id, compact('amount'));
    }

    /**
     * Get All Public Submissions
     *
     * @return Collection
     */
    public function allPublic()
    {
        return $this->model->submissions()->public()->get();
    }

    /**
     * Get All Private Submissions
     *
     * @return Collection
     */
    public function allPrivate()
    {
        return $this->model->submissions()->private()->get();
    }

    /**
     * Set The Idea Model
     *
     * @param Idea $idea
     * @return $this
     */
    public function idea(Idea $idea)
    {
        return $this->newInstance($idea);
    }

    /**
     * Update The Model Submission Id so defining who is the winner
     *
     * @param Model $model
     * @param int $submission_id
     * @return bool
     */
    public function createWinner(Model $model, $submission_id)
    {
        return $model->setAttribute('submission_id', $submission_id)->save();
    }

}