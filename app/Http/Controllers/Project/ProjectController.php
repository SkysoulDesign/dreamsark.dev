<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Jobs\Project\CompleteProjectJob;
use DreamsArk\Jobs\Project\PublishProjectJob;
use DreamsArk\Jobs\Project\Stages\Review\CreateReviewJob;
use DreamsArk\Jobs\User\Project\UpdateDraftJob;
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
     * @param \DreamsArk\Models\Project\Project $project
     * @return \Illuminate\View\View
     * @internal param \DreamsArk\Repositories\Project\ProjectRepositoryInterface $repository
     *
     */
    public function index(Project $project)
    {
        return view('project.index')
            ->with('projects', $project->active()->orderBy('created_at', 'desc')->get());
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
     *
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
     * @param Request $request
     * @param Project $project
     * @return \Illuminate\View\View
     */
    public function show(Request $request, Project $project)
    {

        $user = $request->user();
        $stage = $project->getAttribute('stage');

        if ($stage instanceof Review or
            $stage instanceof Fund
        ) {
            return view('project.show')->with('project', $project);
        }

        if ($stage instanceof Distribution) {
            return view('project.show')
                ->with('project', $project)
                ->with('expenditures', $project->getAttribute('expenditures'));
        }

        return view('project.show')
            ->with('project', $project)
            ->with('public_submissions', $stage->submissions()->public()->get())
            /**
             * If user is logged in then send his submission along
             */
            ->with('submissions',
                $user ? $stage->submissions()->ownedBy($user)->get() : []
            );


//        $isIFrameCall = $this->isIFrameCall;

//        if ($project->stage instanceof Review) {
//            return view('project.show', compact('project', 'isIFrameCall'));
//        }

//        if (!$project->stage instanceof Fund && !$project->stage instanceof Distribution) {
//            $submissions = $repository->submissions($project->id)->load('user');
//
//            return view('project.show', compact('project', 'isIFrameCall'))->with('submissions', $submissions);
//        }

//        return view('project.show', compact('isIFrameCall'))
//            ->with('project', $project->load('expenditures.expenditurable', 'backers', 'enrollable.enrollers.enrollvotes'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Project $project
     *
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
     *
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
     *
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
     *
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
     *
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
