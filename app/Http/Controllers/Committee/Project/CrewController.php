<?php

namespace DreamsArk\Http\Controllers\Committee\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Committee\Review\ReviewCreateCrewJob;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class CrewController
 *
 * @package DreamsArk\Http\Controllers\Committee\Project
 */
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

        $this->dispatch(new ReviewCreateCrewJob(
            $project, $request->all()
        ));

        return redirect()->back();
    }

}
