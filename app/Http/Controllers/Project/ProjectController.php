<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\Stages\Review\CreateReviewCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\PublishProjectJob;
use DreamsArk\Jobs\User\Project\CreateDraftJob;
use DreamsArk\Jobs\User\Project\UpdateDraftJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class ProjectController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => 'show']);
    }

    /**
     * Show Projects Page
     *
     * @param ProjectRepositoryInterface $repository
     * @return \Illuminate\View\View
     */
    public function index(ProjectRepositoryInterface $repository)
    {
        return view('project.index')->with('projects', $repository->actives());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('project.create')->with('user', auth()->user());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectCreation|Request $request
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

        return redirect()->route('projects');

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param ProjectCreation|Request $request
     * @return \Illuminate\Http\Response
     */
    public function projectStore(Project $project, Request $request)
    {

        $command = new CreateReviewCommand($project, $request->all());
        $this->dispatch($command);

        return redirect()->route('projects');

    }

    /**
     * Show a specific project.
     *
     * @param Project $project
     * @param ProjectRepositoryInterface $repository
     * @return \Illuminate\View\View
     */
    public function show(Project $project, ProjectRepositoryInterface $repository)
    {

        if ($project->stage instanceof Review) {
            return view('project.show', compact('project'));
        }

        if (!$project->stage instanceof Fund) {
            $submissions = $repository->submissions($project->id)->load('user');
            return view('project.show', compact('project'))->with('submissions', $submissions);
        }

        return view('project.show')->with('project', $project->load('expenditures.expenditurable', 'backers'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function next(Project $project)
    {
        return view('project.' . $project->nextStageName() . '.create')->with('project', $project);
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
        return view('project.edit')->with('project', $draft);
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
