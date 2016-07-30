<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Committee\Review\PublishProjectReviewJob;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class StaffController
 *
 * @package DreamsArk\Http\Controllers\Committee\Project
 */
class StaffController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @param Review $review
     * @param ExpenditureRepositoryInterface $repository
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Review $review, ExpenditureRepositoryInterface $repository)
    {
        $this->redirectIfActive($review);
        $review = $review->load('project.expenditures.expenditurable');

        return view('committee.project.staff.create')->with('review', $review)->with('profiles', $repository->profiles());
    }

    /**
     * Publish a Project
     *
     * @param Request $request
     * @param Review $review
     *
     * @return \Illuminate\Http\Response
     */
    public function publish(Request $request, Review $review)
    {

        $project = $review->getAttribute('project');

        if ($project->getAttribute('expenditures')->isEmpty())
            return redirect()->back()->withErrors(
                trans('project.unable-publish-no-cast-crew-data', ['project_name' => $project->name])
            );

        $this->dispatch(
            new PublishProjectReviewJob($review, $request->input('voting_date'))
        );

        return redirect()->route('committee.project.review.index');
    }

    /**
     * Redirect if a Review is already Published
     *
     * @param Review $review
     *
     * @return $this
     */
    protected function redirectIfActive(Review $review)
    {
        if ($review->active)
            return redirect()->back()->withErrors(trans('project.already-published', ['project_name' => $review->project->name]));
    }

}
