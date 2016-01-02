<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Commands\Project\Review\ReviewCreateCrew;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

class CrewController extends Controller
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
        $this->dispatch(new ReviewCreateCrew($project, $request->all()));
        return redirect()->back();
    }

}
