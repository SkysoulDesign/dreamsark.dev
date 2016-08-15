<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Jobs\Project\CompleteProjectJob;
use DreamsArk\Jobs\Project\Dispense\PayDispenseJob;
use DreamsArk\Jobs\Project\Stages\Distribution\UpdateDistributionDetailsJob;
use DreamsArk\Models\Project\Expenditures\Dispense;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;

/**
 * Class ManageController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class ManageController extends Controller
{
    /**
     * @param \DreamsArk\Models\Project\Project $project
     * @return \Illuminate\View\View
     */
    public function edit(Project $project)
    {
        return view('project.manage.edit')
            ->with('project', $project)
            ->with('expenditures', $project->getAttribute('expenditures'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \DreamsArk\Models\Project\Project $project
     * @return \Illuminate\View\View
     */
    public function update(Request $request, Project $project)
    {

        $this->dispatch(new UpdateDistributionDetailsJob(
            $project, $request->toArray(), $request->files
        ));

        return redirect()->back();
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \DreamsArk\Models\Project\Expenditures\Dispense $dispense
     * @return \Illuminate\View\View
     */
    public function pay(Request $request, Dispense $dispense)
    {

        /**
         * @todo make $dispense->project works
         */
//        $project = $dispense->getAttribute('crew')->expenditure->project;

        $this->dispatch(new PayDispenseJob(
            $dispense, $request->input('amount')
        ));

        return redirect()->back();
    }

    /**
     * @param Project $project
     * @return \Illuminate\Http\RedirectResponse
     */
    public function complete(Project $project)
    {

        $this->dispatch(new CompleteProjectJob($project));

        return redirect()->back()->withSuccess([
            trans('project.status-updated-success'),
            trans('project.coins-will-be-settled-soon')
        ]);
    }

}
