<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\Expenditure\EnrollProjectJob;
use DreamsArk\Jobs\Project\Expenditure\UnrollProjectJob;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class EnrollController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class EnrollController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the specified resource.
     *
     * @param Project $project
     * @return \Illuminate\Http\Response
     */
    public function create(Project $project)
    {
        return view('project.enroll.create')
            ->with('project', $project)
            ->with('expenditures', $project->expenditures()->enrollable()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Expenditure $expenditure
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Expenditure $expenditure)
    {

        $targetProfile = $expenditure->expenditurable->profile;

        if (!$request->user()->hasProfile($targetProfile->name))
            return redirect()->back()->withErrors(trans('project.need-target-profile-to-enroll',
                ['target_profile' => $targetProfile->name]
            ));

        $this->dispatch(
            new EnrollProjectJob($expenditure, $request->user())
        );

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
        $this->dispatch(new UnrollProjectJob($expenditure, $request->user()));

        return redirect()->back();
    }

}
