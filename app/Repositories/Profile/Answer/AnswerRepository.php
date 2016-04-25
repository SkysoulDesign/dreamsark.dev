<?php

namespace DreamsArk\Repositories\Profile\Answer;

use DreamsArk\Models\Master\Answer;
use DreamsArk\Repositories\Repository;

/**
 * Class AnswerRepository
 *
 * @package DreamsArk\Repositories\Profile\Answer
 */
class AnswerRepository extends Repository implements AnswerRepositoryInterface
{

    /**
     * @var Answer
     */
    public $model;

    /**
     * @param Answer $answer
     */
    public function __construct(Answer $answer)
    {
        $this->model = $answer;
    }

}