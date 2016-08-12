<?php

namespace DreamsArk\Http\Controllers\Committee;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Stages\Voting\AssignVotingWinnerToCrewJob;
use DreamsArk\Models\Project\Stages\Distribution;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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
        return view('committee.project.review.index')->with('reviews', $this->getListWithPagination($review));
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
     * @param Distribution $distribution
     * @return mixed
     */
    public function projectsInDistributionStage(Distribution $distribution)
    {
        return view('committee.project.distribution.index')->with('distributions', $this->getListWithPagination($distribution));
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
        $fund = $this->loadProjectData($fund);

        return view('committee.project.fund.view', compact('fund'));
    }

    /**
     * @param Distribution $distribution
     * @return mixed
     */
    public function ViewDistributeProcess(Distribution $distribution)
    {
        $distribution = $this->loadProjectData($distribution);

        return view('committee.project.distribution.view', compact('distribution'));
    }

    /**
     * @param Model $model
     * @return $this
     */
    protected function loadProjectData(Model $model){
        return $model->load([
            'project',
            'project.enrollable', 'project.enrollable.expenditurable', 'project.enrollable.enrollers', 'project.enrollable.enrollers.enrollvotes',
            'project.expensable', 'project.expensable.expenditurable',
            'project.backers'
        ]);
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
            dispatch(new AssignVotingWinnerToCrewJob($expenditureCrew->expenditurable_id, $winnerId));
        }
        event(new EnrollVotingHasFinished($project->id, 1, $project->stage->vote));
    }
}
