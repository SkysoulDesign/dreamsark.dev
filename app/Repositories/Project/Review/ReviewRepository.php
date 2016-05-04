<?php

namespace DreamsArk\Repositories\Project\Review;

use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Expenditures\Expense;
use DreamsArk\Models\Project\Expenditures\Position;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Exceptions\RepositoryException;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Model;

class ReviewRepository implements ReviewRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Review
     */
    public $model;

    /**
     * @param Review $review
     */
    function __construct(Review $review)
    {
        $this->model = $review;
    }

    /**
     * Create a Review
     *
     * @param int $project_id
     * @return Review
     */
    public function create($project_id)
    {
        $review = $this->model->setAttribute('project_id', $project_id);
        $review->save();
        return $review;
    }

    /**
     * Create a Review :: Not In Use
     *
     * @param int $project_id
     * @param int $expenditure_position_id
     * @param array $fields
     * @return Expenditure
     * @throws RepositoryException
     */
    public function createCast($project_id, $expenditure_position_id, array $fields)
    {
        $cast = $this->newInstance($expenditure_position_id, Position::class)->model->cast()->create($fields);
        return $this->createExpenditure($cast, $project_id);
    }

    /**
     * Create a Review
     *
     * @param Model $model
     * @param int $project_id
     * @return Expenditure
     */
    public function createExpenditure(Model $model, $project_id)
    {
        return $model->expenditure()->create(compact('project_id'));
    }

    /**
     * Create a Review
     *
     * @param int $project_id
     * @param int $expenditure_profile_id
     * @param array $fields
     * @return Expenditure
     * @throws RepositoryException
     */
    public function createCrew($project_id, $expenditure_profile_id, array $fields)
    {
        $crew = $this->newInstance($expenditure_profile_id, Profile::class)->model->crew()->create($fields);
        return $this->createExpenditure($crew, $project_id);
    }

    /**
     * Create an Expense Entry
     *
     * @param int $project_id
     * @param array $fields
     * @return Expenditure
     * @throws RepositoryException
     */
    public function createExpense($project_id, array $fields)
    {
        $expense = $this->newInstance(Expense::class)->model->create($fields);

        return $this->createExpenditure($expense, $project_id);
    }

}