<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Commands\Project\Review\ReviewCreateCast;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;
use Illuminate\Http\Request;

use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class CastController extends Controller
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
        $this->dispatch(new ReviewCreateCast($project, $request->all()));
        return redirect()->back();
    }

}
