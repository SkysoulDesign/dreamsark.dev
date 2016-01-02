<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Commands\Committee\Project\PublishProjectCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;

class StaffController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @param Review $review
     * @param ExpenditureRepositoryInterface $repository
     * @return \Illuminate\Http\Response
     */
    public function create(Review $review, ExpenditureRepositoryInterface $repository)
    {
        $review = $review->load('project.expenditures.expenditurable');
        return view('committee.project.staff.create')->with('review', $review)->with('positions', $repository->positions());
    }

    /**
     * Publish a Project
     *
     * @param Review $review
     * @return \Illuminate\Http\Response
     */
    public function publish(Review $review)
    {
        $this->dispatch(new PublishProjectCommand($review));
        return redirect()->route('dashboard');
    }

}
