<?php

namespace DreamsArk\Http\Controllers\User\Project;

use DreamsArk\Commands\User\Project\CreateDraftCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

class ScriptController extends Controller
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
        $command = new CreateDraftCommand($project->id, $request->user(), $request->all(), 'script');
        $this->dispatch($command);

        return redirect()->route('user.projects')->with('message', trans('response.save-to-draft-s'));
    }

}
