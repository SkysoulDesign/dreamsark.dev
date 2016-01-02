<?php

namespace DreamsArk\Repositories\Project\Script;

use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\FallibleTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ScriptRepository implements ScriptRepositoryInterface
{

    use RepositoryHelperTrait, FallibleTrait, CRUDTrait;

    /**
     * @var Script
     */
    public $model;

    /**
     * @var Submission
     */
    private $submission;

    /**
     * @param Script $script
     * @param Submission $submission
     */
    function __construct(Script $script, Submission $submission)
    {
        $this->model = $script;
        $this->submission = $submission;
    }

    /**
     * Create a Script
     *
     * @param int $project_id
     * @param array $fields
     * @return Script
     */
    public function create($project_id, array $fields)
    {
        $script = $this->model->setAttribute('project_id', $project_id)->fill($fields);
        $script->save();
        return $script;
    }

    /**
     * Submit Script
     *
     * @param int $script_id
     * @param int $user_id
     * @param array $fields
     * @return Submission
     */
    public function submit($script_id, $user_id, array $fields)
    {
        /** Todo: Find a way to not massassign the user ID */

        /** @var MorphMany $submission */
        $submission = $this->model($script_id)->submissions();

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

}