<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\CreateTakeCommand;
use DreamsArk\Http\Requests\Project\TakeCreation;
use DreamsArk\Models\Project\Script;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class TakeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param Script $script
     * @param TakeCreation $request
     * @return \Illuminate\Http\Response
     */
    public function store(Script $script, TakeCreation $request)
    {
        $command = new CreateTakeCommand($script, $request->all());
        $this->dispatch($command);

        return redirect()->back();
    }

}
