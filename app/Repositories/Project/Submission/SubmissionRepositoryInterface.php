<?php

namespace DreamsArk\Repositories\Project\Submission;

interface SubmissionRepositoryInterface
{

    /**
     * Create a Submission
     *
     * @param int $amount
     * @param int $submission_id
     * @param int $user_id
     * @return
     */
    public function vote($amount, $submission_id, $user_id);

}