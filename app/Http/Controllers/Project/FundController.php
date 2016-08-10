<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\VotingOnUserEnrollment;
use DreamsArk\Jobs\Project\Expenditure\BackProjectJob;
use DreamsArk\Jobs\Project\VoteOnEnrollablePositionJob;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class FundController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class FundController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param Project $project
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return view('project.fund.create')->with('project', $project);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Project $project
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project)
    {

        $this->dispatch(new BackProjectJob(
            $project, $request->user(), $request->input('amount')
        ));

        return redirect()->route('project.show', $project);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Enroller $enroller
     * @param  VotingOnUserEnrollment $request
     *
     * @return \Illuminate\Http\Response
     */
    public function vote(VotingOnUserEnrollment $request, Enroller $enroller)
    {

        $this->dispatch(new VoteOnEnrollablePositionJob(
            $enroller, $request->user(), $request->input('amount')
        ));

        return redirect()->back();
    }

}
