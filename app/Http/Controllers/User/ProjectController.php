<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\User\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\PublishProjectJob;
use DreamsArk\Jobs\User\Project\CreateDraftJob;
use DreamsArk\Jobs\User\Project\UpdateDraftJob;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Project\ProjectRepository;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class ProjectController
 *
 * @package DreamsArk\Http\Controllers\User
 */
class ProjectController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param UserRepositoryInterface $userRepository
     * @param ProjectRepository|ProjectRepositoryInterface $projectRepository
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(UserRepositoryInterface $userRepository, ProjectRepositoryInterface $projectRepository, Request $request)
    {

        $projects = [];// $userRepository->drafts($request->user()->id);
        $publishedProjects = $projectRepository->publishedBy($request->user()->id)->actives(true)->get();
        $failedProjects = $projectRepository->publishedBy($request->user()->id)->actives(false)->get();

        return view('user.project.index', compact('projects', 'publishedProjects', 'failedProjects'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectCreation $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectCreation $request)
    {
        if ($request->has('save_draft')) {
            // TODO: Temporarily disabled feature of Save Draft;
            $command = new CreateDraftJob(null, $request->user(), $request->all());
        } else if ($request->has('save_publish')) {
            $command = new CreateProjectJob($request->user(), $request->except('reward'), $request->get('reward'));
        }
        $this->dispatch($command);

        return redirect()->route('user.projects')->with('message', trans('response.save-to-draft-s'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Draft $draft
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(Draft $draft)
    {
        return view('user.project.edit')->with('project', $draft);
    }

    /**
     * Draft Update
     *
     * @param ProjectCreation $request
     * @param Draft $draft
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectCreation $request, Draft $draft)
    {
        dispatch(new UpdateDraftJob($draft, $request->user(), $request->all()));

        return redirect()->back()->withSuccess('Updated successfully');
    }

    /**
     * Publish Project
     *
     * @param ProjectPublication $request
     * @param Draft $draft
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function publish(ProjectPublication $request, Draft $draft)
    {

        $command = new PublishProjectJob($draft);
        $this->dispatch($command);

        return redirect()->back()->with('message', trans('response.project-was-published'));
    }

}
