<?php

namespace DreamsArk\Http\Controllers\User\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Jobs\User\Project\CreateDraftJob;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class SynapseController
 *
 * @package DreamsArk\Http\Controllers\User\Project
 */
class SynapseController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Project $project)
    {
        $command = new CreateDraftJob($project->id, $request->user(), $request->all(), 'synapse');
        $this->dispatch($command);

        return redirect()->route('user.projects')->with('message', trans('response.save-to-draft-s'));
    }

}
