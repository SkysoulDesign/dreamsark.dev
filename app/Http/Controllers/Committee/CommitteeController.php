<?php

namespace DreamsArk\Http\Controllers\Committee;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
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
        return view('committee.project.index')->with('reviews', $review->pending()->orderBy('updated_at', 'desc')->get());
    }
}
