<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\EnrollCastCommand;
use DreamsArk\Commands\Project\EnrollCrewCommand;
use DreamsArk\Http\Requests\Project\EnrollCastCreation;
use DreamsArk\Models\Project\Expenditures\Cast;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class ProjectEnrollController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        /**
         * Eager Load it
         */
        $project = $project->load('cast.candidates');

        return view('project.enroll.create', compact('project'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Cast $cast
     * @param EnrollCastCreation $request
     * @return \Illuminate\Http\Response
     */
    public function castStore(Cast $cast, EnrollCastCreation $request)
    {
        $this->dispatch(new EnrollCastCommand($cast, $request->user()));
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Crew $crew
     * @param EnrollCastCreation $request
     * @return \Illuminate\Http\Response
     * @internal param Cast $cast
     */
    public function crewStore(Crew $crew, EnrollCastCreation $request)
    {
        $this->dispatch(new EnrollCrewCommand($crew, $request->user()));
        return redirect()->back();
    }

}
