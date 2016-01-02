<?php

namespace DreamsArk\Repositories\Project\Vote;


use DreamsArk\Models\Project\Stages\Vote;

interface VoteRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);

    /**
     * Delete Vote
     *
     * @param int $vote_id
     * @return bool
     */
    public function delete($vote_id);


}