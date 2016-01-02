<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\Expenditure\BackProjectCommand;
use DreamsArk\Commands\Project\VoteOnEnrollablePositionCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\VotingOnUserEnrollment;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

class FundController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return view('project.fund.create')->with('project', $project);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project, Request $request)
    {
        $this->dispatch(new BackProjectCommand($project, $request->user(), $request->get('amount')));
        return redirect()->route('project.show', $project->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Enroller $enroller
     * @param  VotingOnUserEnrollment $request
     * @return \Illuminate\Http\Response
     */
    public function vote(Enroller $enroller, VotingOnUserEnrollment $request)
    {
        $this->dispatch(new VoteOnEnrollablePositionCommand($enroller, $request->user()));
        return redirect()->back();
    }

}
