<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\Expenditure\EnrollProjectCommand;
use DreamsArk\Commands\Project\Expenditure\UnrollProjectCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

class EnrollController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return view('project.enroll.create')->with('expenditures', $project->enrollable);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Expenditure $expenditure
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Expenditure $expenditure, Request $request)
    {
        $this->dispatch(new EnrollProjectCommand($expenditure, $request->user()));
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Expenditure $expenditure
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function unroll(Expenditure $expenditure, Request $request)
    {
        $this->dispatch(new UnrollProjectCommand($expenditure, $request->user()));
        return redirect()->back();
    }

}
