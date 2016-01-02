<?php

namespace DreamsArk\Http\Controllers\Report;

use DreamsArk\Commands\Report\CreateReportCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Repositories\Report\ReportRepository;
use Illuminate\Http\Request;

class ReportController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param ReportRepository $repository
     * @return \Illuminate\Http\Response
     */
    public function index(ReportRepository $repository)
    {
        return view('report.index')->with('reports', $repository->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $command = new CreateReportCommand($request->all());

        $this->dispatch($command);

        return redirect()->back();
    }

}
