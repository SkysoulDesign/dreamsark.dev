<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;

/**
 * Class VoteController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param VoteRepositoryInterface $repository
     *
     * @return \Illuminate\Http\Response
     */
    public function index(VoteRepositoryInterface $repository)
    {
        return view('project.vote.index')->with('votes', $repository->allOpened()->load('votable'));
    }

    /**
     * Display the specified resource.
     *
     * @param Vote $vote
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Vote $vote)
    {

        if (!$vote->active)
            return redirect()
                ->route('project.show', $vote->votable->project_id)
                ->withErrors(trans('vote.is-not-open'));

        if (array_has(class_uses($vote->votable), EnrollableTrait::class)) {
            return view('project.vote.show')->with('model', $vote->votable);
        }

        $submissions = $vote->votable->submissions->load('user', 'votes');

        return view('project.vote.show')
            ->with('model', $vote->votable)
            ->with('submissions', $submissions);
    }

    /**
     * Display Create Vote for an Project Stage
     *
     * @param \DreamsArk\Models\Project\Project $project
     *
     * @return mixed
     */
    public function create(Project $project)
    {

        $stage = $project->getAttribute('stage');

        if ($stage instanceof Review) {
            return redirect()->route('project.show', $project)->withErrors(
                'There is no open voting for this project yet'
            );
        }

        /**
         * If Voting is already close then redirect back
         */
        if (!$stage->vote->active) {
            return redirect()->route('project.show', $project)->withErrors(
                trans('project.date-expired')
                //'Voting is close for this project'
            );
        }

        $submissions = $stage->submissions->load('user', 'votes');

        return view("project.vote.create")
            ->with('project', $project)
            ->with('submissions', $submissions);
    }

}
