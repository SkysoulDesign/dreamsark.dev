<?php

namespace DreamsArk\Http\Controllers\Committee;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\Project\Stages\Voting\AssignVotingWinnerToCrewJob;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class CommitteeController
 *
 * @package DreamsArk\Http\Controllers\Committee
 */
class CommitteeController extends Controller
{
    /**
     * Committee Dashboard
     */
    public function index()
    {
        return view('committee.index');
    }

    /**
     * @param Review $review
     * @return mixed
     */
    public function projectsInReviewStage(Review $review)
    {
        return view('committee.project.review-index')->with('reviews', $this->getListWithPagination($review));
    }

    /**
     * @param Fund $fund
     * @return mixed
     */
    public function projectsInFundStage(Fund $fund)
    {
        return view('committee.project.fund.index')->with('funds', $this->getListWithPagination($fund));
    }

    /**
     * @param $object
     * @return mixed
     */
    protected function getListWithPagination($object)
    {
        return $object->pending()->orderBy('updated_at', 'desc')->paginate(config('defaults.general.pagination.per_page'));
    }

    /**
     * @param Fund $fund
     * @return mixed
     */
    public function ViewFundProcess(Fund $fund)
    {
        $fund = $fund->load([
            'project',
            'project.enrollable', 'project.enrollable.expenditurable', 'project.enrollable.enrollers', 'project.enrollable.enrollers.enrollvotes',
            'project.expensable',
            'project.backers'
        ]);

        return view('committee.project.fund.view', compact('fund'));
    }

    /**
     * NIU:: created for testing
     * @param $project
     */
    protected function pickEnrollWinner($project)
    {
        foreach ($project->enrollable as $expenditureCrew) {
            /** to get enrollers' votes */
            /** @var Collection $enrollerList */
            $enrollerList = $expenditureCrew->enrollers->pluck('enrollvotes')->filter(function ($item) {
                return !$item->isEmpty();
            })->flatten();
            /** to get enrollers' votes total */
            /** @var Collection $enrollerVoteList */
            $enrollerVoteList = $enrollerList->groupBy('enroller_id')->map(function ($item) {
                return $item->sum('amount');
            });
            $winnerId = $enrollerVoteList->sort()->keys()->pop();
//            echo 'Crew Id: ' . $expenditureCrew->id . ' -> Winner: ' . $winnerId;
            dispatch(new AssignVotingWinnerToCrewJob($expenditureCrew->id, $winnerId));
        }
        event(new EnrollVotingHasFinished($project->id, 1, $project->stage->vote));
    }
}
