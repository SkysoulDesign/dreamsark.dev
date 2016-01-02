<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Commands\Project\Review\ReviewCreateExpense;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

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
        $this->dispatch(new ReviewCreateExpense($project, $request->all()));
        return redirect()->back();
    }
}
