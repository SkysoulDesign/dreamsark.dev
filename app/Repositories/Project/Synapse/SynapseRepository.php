<?php

namespace DreamsArk\Repositories\Project\Synapse;

use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\FallibleTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class SynapseRepository implements SynapseRepositoryInterface
{

    use RepositoryHelperTrait, FallibleTrait, CRUDTrait;

    /**
     * @var Synapse
     */
    public $model;

    /**
     * @var Submission
     */
    private $submission;

    /**
     * @param Synapse $synapse
     * @param Submission $submission
     */
    function __construct(Synapse $synapse, Submission $submission)
    {
        $this->model = $synapse;
        $this->submission = $submission;
    }

    /**
     * Create a Synapse
     *
     * @param int $project_id
     * @param array $fields
     * @return Synapse
     */
    public function create($project_id, array $fields)
    {
        $synapse = $this->model->setAttribute('project_id', $project_id)->fill($fields);
        $synapse->save();
        return $synapse;
    }

    /**
     * Submit Synapse
     *
     * @param int $synapse_id
     * @param int $user_id
     * @param array $fields
     * @return Submission
     */
    public function submit($synapse_id, $user_id, array $fields)
    {
        /** Todo: Find a way to not massassign the user ID */

        /** @var MorphMany $submission */
        $submission = $this->model($synapse_id)->submissions();

        return $submission->create(array_merge($fields, compact('user_id')));

    }

    /**
     * Vote on a Submission
     *
     * @param int $submission_id
     * @param int $user_id
     */
    public function vote($submission_id, $user_id)
    {
        $this->submission->find($submission_id)->attach($user_id);
    }

    /**
     * Set Model to Draft
     *
     * @param null|\DreamsArk\Models\Project\Stages\Draft $draft_id
     * @return $this
     */
    public function draft($draft_id = null)
    {
        return $this->newInstance($draft_id, Draft::class);
    }

}