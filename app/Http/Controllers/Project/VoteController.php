<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;

class VoteController extends Controller
{
    /**
     * VoteController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param VoteRepositoryInterface $repository
     * @return \Illuminate\Http\Response
     */
    public function index(VoteRepositoryInterface $repository)
    {
        return view('project.vote.index')->with('votes', $repository->allOpened()->load('project'));
    }

    /**
     * Display the specified resource.
     *
     * @param Vote $vote
     * @return \Illuminate\Http\Response
     */
    public function show(Vote $vote)
    {
//        $this->dispatch(new CloseVotingCommand($vote));

        if (array_has(class_uses($vote->votable), EnrollableTrait::class)) {
            return view('project.vote.show')->with('model', $vote->votable);
        }

        $submissions = $vote->votable->submissions->load('user', 'votes');
        return view('project.vote.show')->with('model', $vote->votable)->with('submissions', $submissions);
    }

}
