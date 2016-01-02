<?php

namespace DreamsArk\Http\Controllers\Project\Idea;

use DreamsArk\Commands\Project\Stages\Voting\OpenVotingCommand;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use DreamsArk\Repositories\Project\Submission\SubmissionRepositoryInterface;

class IdeaController extends Controller
{
    /**
     * IdeaController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show Ideas Page
     *
     * @param IdeaRepositoryInterface $repository
     * @return \Illuminate\View\View
     */
    public function index(IdeaRepositoryInterface $repository)
    {
        return view('project.idea.index')->with('ideas', $repository->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Idea $idea
     * @param SubmissionRepositoryInterface $repository
     * @return \Illuminate\Http\Response
     * @internal param IdeaRepositoryInterface $IdeaRepository
     */
    public function show(\DreamsArk\Models\Project\Stages\Idea $idea, SubmissionRepositoryInterface $repository)
    {
//        dd($idea->submissions->winner);
        $submissions = $repository->idea($idea)->allPublic();
        return view('project.idea.show')->with('idea', $idea)->with('submissions', $submissions);
    }

}
