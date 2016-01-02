<?php

namespace DreamsArk\Repositories\Project\Draft;

use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;

class DraftRepository implements DraftRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Draft
     */
    public $model;

    /**
     * @param Draft $draft
     */
    function __construct(Draft $draft)
    {
        $this->model = $draft;
    }

    /**
     * Create a Draft
     *
     * @param int|null $project_id
     * @param int $user_id
     * @param int $type
     * @param array $fields
     * @return Draft
     */
    public function create($project_id, $user_id, $type, array $fields)
    {
        $project = $this->model
            ->setAttribute('project_id', $project_id)
            ->setAttribute('user_id', $user_id)
            ->setAttribute('type', $type)
            ->fill($fields);
        $project->save();
        return $project;
    }

}