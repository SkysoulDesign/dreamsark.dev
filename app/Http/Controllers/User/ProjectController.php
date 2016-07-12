<?php

namespace DreamsArk\Http\Controllers\User;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\User\Project\ProjectCreation;
use DreamsArk\Http\Requests\User\Project\ProjectPublication;
use DreamsArk\Jobs\Project\CreateProjectJob;
use DreamsArk\Jobs\Project\PublishProjectJob;
use DreamsArk\Jobs\User\Project\UpdateDraftJob;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

/**
 * Class ProjectController
 *
 * @package DreamsArk\Http\Controllers\User
 */
class ProjectController extends Controller
{
    /**
     * @var array
     */
    private $pagination;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('user.project.index')
            ->with('projects', $request->user()->projects()->actives()->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('user.project.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectCreation $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectCreation $request)
    {

        $this->dispatch(new CreateProjectJob(
            $request->user(), $request->except('reward'), $request->get('reward')
        ));

        return redirect()->route('project.index');
    }

    /**
     * @param $request
     */
    protected function getPaginationArray($request)
    {
        $currentPage = $request->get('page', 1);
        $this->pagination = [
            'current' => $currentPage,
            'limit' => config('defaults.general.pagination.per_page')
        ];
    }

    /**
     * User's Backed/Funded List
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function backerList(Request $request)
    {
        $this->getPaginationArray($request);
        /** @var User $user */
        $user = $request->user()->load('backers');
        /** @var Collection $backers */
        $backers = $user->backers->forPage($this->pagination['current'], $this->pagination['limit']);

        return view('user.activity.backed-list', compact('backers'))
            ->with('pagination', $this->pagination);
    }

    /**
     * User's Backed/Funded List
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function enrolledList(Request $request)
    {
        $this->getPaginationArray($request);
        /** @var User $user */
        $user = $request->user()->load('enrollers');
        /** @var Collection $enrollers */
        $enrollers = $user->enrollers->forPage($this->pagination['current'], $this->pagination['limit']);

        return view('user.activity.enroll-list', compact('enrollers'))
            ->with('pagination', $this->pagination);
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
        return view('user.project.edit')->with('project', $draft);
    }

    /**
     * Draft Update
     *
     * @param ProjectCreation $request
     * @param Draft           $draft
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
     * @param Draft              $draft
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

}
