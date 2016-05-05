<?php

namespace DreamsArk\Http\Controllers\Committee;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;

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
        return view('committee.project.fund-index')->with('funds', $this->getListWithPagination($fund));
    }

    /**
     * @param $object
     * @return mixed
     */
    protected function getListWithPagination($object)
    {
        return $object->pending()->orderBy('updated_at', 'desc')->paginate(config('defaults.settings.pagination.per_page'));
    }
}
