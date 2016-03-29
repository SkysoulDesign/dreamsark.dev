<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Commands\Project\CreateProjectCommand;
use DreamsArk\Commands\User\Project\CreateDraftCommand;
use DreamsArk\Commands\User\Project\PublishProjectCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\User\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Project\ProjectRepository;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\Request;

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

        $projects = $userRepository->drafts($request->user()->id);
//        $publishedProjects = $userRepository->published($request->user()->id);
        $publishedProjects = $projectRepository->publishedBy($request->user()->id)->actives(true)->get();
//        $failedProjects = $userRepository->failed($request->user()->id);
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
        if($request->has('save_draft')) {
            $command = new CreateDraftCommand(null, $request->user(), $request->all(), $request->get('type'));
        } else if($request->has('save_publish')){
            $command = new CreateProjectCommand($request->user(), $request->all());
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
     * Publish Project
     *
     * @param ProjectPublication $request
     * @param Draft $draft
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function publish(ProjectPublication $request, Draft $draft)
    {

        $command = new PublishProjectCommand($draft);
        $this->dispatch($command);

        return redirect()->back()->with('message', trans('response.project-was-published'));
    }

}
