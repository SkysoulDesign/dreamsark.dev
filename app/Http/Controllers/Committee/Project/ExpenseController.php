<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateExpenseJob;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class ExpenseController
 *
 * @package DreamsArk\Http\Controllers\Committee\Project
 */
class ExpenseController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project, Request $request)
    {

        $this->dispatch(
            new ReviewCreateExpenseJob($project, $request->all())
        );

        return redirect()->back();
    }
}
