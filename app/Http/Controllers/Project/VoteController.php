<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;
use DreamsArk\Models\Project\Stages\Fund;
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

        if ($stage instanceof Distribution) {
            return redirect()->route('project.show', $project)->withErrors(
                'The voting for this project has been gone.'
            );
        }

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
            );
        }

        /**
         * If instance of fund.. treat it accordingly
         */
        if ($stage instanceof Fund) {

            $profiles = $stage->enrollable->load('expenditurable.profile')->pluck('expenditurable.profile');

            return view("project.vote.fund.create")
                ->with('project', $project)
                ->with('profiles', $profiles);
        }

        $submissions = $stage->submissions->load('user', 'votes');

        return view("project.vote.create")
            ->with('project', $project)
            ->with('submissions', $submissions);
    }

}
