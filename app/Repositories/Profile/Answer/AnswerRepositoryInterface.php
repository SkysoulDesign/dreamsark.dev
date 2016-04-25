<?php

namespace DreamsArk\Repositories\Profile\Answer;

use DreamsArk\Models\Master\Answer;

interface AnswerRepositoryInterface
{
    /**
     * Create a new Answer on the Database
     *
     * @param array $fields
     * @return Answer
     */
    public function create(array $fields);

    /**
     * Update a new Answer on the Database
     *
     * @param Answer|int $answer
     * @param array $fields
     * @return Answer
     */
    public function update($answer, array $fields);

}