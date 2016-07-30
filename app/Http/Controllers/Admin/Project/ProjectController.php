<?php

namespace DreamsArk\Http\Controllers\Admin\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;

/**
 * Class ProjectController
 *
 * @package DreamsArk\Http\Controllers\Admin\Payment
 */
class ProjectController extends Controller
{
    /**
     * @param ProjectRepositoryInterface $repository
     *
     * @return mixed
     */
    public function index(ProjectRepositoryInterface $repository)
    {
        return view('admin.project.index')
            ->with('projects', $repository->paginate())
            ->with('project_count', $repository->all()->count());
    }
}
