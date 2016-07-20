<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Jobs\Project\CompleteProjectJob;
use DreamsArk\Jobs\Project\CreateCommentJob;
use DreamsArk\Jobs\Project\PublishProjectJob;
use DreamsArk\Jobs\Project\Stages\Review\CreateReviewJob;
use DreamsArk\Jobs\User\Project\UpdateDraftJob;
use DreamsArk\Models\Project\Comment;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;
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
    private $isIFrameCall = false;

    /**
     * ProjectController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['show', 'index']]);
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
     * @param Project $project
     * @param ProjectCreation|Request $request
     * @return \Illuminate\Http\Response
     */
    public function projectStore(Project $project, Request $request)
    {

        $command = new CreateReviewJob($project, $request->all());
        $this->dispatch($command);

        return redirect()->route('projects');

    }

    public function showIframe(Project $project, ProjectRepositoryInterface $repository)
    {
        $this->isIFrameCall = true;
        return $this->show($project, $repository);
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

        $isIFrameCall = $this->isIFrameCall;

        if ($project->stage instanceof Review) {
            return view('project.show', compact('project', 'isIFrameCall'));
        }

        if (!$project->stage instanceof Fund && !$project->stage instanceof Distribution) {
            $submissions = $repository->submissions($project->id)->load('user');

            return view('project.show', compact('project', 'isIFrameCall'))->with('submissions', $submissions);
        }

        return view('project.show', compact('isIFrameCall'))
            ->with('project', $project->load('expenditures.expenditurable', 'backers', 'enrollable.enrollers.enrollvotes'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function next(Project $project)
    {
        return view('user.project.' . $project->nextStageName() . '.create')->with('project', $project);
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

        return redirect()->back()->withSuccess(trans('project.updated'));
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

    /**
     * @param Project $project
     * @return mixed
     */
    public function updateProjectAndComplete(Project $project)
    {
        /**
         * @todo: need to create logic to distribute coins to crew, investors
         */
        dispatch(new CompleteProjectJob($project));

        return redirect()->back()->withSuccess(trans('project.status-updated-success') . '; ' . trans('project.coins-will-be-settled-soon'));
    }

}
